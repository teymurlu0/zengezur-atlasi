"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { MonumentModel } from "./MonumentModels";
import { monuments, type MonumentId } from "../data/heritage";

type Props = {
  selected: MonumentId;
  onSelect: (id: MonumentId) => void;
};

const cameraPositions: Record<MonumentId, [number, number, number]> = {
  khudafarin: [20, 12.5, 27],
  mammadbayli: [11, 7.5, 14],
  lalezar: [15, 9, 22],
};
const targets: Record<MonumentId, [number, number, number]> = {
  khudafarin: [0, 1, 0],
  mammadbayli: [0, 3.4, 0],
  lalezar: [0, 1, 0],
};

function CameraDirector({ selected, reset, cinematic }: {
  selected: MonumentId;
  reset: number;
  cinematic: boolean;
}) {
  const { camera } = useThree();
  const target = targets[selected];
  const focus = new THREE.Vector3(...target);
  useEffect(() => {
    camera.position.set(...cameraPositions[selected]);
    camera.lookAt(...target);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [camera, selected, reset]);
  useFrame(({ clock }, delta) => {
    if (!cinematic) return;
    const t = clock.elapsedTime * .24;
    const radius = selected === "mammadbayli" ? 16 : selected === "khudafarin" ? 32 : 24;
    const elevation = (selected === "mammadbayli" ? 5.5 : 8.8) + Math.sin(t * .72) * 2.25;
    const desired = new THREE.Vector3(Math.cos(t) * radius, elevation + target[1], Math.sin(t) * radius);
    camera.position.lerp(desired, 1 - Math.exp(-delta * 1.25));
    camera.lookAt(focus);
  });
  return null;
}

export default function MonumentStudio({ selected, onSelect }: Props) {
  const [cinematic, setCinematic] = useState(false);
  const [cameraReset, setCameraReset] = useState(0);
  const chosen = monuments.find((m) => m.id === selected)!;
  const reduceMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div className="studio">
      <div className="studio-topbar">
        <div>
          <span className="studio-label">İNTERAKTİV MEMARLIQ SƏHNƏSİ</span>
          <h3>{chosen.title}</h3>
        </div>
        <span className="studio-small-note">3D MEMARLIQ TƏSVİRİ</span>
      </div>
      <div className="studio-switcher" role="tablist" aria-label="Abidə seçimi">
        {monuments.map((monument) => (
          <button
            key={monument.id}
            className={selected === monument.id ? "studio-switch active" : "studio-switch"}
            role="tab"
            aria-selected={selected === monument.id}
            type="button"
            onClick={() => { onSelect(monument.id); setCinematic(false); setCameraReset((x) => x + 1); }}
          >{monument.title}</button>
        ))}
      </div>
      <div className="studio-canvas-area">
        <Canvas
          shadows
          dpr={[1, 1.2]}
          camera={{ position: cameraPositions[selected], fov: selected === "mammadbayli" ? 40 : 39, near: .1, far: 180 }}
          gl={{ antialias: true, powerPreference: "low-power" }}
          frameloop={cinematic ? "always" : "demand"}
        >
          <color attach="background" args={["#eef3ed"]} />
          <fog attach="fog" args={["#eef3ed", 35, 105]} />
          <ambientLight intensity={.95} />
          <hemisphereLight args={["#fffaf1", "#9ba98b", 1.5]} />
          <directionalLight
            position={[-9, 21, 11]}
            intensity={2.9}
            castShadow
            shadow-mapSize={[768, 768]}
            shadow-bias={-0.0003}
            shadow-camera-left={-30}
            shadow-camera-right={30}
            shadow-camera-top={24}
            shadow-camera-bottom={-24}
          />
          <Suspense fallback={null}>
            <MonumentModel id={selected} />
          </Suspense>
          <CameraDirector selected={selected} reset={cameraReset} cinematic={cinematic && !reduceMotion} />
          <OrbitControls
            key={`${selected}-${cameraReset}`}
            target={targets[selected]}
            enabled={!cinematic}
            enableDamping
            dampingFactor={.055}
            enablePan={false}
            minDistance={selected === "mammadbayli" ? 9 : 15}
            maxDistance={selected === "mammadbayli" ? 28 : 65}
            maxPolarAngle={Math.PI * .48}
            minPolarAngle={.15}
          />
        </Canvas>
        <span className="studio-watermark">MEMARLIQ REKONSTRUKSİYASI</span>
        <div className="studio-controls">
          <button type="button" onClick={() => setCinematic((v) => !v)}>
            {cinematic ? "Ⅱ  Kameranı dayandır" : "▶  Kinematik baxış"}
          </button>
          <button type="button" onClick={() => { setCinematic(false); setCameraReset((v) => v + 1); }}>
            ◎  İlk baxışa dön
          </button>
          <a href={chosen.modelPath} download title="Bu abidənin GLB 3D faylı">↓  3D faylı</a>
        </div>
      </div>
      <div className="studio-footer">
        <div className="studio-stat"><span>DÖVR</span><strong>{chosen.period}</strong></div>
        <div className="studio-stat"><span>MƏKAN</span><strong>{chosen.location}</strong></div>
        <div className="studio-stat"><span>QURULUŞ</span><strong>{chosen.type}</strong></div>
      </div>
      <p className="studio-disclaimer">
        Modellər abidələrin məlum memarlıq quruluşuna əsaslanır; dəqiq ölçüsü təsdiqlənməyən hissələr rekonstruksiyadır.
      </p>
    </div>
  );
}
