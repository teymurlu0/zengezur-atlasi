"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const CHAPTERS = [
  {
    label: "Landşaft",
    title: "Hər yol əvvəlcə ərazidən keçir.",
    body: "Dağ silsilələri və çay vadiləri yeni nəqliyyat xətlərinin istiqamətini müəyyənləşdirir.",
    time: "01 / 05",
  },
  {
    label: "Hazırlıq",
    title: "Ərazi hazırlanır.",
    body: "Torpaq işləri, yanaşma yolları və texnikanın hərəkəti tikintinin ilk görünən mərhələləridir.",
    time: "02 / 05",
  },
  {
    label: "Konstruksiya",
    title: "Vadinin üzərində dayaqlar ucalır.",
    body: "Körpü dayaqları yolun çay və relyef maneələrindən keçməsini mümkün edir.",
    time: "03 / 05",
  },
  {
    label: "Birləşmə",
    title: "Relslər vahid xəttə çevrilir.",
    body: "Yol yatağı, keçid konstruksiyası və dəmir yolu üst quruluşu ardıcıl tamamlanır.",
    time: "04 / 05",
  },
  {
    label: "Hərəkət",
    title: "Yeni əlaqələr gündəlik həyata qoşulur.",
    body: "Dəmir yolu, avtomobil yolu və yaşayış məkanları bölgə daxilində hərəkət imkanlarını genişləndirir.",
    time: "05 / 05",
  },
] as const;

const TOTAL = 50; // one storytelling loop, seconds
const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
const smooth = (x: number) => {
  const t = clamp01(x);
  return t * t * (3 - 2 * t);
};

function Landscape() {
  const geometry = useMemo(() => {
    const plane = new THREE.PlaneGeometry(36, 25, 76, 52);
    plane.rotateX(-Math.PI / 2);
    const position = plane.attributes.position;
    const color = new THREE.Color();
    const colors: number[] = [];
    const grass = new THREE.Color("#9fb38e");
    const rock = new THREE.Color("#aab09f");
    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i);
      const z = position.getZ(i);
      const edge = smooth((Math.abs(z) - 1.45) / 9);
      const ridge = edge * (1.9 + 0.43 * Math.cos(x * .5 + z * .25) + .17 * Math.sin(x * 1.7));
      const high = Math.pow(edge, 2) * Math.max(0, Math.abs(z) - 6) * .26;
      position.setY(i, -.7 + ridge + high);
      color.copy(grass).lerp(rock, clamp01(edge * .78));
      colors.push(color.r, color.g, color.b);
    }
    plane.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    plane.computeVertexNormals();
    return plane;
  }, []);
  useEffect(() => () => geometry.dispose(), [geometry]);
  return (
    <group>
      <mesh geometry={geometry} receiveShadow>
        <meshStandardMaterial vertexColors roughness={.99} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -.69, 5.9]}>
        <planeGeometry args={[36, 2.4]} />
        <meshStandardMaterial color="#79a9b6" metalness={.04} roughness={.45} />
      </mesh>
      <mesh position={[0, -.62, 3.2]}>
        <boxGeometry args={[36, .07, 1.8]} />
        <meshStandardMaterial color="#d1c9ad" roughness={1} />
      </mesh>
    </group>
  );
}

function Trees() {
  const count = 74;
  const ref = useRef<THREE.InstancedMesh>(null);
  useEffect(() => {
    const dummy = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      const x = -17.1 + (i * 7.13) % 34;
      const z = i % 2 ? -7.5 - (i * .37) % 3 : 8.0 + (i * .29) % 2.4;
      const size = .3 + (i * .13) % .34;
      dummy.position.set(x, .4 + Math.abs(z) * .1, z);
      dummy.scale.set(size, size * 1.5, size);
      dummy.rotation.y = i * .91;
      dummy.updateMatrix();
      ref.current?.setMatrixAt(i, dummy.matrix);
    }
    if (ref.current) ref.current.instanceMatrix.needsUpdate = true;
  }, []);
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <coneGeometry args={[.9, 2.2, 6]} />
      <meshStandardMaterial color="#65846a" roughness={1} />
    </instancedMesh>
  );
}

