"use client";

import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Float, Html } from "@react-three/drei";

export type ZentroRobotPose = "idle" | "wave" | "talk" | "celebrate";

type ZentroRobotModelProps = {
  pose?: ZentroRobotPose;
};

export function ZentroRobotModel({ pose = "idle" }: ZentroRobotModelProps) {
  const group = useRef<THREE.Group>(null);
  const leftArm = useRef<THREE.Group>(null);
  const rightArm = useRef<THREE.Group>(null);
  const smile = useRef<THREE.Mesh>(null);
  const antenna = useRef<THREE.Mesh>(null);
  const leftEye = useRef<THREE.Mesh>(null);
  const rightEye = useRef<THREE.Mesh>(null);

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

  const cheek = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#38bdf8"),
        emissive: new THREE.Color("#22d3ee"),
        emissiveIntensity: 0.35,
        transparent: true,
        opacity: 0.55,
      }),
    []
  );

  const antennaMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#34d399"),
        emissive: new THREE.Color("#34d399"),
        emissiveIntensity: 1.4,
      }),
    []
  );

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!group.current) return;

    const bounce =
      pose === "celebrate" ? Math.sin(t * 3.5) * 0.08 : Math.sin(t * 1.2) * 0.04;
    group.current.position.y = bounce;
    group.current.rotation.y = Math.sin(t * 0.45) * 0.12 + state.pointer.x * 0.22;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -state.pointer.y * 0.08,
      0.08
    );

    const blink = Math.sin(t * 0.9) > 0.96 ? 0.15 : 1;
    if (leftEye.current) leftEye.current.scale.y = blink;
    if (rightEye.current) rightEye.current.scale.y = blink;

    if (leftArm.current) {
      if (pose === "celebrate") {
        leftArm.current.rotation.z = 0.9 + Math.sin(t * 4) * 0.25;
      } else {
        leftArm.current.rotation.z = Math.sin(t * 1.4) * 0.08 + 0.18;
      }
    }

    if (rightArm.current) {
      if (pose === "wave" || pose === "celebrate") {
        rightArm.current.rotation.z = -1.45 + Math.sin(t * 5.8) * 0.48;
        rightArm.current.rotation.x = Math.sin(t * 5.8) * 0.22;
      } else if (pose === "talk") {
        rightArm.current.rotation.z = -0.55 + Math.sin(t * 3.2) * 0.12;
        rightArm.current.rotation.x = Math.sin(t * 2.8) * 0.08;
      } else {
        rightArm.current.rotation.z = -Math.sin(t * 1.4) * 0.08 - 0.18;
      }
    }

    if (smile.current) {
      const pulse = pose === "talk" || pose === "celebrate" ? 1 + Math.sin(t * 4) * 0.05 : 1;
      smile.current.scale.set(pulse, pulse, pulse);
    }

    if (antenna.current) {
      const pulse = 0.8 + (Math.sin(t * 6) + 1) * 0.35;
      (antenna.current.material as THREE.MeshStandardMaterial).emissiveIntensity = pulse;
    }
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

      {/* antenna */}
      <mesh material={metal} position={[0, 1.12, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.18, 12]} />
      </mesh>
      <mesh ref={antenna} material={antennaMat} position={[0, 1.24, 0]} castShadow>
        <sphereGeometry args={[0.045, 16, 16]} />
      </mesh>

      {/* happy eyes */}
      <mesh ref={leftEye} material={glow} position={[-0.1, 0.86, 0.27]} castShadow>
        <sphereGeometry args={[0.034, 16, 16]} />
      </mesh>
      <mesh ref={rightEye} material={glow} position={[0.1, 0.86, 0.27]} castShadow>
        <sphereGeometry args={[0.034, 16, 16]} />
      </mesh>

      {/* eye shine */}
      <mesh position={[-0.088, 0.872, 0.3]}>
        <sphereGeometry args={[0.008, 8, 8]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.112, 0.872, 0.3]}>
        <sphereGeometry args={[0.008, 8, 8]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* smile arc */}
      <mesh ref={smile} position={[0, 0.74, 0.28]} rotation={[0, 0, Math.PI]}>
        <torusGeometry args={[0.09, 0.015, 8, 24, Math.PI]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#38bdf8"
          emissiveIntensity={1.6}
        />
      </mesh>

      {/* cheek glow */}
      <mesh material={cheek} position={[-0.17, 0.78, 0.24]}>
        <sphereGeometry args={[0.04, 12, 12]} />
      </mesh>
      <mesh material={cheek} position={[0.17, 0.78, 0.24]}>
        <sphereGeometry args={[0.04, 12, 12]} />
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
        {/* open palm for wave */}
        <mesh material={metal} position={[0, -0.38, 0.04]} rotation={[0.2, 0, 0]} castShadow>
          <boxGeometry args={[0.14, 0.04, 0.1]} />
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

type ZentroRobotSceneProps = {
  pose?: ZentroRobotPose;
  compact?: boolean;
  className?: string;
};

export function ZentroRobotScene({
  pose = "wave",
  compact = false,
  className = "",
}: ZentroRobotSceneProps) {
  return (
    <div
      className={className}
      style={{
        width: "100%",
        height: "100%",
        minHeight: compact ? 96 : 320,
      }}
    >
      <Canvas
        shadows={!compact}
        dpr={compact ? [1, 1.25] : [1, 1.75]}
        camera={{
          position: compact ? [0, 0.2, 2.2] : [0, 0.35, 2.6],
          fov: compact ? 38 : 42,
        }}
      >
        <color attach="background" args={["#070a12"]} />
        <ambientLight intensity={0.42} />
        <directionalLight position={[3, 4, 2]} intensity={1.25} castShadow={!compact} />
        <pointLight position={[-2, 1.5, 2]} intensity={1.05} color="#38bdf8" />
        <pointLight position={[2, 0.5, -1]} intensity={0.7} color="#a78bfa" />
        <hemisphereLight intensity={0.28} color="#7dd3fc" groundColor="#1e1b4b" />

        <Suspense
          fallback={
            <Html center>
              <span className="text-[10px] text-white/60">…</span>
            </Html>
          }
        >
          <Float speed={1.05} rotationIntensity={0.15} floatIntensity={0.25}>
            <ZentroRobotModel pose={pose} />
          </Float>
          {!compact ? (
            <ContactShadows position={[0, -0.88, 0]} opacity={0.5} blur={2.4} far={2.2} />
          ) : null}
        </Suspense>
      </Canvas>
    </div>
  );
}
