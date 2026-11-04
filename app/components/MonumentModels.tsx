"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import type { MonumentId } from "../data/heritage";

type StoneKind = "limestone" | "riverstone" | "brick" | "dark" | "soil";
type StoneMaterials = Record<StoneKind, THREE.MeshStandardMaterial>;

// Teksturalar brauzerdə yaradılır: səth ləkələri, xırda daş dənələri,
// kənar qaralmaları. Xarici 3D fayla ehtiyac yoxdur.
function createStoneTexture(seed: number) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 256;
  const ctx = canvas.getContext("2d")!;
  const image = ctx.createImageData(256, 256);
  let rnd = seed;
  function random() {
    rnd = (rnd * 1664525 + 1013904223) >>> 0;
    return rnd / 4294967296;
  }
  const coarse = Array.from({ length: 18 * 18 }, () => random() * 2 - 1);
  for (let y = 0; y < 256; y++) {
    for (let x = 0; x < 256; x++) {
      const coarseX = Math.floor(x / 15) % 18;
      const coarseY = Math.floor(y / 15) % 18;
      const cloud = coarse[coarseY * 18 + coarseX];
      const streaks = Math.sin(y * 0.24 + Math.sin(x * 0.027) * 2.5) * 4;
      const v = Math.min(255, Math.max(72, 189 + cloud * 26 + (random() - .5) * 50 + streaks));
      const i = (y * 256 + x) * 4;
      image.data[i] = v;
      image.data[i + 1] = v * .985;
      image.data[i + 2] = v * .96;
      image.data[i + 3] = 255;
    }
  }
  ctx.putImageData(image, 0, 0);
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 2);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

function useStoneMaterials(): StoneMaterials {
  const resources = useMemo(() => {
    const texture = createStoneTexture(41812);
    const make = (color: string, roughness = .97) => new THREE.MeshStandardMaterial({
      color, map: texture, bumpMap: texture, bumpScale: .035,
      roughness, metalness: 0,
    });
    const materials: StoneMaterials = {
      limestone: make("#f1e5d2"),
      riverstone: make("#b9aea0"),
      brick: make("#b98e74"),
      dark: make("#666357"),
      soil: make("#b1ae92"),
    };
    return { texture, materials };
  }, []);
  useEffect(() => () => {
    Object.values(resources.materials).forEach((m) => m.dispose());
    resources.texture.dispose();
  }, [resources]);
  return resources.materials;
}

function makeBridgeGeometry(count: number, small: boolean) {
  const spacing = small ? 5.8 : 1.86;
  const length = spacing * count + (small ? 2.3 : 1.25);
  const depth = small ? 2.75 : 2.05;
  const top = small ? 3.5 : 3.08;
  const bottom = -1.45;
  const spans = Array.from({ length: count }, (_, i) => {
    const center = (i - (count - 1) / 2) * spacing;
    const radius = small ? (1.98 + i * .09) : (.70 + Math.sin(i * 1.72) * .075);
    return { center, radius, spring: small ? .16 : .78, rise: small ? 2.2 : 1.51 + .09 * Math.cos(i) };
  });

  const outline = new THREE.Shape();
  outline.moveTo(-length / 2, bottom);
  outline.lineTo(length / 2, bottom);
  outline.lineTo(length / 2, top);
  outline.lineTo(-length / 2, top);
  outline.closePath();

  for (const span of spans) {
    const hole = new THREE.Path();
    hole.moveTo(span.center - span.radius, -1.37);
    hole.lineTo(span.center + span.radius, -1.37);
    hole.lineTo(span.center + span.radius, span.spring);
    hole.absellipse(span.center, span.spring, span.radius, span.rise, 0, Math.PI, false, 0);
    hole.lineTo(span.center - span.radius, -1.37);
    hole.closePath();
    outline.holes.push(hole);
  }

  const wall = new THREE.ExtrudeGeometry(outline, {
    depth, steps: 1, curveSegments: 16,
    bevelEnabled: true, bevelSize: .025, bevelThickness: .023, bevelSegments: 2,
  });
  wall.computeVertexNormals();

  const ringPieces: THREE.ExtrudeGeometry[] = [];
  for (const span of spans) {
    const n = small ? 24 : 14;
    for (let i = 0; i < n; i++) {
      const a = i * Math.PI / n + .002;
      const b = (i + 1) * Math.PI / n - .002;
      const ring = new THREE.Shape();
      for (let j = 0; j <= 4; j++) {
        const angle = a + (b - a) * j / 4;
        const x = span.center + (span.radius + .17) * Math.cos(angle);
        const y = span.spring + (span.rise + .17) * Math.sin(angle);
        if (j === 0) ring.moveTo(x, y);
        else ring.lineTo(x, y);
      }
      for (let j = 4; j >= 0; j--) {
        const angle = a + (b - a) * j / 4;
        ring.lineTo(span.center + (span.radius - .005) * Math.cos(angle),
          span.spring + (span.rise - .005) * Math.sin(angle));
      }
      ring.closePath();
      ringPieces.push(new THREE.ExtrudeGeometry(ring, {
        depth: .075, bevelEnabled: true, bevelThickness: .013, bevelSize: .013,
        bevelSegments: 1, curveSegments: 4,
      }));
    }
  }
  return { wall, ringPieces, length, depth, top, spans };
}

