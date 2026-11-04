"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function TerrainMesh({ geometry }: { geometry: THREE.BufferGeometry }) {
  return (
    <group position={[0, -0.45, 0]}>
      <mesh geometry={geometry} receiveShadow>
        <meshStandardMaterial
          vertexColors
          roughness={0.98}
          metalness={0}
          side={THREE.DoubleSide}
          flatShading={false}
        />
      </mesh>
      <mesh position={[0, -0.12, 0]} receiveShadow>
        <boxGeometry args={[12.2, 0.24, 12.2]} />
        <meshStandardMaterial color="#ecece4" roughness={1} />
      </mesh>
    </group>
  );
}

async function loadElevationGeometry(): Promise<THREE.BufferGeometry> {
  const response = await fetch("/api/terrain");
  if (!response.ok) throw new Error("Yüksəklik məlumatları yüklənmədi");

  const image = await createImageBitmap(await response.blob());
  const canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) throw new Error("Canvas dəstəklənmir");
  context.drawImage(image, 0, 0);
  image.close();
  const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;

  const segments = 159;
  const heights = new Float32Array((segments + 1) ** 2);
  let min = Infinity;
  let max = -Infinity;

  for (let y = 0; y <= segments; y++) {
    for (let x = 0; x <= segments; x++) {
      const px = Math.round((x / segments) * (canvas.width - 1));
      const py = Math.round((y / segments) * (canvas.height - 1));
      const i = (py * canvas.width + px) * 4;
      const meters = pixels[i] * 256 + pixels[i + 1] + pixels[i + 2] / 256 - 32768;
      heights[y * (segments + 1) + x] = meters;
      min = Math.min(min, meters);
      max = Math.max(max, meters);
    }
  }

  if (!Number.isFinite(min) || max - min < 0.1) {
    throw new Error("Yüksəklik faylı düzgün oxunmadı");
  }

  const geo = new THREE.PlaneGeometry(12, 12, segments, segments);
  geo.rotateX(-Math.PI / 2);
  const pos = geo.getAttribute("position");
  const colors: number[] = [];
  const low = new THREE.Color("#b7c9b2");
  const meadow = new THREE.Color("#d6dec6");
  const rock = new THREE.Color("#bbb8ae");
  const peak = new THREE.Color("#efefe7");
  const color = new THREE.Color();

  for (let y = 0; y <= segments; y++) {
    for (let x = 0; x <= segments; x++) {
      const i = y * (segments + 1) + x;
      const elevation = heights[i];
      const t = (elevation - min) / (max - min);
      pos.setY(i, 0.08 + t * 2.2);

      color.copy(low).lerp(meadow, THREE.MathUtils.smoothstep(t, 0.12, 0.4));
      color.lerp(rock, THREE.MathUtils.smoothstep(t, 0.48, 0.82));
      color.lerp(peak, THREE.MathUtils.smoothstep(t, 0.82, 1));
      colors.push(color.r, color.g, color.b);
    }
  }

  geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  geo.computeVertexNormals();
  return geo;
}

export default function RealTerrain() {
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    let result: THREE.BufferGeometry | undefined;
    loadElevationGeometry()
      .then((geo) => {
        if (cancelled) geo.dispose();
        else {
          result = geo;
          setGeometry(geo);
        }
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : "Xəta baş verdi");
      });
    return () => {
      cancelled = true;
      result?.dispose();
    };
  }, []);

  return (
    <>
      {!geometry && (
        <div className="terrain-notice">
          {error
            ? `Xəritə yüklənmədi: ${error}. İnterneti və /api/terrain ünvanını yoxla.`
            : "Real relyef məlumatları yüklənir…"}
        </div>
      )}
      <Canvas
        dpr={[1, 1.25]}
        frameloop="demand"
        camera={{ position: [9.8, 6.2, 10.5], fov: 34, near: 0.1, far: 100 }}
      >
        <color attach="background" args={["#f7f8f3"]} />
        <fog attach="fog" args={["#f7f8f3", 12, 28]} />
        <ambientLight intensity={1.55} />
        <hemisphereLight args={["#ffffff", "#c7d4c0", 1.8]} />
        <directionalLight
          position={[5, 12, 5]}
          intensity={2.45}
                    shadow-mapSize={[2048, 2048]}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        {geometry && <TerrainMesh geometry={geometry} />}
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          enablePan={false}
          minDistance={8}
          maxDistance={20}
          minPolarAngle={0.62}
          maxPolarAngle={1.34}
          autoRotate={false}
        />
      </Canvas>
    </>
  );
}
