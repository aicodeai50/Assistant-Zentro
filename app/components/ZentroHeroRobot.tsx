"use client";

import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Float, Html } from "@react-three/drei";

function ZentroRobotCore() {
  const group = useRef<THREE.Group>(null);
  const leftArm = useRef<THREE.Group>(null);
  const rightArm = useRef<THREE.Group>(null);

  const metal = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#c8d0dc"),
        metalness: 1,
        roughness: 0.18,
        clearcoat: 0.75,
        clearcoatRoughness: 0.12,
      }),
    []
  );

  const dark = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#0d1118"),
        metalness: 0.85,
        roughness: 0.45,
      }),
    []
  );

  const glow = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#070a12"),
        emissive: new THREE.Color("#38bdf8"),
        emissiveIntensity: 2.2,
      }),
    []
  );

  const accent = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#070a12"),
        emissive: new THREE.Color("#a78bfa"),
        emissiveIntensity: 1.8,
      }),
    []
  );

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!group.current) return;

    group.current.position.y = Math.sin(t * 1.2) * 0.04;
    group.current.rotation.y = Math.sin(t * 0.45) * 0.18 + state.pointer.x * 0.35;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -state.pointer.y * 0.12,
      0.08
    );

    if (leftArm.current) leftArm.current.rotation.z = Math.sin(t * 1.6) * 0.12 + 0.25;
    if (rightArm.current) rightArm.current.rotation.z = -Math.sin(t * 1.6) * 0.12 - 0.25;
  });

  return (
    <group ref={group} position={[0, -0.1, 0]}>
      <mesh material={metal} castShadow receiveShadow>
        <capsuleGeometry args={[0.42, 0.72, 12, 20]} />
      </mesh>

      <mesh material={accent} position={[0, 0.1, 0.44]} castShadow>
        <ringGeometry args={[0.06, 0.14, 32]} />
      </mesh>
      <mesh material={glow} position={[0, 0.1, 0.46]} castShadow>
        <circleGeometry args={[0.05, 32]} />
      </mesh>

      <mesh material={metal} position={[0, 0.82, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.3, 32, 32]} />
      </mesh>

      <mesh material={dark} position={[0, 0.82, 0.2]} castShadow>
        <boxGeometry args={[0.42, 0.14, 0.1]} />
      </mesh>

      <mesh material={glow} position={[-0.1, 0.82, 0.27]} castShadow>
        <sphereGeometry args={[0.028, 16, 16]} />
      </mesh>
      <mesh material={glow} position={[0.1, 0.82, 0.27]} castShadow>
        <sphereGeometry args={[0.028, 16, 16]} />
      </mesh>

      <group ref={leftArm} position={[-0.56, 0.3, 0]}>
        <mesh material={metal} castShadow>
          <capsuleGeometry args={[0.11, 0.36, 10, 16]} />
        </mesh>
        <mesh material={dark} position={[0, -0.28, 0]} castShadow>
          <sphereGeometry args={[0.11, 20, 20]} />
        </mesh>
      </group>

      <group ref={rightArm} position={[0.56, 0.3, 0]}>
        <mesh material={metal} castShadow>
          <capsuleGeometry args={[0.11, 0.36, 10, 16]} />
        </mesh>
        <mesh material={dark} position={[0, -0.28, 0]} castShadow>
          <sphereGeometry args={[0.11, 20, 20]} />
        </mesh>
      </group>

      <mesh material={dark} position={[0, -0.64, 0]} receiveShadow>
        <cylinderGeometry args={[0.5, 0.62, 0.16, 36]} />
      </mesh>

      <mesh material={glow} position={[0, -0.55, 0]} receiveShadow>
        <torusGeometry args={[0.4, 0.018, 16, 64]} />
      </mesh>
    </group>
  );
}

export default function ZentroHeroRobot() {
  return (
    <div className="relative h-[min(420px,52vw)] min-h-[320px] w-full overflow-hidden rounded-2xl border border-cyan-400/20 bg-gradient-to-b from-white/[0.06] to-black/40 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between px-4 py-3 text-[10px] uppercase tracking-[0.16em] text-white/45">
        <span>Zentro Unit · Online</span>
        <span className="text-cyan-300">3D Core Active</span>
      </div>

      <Canvas shadows dpr={[1, 1.75]} camera={{ position: [0, 0.35, 2.6], fov: 42 }}>
        <color attach="background" args={["#070a12"]} />
        <ambientLight intensity={0.35} />
        <directionalLight position={[3, 4, 2]} intensity={1.35} castShadow />
        <pointLight position={[-2, 1.5, 2]} intensity={1.1} color="#38bdf8" />
        <pointLight position={[2, 0.5, -1]} intensity={0.7} color="#a78bfa" />

        <Suspense
          fallback={
            <Html center>
              <span className="text-xs text-white/60">Loading robot…</span>
            </Html>
          }
        >
          <Float speed={1.05} rotationIntensity={0.2} floatIntensity={0.3}>
            <ZentroRobotCore />
          </Float>
          <Environment preset="night" />
          <ContactShadows position={[0, -0.88, 0]} opacity={0.5} blur={2.4} far={2.2} />
        </Suspense>
      </Canvas>
    </div>
  );
}