function AnimatedRiver() {
  const material = useRef<THREE.ShaderMaterial>(null);
  useFrame((state) => {
    if (material.current) material.current.uniforms.uTime.value = state.clock.elapsedTime;
  });
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.27, 0]}>
      <planeGeometry args={[50, 12, 1, 1]} />
      <shaderMaterial ref={material} transparent={false} depthWrite
        uniforms={{ uTime: { value: 0 } }}
        vertexShader={`varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`}
        fragmentShader={`
          uniform float uTime;
          varying vec2 vUv;
          void main(){
            float a=sin(vUv.x*83.0+vUv.y*17.0+uTime*.75);
            float b=sin(vUv.x*36.0-vUv.y*45.0-uTime*.51);
            float c=sin(vUv.x*135.0+vUv.y*15.0+uTime*.97);
            float wave=(a*.48+b*.38+c*.14)*.5+.5;
            vec3 deep=vec3(.17,.35,.36);
            vec3 light=vec3(.41,.58,.54);
            vec3 col=mix(deep,light,wave*.6);
            col+=pow(max(0.,wave-.74)*3.8,3.)*vec3(.26,.29,.25);
            gl_FragColor=vec4(col,1.0);
          }`}
      />
    </mesh>
  );
}

function Bank({ side, small }: { side: -1 | 1; small: boolean }) {
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(48, 14, 48, 26);
    geo.rotateX(-Math.PI / 2);
    const a = geo.attributes.position;
    for (let i = 0; i < a.count; i++) {
      const x = a.getX(i), z = a.getZ(i) + 11.3;
      const rise = Math.max(0, (z - 4.3) / 14);
      const y = -1.47 + 2.9 * rise ** 1.6 + .23 * Math.sin(x * .42) * rise + .15 * Math.sin(x * 1.3 + z * 1.4) * rise;
      a.setZ(i, z);
      a.setY(i, y);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);
  useEffect(() => () => geometry.dispose(), [geometry]);
  const trees = useMemo(() => Array.from({ length: small ? 18 : 26 }, (_, i) => {
    const v = (i * 0.6180339887) % 1;
    const x = -23 + ((i * 7.71) % 46);
    const z = 5.1 + v * 12;
    const rise = Math.max(0, (z - 4.3) / 14);
    const y = -1.47 + 2.9 * rise ** 1.6 + .23 * Math.sin(x * .42) * rise + .15 * Math.sin(x * 1.3 + z * 1.4) * rise;
    return { x, z, y, size: .17 + v * .28 };
  }), [small]);
  return (
    <group rotation={[0, side === 1 ? 0 : Math.PI, 0]}>
      <mesh geometry={geometry} receiveShadow>
        <meshStandardMaterial color={small ? "#8e9270" : "#a0a98c"} roughness={1} />
      </mesh>
      {trees.map((t, i) => (
        <group key={i} position={[t.x, t.y + t.size, t.z]}>
          <mesh>
            <icosahedronGeometry args={[t.size, 1]} />
            <meshStandardMaterial color={i % 4 === 0 ? "#627e58" : "#768b65"} roughness={1} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function StoneBridge({ small }: { small: boolean }) {
  const mats = useStoneMaterials();
  const model = useMemo(() => makeBridgeGeometry(small ? 2 : 15, small), [small]);
  // Combine arch stones into two static draw calls instead of >400 separate meshes.
  const mergedRings = useMemo(() => {
    const groups: THREE.BufferGeometry[][] = [[], []];
    model.ringPieces.forEach((g, i) => {
      for (const z of [-.08, model.depth + .01]) {
        const copy = g.clone();
        copy.translate(0, 0, z);
        groups[i % 6 === 0 ? 1 : 0].push(copy);
      }
    });
    const result = groups.map((items) => {
      const merged = mergeGeometries(items, false);
      items.forEach((geo) => geo.dispose());
      return merged;
    });
    return result;
  }, [model]);
  useEffect(() => () => {
    model.wall.dispose();
    model.ringPieces.forEach((g) => g.dispose());
    mergedRings.forEach((g) => g?.dispose());
  }, [model, mergedRings]);
  return (
    <group position={[0, .25, 0]}>
      <AnimatedRiver />
      <Bank side={1} small={small} />
      <Bank side={-1} small={small} />
      <group position={[0, 0, -model.depth / 2]}>
        <mesh geometry={model.wall} material={mats.riverstone} castShadow receiveShadow />
        {mergedRings[0] && <mesh geometry={mergedRings[0]} material={mats.limestone} castShadow />}
        {mergedRings[1] && <mesh geometry={mergedRings[1]} material={mats.brick} castShadow />}
      </group>
      <mesh position={[0, model.top + .22, 0]} material={mats.brick} castShadow receiveShadow>
        <boxGeometry args={[model.length + .1, .44, model.depth + .32]} />
      </mesh>
      {[-1, 1].map((side) => (
        <group key={side} position={[0, model.top + .53, side * (model.depth / 2 + .08)]}>
          <mesh material={mats.riverstone} castShadow receiveShadow>
            <boxGeometry args={[model.length + .2, .58, .3]} />
          </mesh>
          <mesh position={[0, .34, 0]} material={mats.limestone} castShadow>
            <boxGeometry args={[model.length + .3, .09, .37]} />
          </mesh>
        </group>
      ))}
      {Array.from({ length: model.spans.length - 1 }, (_, i) => {
        const x = (model.spans[i].center + model.spans[i + 1].center) / 2;
        return [-1, 1].map((zsign) => (
          <group key={`${i}-${zsign}`} position={[x, .3, zsign * (model.depth / 2 + .25)]}>
            <mesh material={mats.riverstone} castShadow receiveShadow>
              <boxGeometry args={[small ? .72 : .28, 2.45, small ? .68 : .45]} />
            </mesh>
            <mesh position={[0, -1.0, zsign * .25]} rotation={[0, zsign === 1 ? 0 : Math.PI, 0]} material={mats.dark} castShadow>
              <coneGeometry args={[small ? .72 : .34, 1.1, 3]} />
            </mesh>
          </group>
        ));
      })}
      {[-1, 1].map((side) => (
        <mesh key={side} position={[side * (model.length / 2 + .9), -.5, 0]} material={mats.soil} receiveShadow>
          <dodecahedronGeometry args={[2.6, 1]} />
        </mesh>
      ))}
    </group>
  );
}

function OctagonMausoleum() {
  const mats = useStoneMaterials();
  const radius = 2.6;
  const face = 2 * radius * Math.sin(Math.PI / 8);
  const inradius = radius * Math.cos(Math.PI / 8);
  const blocks = useMemo(() => {
    const list: { pos: [number, number, number]; rot: number; dims: [number, number, number]; mat: StoneKind }[] = [];
    for (let side = 0; side < 8; side++) {
      const a = side * Math.PI / 4;
      for (let row = 0; row < 14; row++) {
        const h = .37, y = .5 + row * h;
        const n = row % 2 === 0 ? 4 : 5;
        for (let col = 0; col < n; col++) {
          const width = face / n - .026;
          const along = -face / 2 + (col + .5) * (face / n);
          const tangent = new THREE.Vector3(Math.cos(a), 0, -Math.sin(a));
          const normal = new THREE.Vector3(Math.sin(a), 0, Math.cos(a));
          const x = normal.x * inradius + tangent.x * along;
          const z = normal.z * inradius + tangent.z * along;
          list.push({
            pos: [x, y, z], rot: a,
            dims: [width, h - .014, .34],
            mat: ((row + col + side * 2) % 17 === 0) ? "dark" : "limestone",
          });
        }
      }
    }
    return list;
  }, [face, inradius]);

  const invalidate = useThree((state) => state.invalidate);
  const limestoneBlocks = useRef<THREE.InstancedMesh>(null);
  const darkBlocks = useRef<THREE.InstancedMesh>(null);
  const plainBlocks = useMemo(() => blocks.filter((b) => b.mat === "limestone"), [blocks]);
  const darkStoneBlocks = useMemo(() => blocks.filter((b) => b.mat === "dark"), [blocks]);
  useEffect(() => {
    const dummy = new THREE.Object3D();
    for (const [mesh, group] of [
      [limestoneBlocks.current, plainBlocks],
      [darkBlocks.current, darkStoneBlocks],
    ] as const) {
      if (!mesh) continue;
      group.forEach((b, i) => {
        dummy.position.set(...b.pos);
        dummy.rotation.set(0, b.rot, 0);
        dummy.scale.set(...b.dims);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
      });
      mesh.instanceMatrix.needsUpdate = true;
    }
    invalidate();
  }, [plainBlocks, darkStoneBlocks, invalidate]);

  const archGeometry = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-.82, .63);
    s.lineTo(.82, .63);
    s.lineTo(.82, 2.52);
    s.quadraticCurveTo(.78, 2.92, 0, 3.22);
    s.quadraticCurveTo(-.78, 2.92, -.82, 2.52);
    s.closePath();
    return new THREE.ExtrudeGeometry(s, { depth: .13, bevelEnabled: true, bevelSize: .035, bevelThickness: .025, bevelSegments: 2, curveSegments: 12 });
  }, []);
  useEffect(() => () => archGeometry.dispose(), [archGeometry]);

  return (
    <group position={[0, -.25, 0]}>
      <mesh position={[0, -.4, 0]} receiveShadow>
        <cylinderGeometry args={[7, 7.7, .65, 8]} />
        <meshStandardMaterial color="#b7b7a3" roughness={1} />
      </mesh>
      <mesh position={[0, .0, 0]} material={mats.riverstone} castShadow receiveShadow>
        <cylinderGeometry args={[2.8, 2.83, .55, 8]} />
      </mesh>
      <mesh position={[0, 3.0, 0]} material={mats.limestone} castShadow receiveShadow>
        <cylinderGeometry args={[radius, radius, 5.12, 8, 1]} />
      </mesh>
      <instancedMesh ref={limestoneBlocks} args={[undefined, undefined, plainBlocks.length]} material={mats.limestone} castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
      </instancedMesh>
      <instancedMesh ref={darkBlocks} args={[undefined, undefined, darkStoneBlocks.length]} material={mats.dark} castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
      </instancedMesh>
      {[5.66, 5.86, 6.1].map((y, i) => (
        <mesh key={y} position={[0, y, 0]} material={i === 1 ? mats.dark : mats.limestone} castShadow>
          <cylinderGeometry args={[2.78 + i * .05, 2.78 + i * .05, i === 1 ? .18 : .16, 8]} />
        </mesh>
      ))}
      <mesh position={[0, 7.31, 0]} rotation={[0, Math.PI / 8, 0]} material={mats.riverstone} castShadow>
        <coneGeometry args={[2.93, 2.40, 8, 1]} />
      </mesh>
      <mesh position={[0, 8.55, 0]} material={mats.dark} castShadow>
        <cylinderGeometry args={[.22, .27, .32, 8]} />
      </mesh>
      {/* Qapı və üstündəki dekorativ kitabə sahəsi: orijinal mətn təqlid edilmir. */}
      <group position={[0, 0, inradius + .23]}>
        <mesh geometry={archGeometry} material={mats.dark} castShadow />
        <mesh position={[0, 1.62, .17]}>
          <boxGeometry args={[1.42, 1.75, .015]} />
          <meshStandardMaterial color="#3f4039" roughness={1} />
        </mesh>
        <mesh position={[0, 3.75, .22]} material={mats.dark} castShadow>
          <boxGeometry args={[2.04, .55, .18]} />
        </mesh>
        {Array.from({ length: 9 }, (_, i) => (
          <mesh key={i} position={[-.82 + i * .205, 3.76 + Math.sin(i * 1.9) * .028, .335]} material={mats.limestone}>
            <boxGeometry args={[.095, .10 + (i % 3) * .035, .018]} />
          </mesh>
        ))}
      </group>
      {Array.from({ length: 5 }, (_, i) => (
        <mesh key={i} position={[0, -.04 - i * .15, inradius + .9 + i * .24]} material={mats.riverstone} castShadow receiveShadow>
          <boxGeometry args={[2.75 + i * .25, .19, .58]} />
        </mesh>
      ))}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -.73, 0]} receiveShadow>
        <circleGeometry args={[26, 80]} />
        <meshStandardMaterial color="#b1b99c" roughness={1} />
      </mesh>
      {Array.from({ length: 20 }, (_, i) => {
        const a = i * 2.39996, r = 7.8 + (i % 6) * .65;
        return (
          <group key={i} position={[Math.cos(a) * r, -.3, Math.sin(a) * r]}>
            <mesh>
              <icosahedronGeometry args={[.35 + (i % 5) * .08, 1]} />
              <meshStandardMaterial color={i % 3 === 0 ? "#5c7958" : "#718c60"} roughness={1} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

export function MonumentModel({ id }: { id: MonumentId }) {
  if (id === "mammadbayli") return <OctagonMausoleum />;
  return <StoneBridge small={id === "lalezar"} />;
}