function Train({ visible, motion }: { visible: boolean; motion: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current || !visible) return;
    ref.current.position.x = -15 + ((clock.elapsedTime * 1.9 + motion * 13) % 37);
  });
  return (
    <group ref={ref} visible={visible} position={[-14, 1.37, -.12]}>
      {[0, -3.25, -6.5].map((offset, i) => (
        <group key={offset} position={[offset, 0, 0]}>
          <mesh position={[0, .35, 0]}>
            <boxGeometry args={[3.05, .92, 1.48]} />
            <meshStandardMaterial color={i === 0 ? "#e6ece6" : "#d2ddd6"} metalness={.13} roughness={.42} />
          </mesh>
          <mesh position={[0, .83, 0]}>
            <boxGeometry args={[2.82, .12, 1.52]} />
            <meshStandardMaterial color="#456d5d" metalness={.28} roughness={.4} />
          </mesh>
          {[-.745, .745].map((z) => (
            <group key={z} position={[0, .53, z]}>
              {[-.88, -.3, .32, .9].map((x) => (
                <mesh key={x} position={[x, 0, 0]}>
                  <boxGeometry args={[.41, .3, .025]} />
                  <meshStandardMaterial color="#3d6271" metalness={.24} roughness={.25} />
                </mesh>
              ))}
            </group>
          ))}
          {[-1.05, 1.05].flatMap((x) => [-.62, .62].map((z) => (
            <mesh key={`${x}-${z}`} position={[x, -.22, z]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[.18, .18, .13, 10]} />
              <meshStandardMaterial color="#3c4442" roughness={.7} />
            </mesh>
          )))}
        </group>
      ))}
    </group>
  );
}

function Settlement({ amount }: { amount: number }) {
  return (
    <group position={[8, .15, -5.1]} scale={[1, Math.max(.001, amount), 1]}>
      {Array.from({ length: 10 }, (_, i) => {
        const x = (i % 5) * 1.55 - 3.3;
        const z = Math.floor(i / 5) * 2;
        return (
          <group key={i} position={[x, 0, z]}>
            <mesh position={[0, .42, 0]}>
              <boxGeometry args={[1.04, .84, .84]} />
              <meshStandardMaterial color={i % 2 ? "#e2e5dc" : "#efece2"} roughness={.95} />
            </mesh>
            <mesh position={[0, .99, 0]} rotation={[0, Math.PI / 4, 0]}>
              <coneGeometry args={[.72, .46, 4]} />
              <meshStandardMaterial color="#557c62" roughness={.96} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

function BuildSequence({ progress, active }: { progress: number; active: boolean }) {
  const bridgeRef = useRef<THREE.Group>(null);
  const railRef = useRef<THREE.Group>(null);
  const supportsRef = useRef<THREE.InstancedMesh>(null);
  const roadRef = useRef<THREE.Group>(null);
  const vehicleRef = useRef<THREE.Group>(null);
  const cameraRef = useRef(0);
  const { camera } = useThree();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const supports = 20;
  const groundwork = smooth((progress - .16) / .16);
  const pillars = smooth((progress - .32) / .22);
  const rail = smooth((progress - .56) / .22);
  const settlement = smooth((progress - .78) / .16);

  useFrame(({ clock }, delta) => {
    if (roadRef.current) roadRef.current.scale.x = Math.max(.001, groundwork);
    if (bridgeRef.current) bridgeRef.current.scale.x = Math.max(.001, rail);
    if (railRef.current) railRef.current.scale.x = Math.max(.001, rail);
    for (let i = 0; i < supports; i++) {
      const stagger = smooth(pillars * 1.45 - i / supports * .45);
      dummy.position.set(-14.4 + i * 1.52, -.72 + stagger * .75, 0);
      dummy.scale.set(.7, Math.max(.001, stagger * 1.8), 1.15);
      dummy.updateMatrix();
      supportsRef.current?.setMatrixAt(i, dummy.matrix);
    }
    if (supportsRef.current) supportsRef.current.instanceMatrix.needsUpdate = true;
    if (vehicleRef.current) vehicleRef.current.position.x = -13 + Math.sin(clock.elapsedTime * .7) * 5;
    if (active) {
      cameraRef.current = THREE.MathUtils.damp(cameraRef.current, Math.sin(progress * Math.PI * 2) * 2.5, 1, delta);
      const targetPosition = new THREE.Vector3(23 - progress * 4.1, 13.5 - progress * 1.5, 22 + cameraRef.current);
      camera.position.lerp(targetPosition, 1 - Math.exp(-delta * .27));
      camera.lookAt(0, .35, 0);
    }
  });

  return (
    <>
      <Landscape />
      <Trees />
      <group ref={roadRef} position={[0, -.28, 3.5]} scale={[.001, 1, 1]}>
        <mesh>
          <boxGeometry args={[29, .18, 1.8]} />
          <meshStandardMaterial color="#9a9e95" roughness={.93} />
        </mesh>
        <mesh position={[0, .104, 0]}>
          <boxGeometry args={[29, .01, .045]} />
          <meshStandardMaterial color="#e7e4ca" />
        </mesh>
      </group>
      <group ref={vehicleRef} position={[-8, .23, 3.5]} visible={groundwork > .15 && progress < .81}>
        <mesh position={[0, .12, 0]}>
          <boxGeometry args={[1.75, .55, .9]} />
          <meshStandardMaterial color="#dbb46b" roughness={.73} />
        </mesh>
        <mesh position={[.55, .52, 0]}>
          <boxGeometry args={[.65, .34, .83]} />
          <meshStandardMaterial color="#e7cea0" roughness={.64} />
        </mesh>
        <mesh position={[-.6, .44, 0]} rotation={[0, 0, -.25]}>
          <boxGeometry args={[1.3, .13, .18]} />
          <meshStandardMaterial color="#c59650" />
        </mesh>
      </group>
      <instancedMesh ref={supportsRef} args={[undefined, undefined, supports]}>
        <boxGeometry args={[.92, 1, 1]} />
        <meshStandardMaterial color="#a5aaa3" roughness={.94} />
      </instancedMesh>
      <group ref={bridgeRef} position={[0, .42, 0]} scale={[.001, 1, 1]}>
        <mesh>
          <boxGeometry args={[30, .4, 2.6]} />
          <meshStandardMaterial color="#c4c8c1" roughness={.85} />
        </mesh>
        {[-1.21, 1.21].map(z => (
          <mesh key={z} position={[0, .35, z]}>
            <boxGeometry args={[30, .6, .13]} />
            <meshStandardMaterial color="#e1dfd5" roughness={.9} />
          </mesh>
        ))}
      </group>
      <group ref={railRef} position={[0, .77, 0]} scale={[.001, 1, 1]}>
        {[-.67, .67].map((z) => (
          <mesh key={z} position={[0, .08, z]}>
            <boxGeometry args={[29.7, .12, .11]} />
            <meshStandardMaterial color="#6d7980" metalness={.65} roughness={.3} />
          </mesh>
        ))}
        <Sleepers />
      </group>
      <Settlement amount={settlement} />
      <Train visible={progress > .81} motion={progress * 2} />
    </>
  );
}

function Sleepers() {
  const ref = useRef<THREE.InstancedMesh>(null);
  useEffect(() => {
    const dummy = new THREE.Object3D();
    for (let i = 0; i < 66; i++) {
      dummy.position.set(-14.3 + .44 * i, 0, 0);
      dummy.updateMatrix();
      ref.current?.setMatrixAt(i, dummy.matrix);
    }
    if (ref.current) ref.current.instanceMatrix.needsUpdate = true;
  }, []);
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, 66]}>
      <boxGeometry args={[.17, .12, 2]} />
      <meshStandardMaterial color="#8d7964" roughness={.9} />
    </instancedMesh>
  );
}

function Scene({ progress, playing }: { progress: number; playing: boolean }) {
  return (
    <>
      <color attach="background" args={["#edf2ed"]} />
      <fog attach="fog" args={["#edf2ed", 28, 67]} />
      <ambientLight intensity={1.35} />
      <hemisphereLight args={["#ffffff", "#b4bda8", 1.45]} />
      <directionalLight position={[-9, 19, 12]} intensity={2.1} />
      <BuildSequence progress={progress} active={playing} />
      <OrbitControls enabled={!playing} enablePan={false} enableDamping dampingFactor={.07} minDistance={18} maxDistance={49} minPolarAngle={.35} maxPolarAngle={1.43} />
    </>
  );
}

export default function InfrastructureScene() {
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(true);
  const lastFrame = useRef<number | null>(null);
  const progressRef = useRef(0);
  const reduceMotion = useRef(false);

  const setTimeline = useCallback((value: number) => {
    const next = clamp01(value);
    progressRef.current = next;
    setProgress(next);
  }, []);

  useEffect(() => {
    reduceMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion.current) setPlaying(false);
  }, []);

  useEffect(() => {
    if (!playing) {
      lastFrame.current = null;
      return;
    }
    let frame: number;
    let lastUi = 0;
    const tick = (now: number) => {
      const last = lastFrame.current ?? now;
      const delta = Math.min(.1, Math.max(0, (now - last) / 1000));
      lastFrame.current = now;
      progressRef.current += delta / TOTAL;
      if (progressRef.current >= 1) progressRef.current = 0;
      if (now - lastUi > 75) {
        setProgress(progressRef.current);
        lastUi = now;
      }
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => {
      window.cancelAnimationFrame(frame);
      lastFrame.current = null;
    };
  }, [playing]);

  const step = Math.min(CHAPTERS.length - 1, Math.floor(progress * CHAPTERS.length));
  const chapter = CHAPTERS[step];
  return (
    <div className="infra-story" aria-label="Nəqliyyat infrastrukturunun 3D mərhələləri">
      <div className="infra-story-view">
        <Canvas
          dpr={[1, 1.25]}
          frameloop={playing ? "always" : "demand"}
          camera={{ position: [23, 13.5, 22], fov: 38, near: .1, far: 110 }}
          gl={{ antialias: true, powerPreference: "low-power", alpha: false }}
        >
          <Scene progress={progress} playing={playing} />
        </Canvas>
        <div className="infra-scene-badge">NƏQLİYYAT XƏTTİNİN VİZUAL HƏKAYƏSİ</div>
        <div className="infra-story-overlay" aria-live="off">
          <span className="infra-story-meta">{chapter.time} · {chapter.label.toUpperCase()}</span>
          <div className="infra-story-transition" key={chapter.time}>
            <h3>{chapter.title}</h3>
            <p>{chapter.body}</p>
          </div>
        </div>
        <div className="infra-stage-selector" aria-label="Animasiya mərhələləri">
          {CHAPTERS.map((item, i) => (
            <button
              key={item.label}
              type="button"
              className={i === step ? "infra-step is-current" : "infra-step"}
              onClick={() => { setTimeline(i / CHAPTERS.length + .008); setPlaying(false); }}
              aria-label={`${i + 1}. ${item.label}`}
              aria-current={i === step ? "step" : undefined}
            >
              <span className="infra-step-line"><span style={{ width: `${i < step ? 100 : i === step ? ((progress * 5 - i) * 100) : 0}%` }} /></span>
              <span className="infra-step-text">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="infra-player">
        <div className="infra-play-buttons">
          <button type="button" onClick={() => { setTimeline(0); setPlaying(true); }} aria-label="Animasiya yenidən başlasın">↺ Yenidən</button>
          <button type="button" onClick={() => setPlaying(v => !v)} aria-label={playing ? "Animasiya dayandırılsın" : "Animasiya davam etsin"}>
            {playing ? "Ⅱ Dayandır" : "▶ Davam et"}
          </button>
        </div>
        <span className="infra-player-note">İnkişaf mərhələləri · Konseptual səhnə</span>
        <span className="infra-play-time">{String(Math.floor(progress * TOTAL)).padStart(2, "0")} / {TOTAL} san.</span>
      </div>
    </div>
  );
}
