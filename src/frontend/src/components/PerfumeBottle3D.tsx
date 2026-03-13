import {
  Environment,
  MeshDistortMaterial,
  OrbitControls,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

function BottleGroup() {
  const groupRef = useRef<Mesh>(null);
  const timeRef = useRef(0);

  useFrame((_, delta) => {
    timeRef.current += delta;
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4;
      groupRef.current.position.y = Math.sin(timeRef.current * 0.8) * 0.12;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Base / plinth */}
      <mesh position={[0, -2.1, 0]}>
        <cylinderGeometry args={[0.65, 0.65, 0.1, 32]} />
        <meshStandardMaterial color="#c8a84b" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Bottle body */}
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.52, 0.58, 2.8, 64]} />
        <meshPhysicalMaterial
          color="#d4a843"
          transparent={true}
          opacity={0.82}
          roughness={0.05}
          metalness={0.15}
          transmission={0.6}
          thickness={0.5}
          envMapIntensity={2}
        />
      </mesh>

      {/* Bottle shoulder (narrowing) */}
      <mesh position={[0, 0.85, 0]}>
        <cylinderGeometry args={[0.35, 0.52, 0.4, 32]} />
        <meshPhysicalMaterial
          color="#d4a843"
          transparent={true}
          opacity={0.82}
          roughness={0.05}
          metalness={0.15}
          transmission={0.6}
          thickness={0.5}
          envMapIntensity={2}
        />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 1.22, 0]}>
        <cylinderGeometry args={[0.22, 0.35, 0.44, 32]} />
        <meshStandardMaterial color="#c8a84b" metalness={0.8} roughness={0.1} />
      </mesh>

      {/* Cap */}
      <mesh position={[0, 1.68, 0]}>
        <cylinderGeometry args={[0.28, 0.28, 0.5, 32]} />
        <meshStandardMaterial
          color="#c8a84b"
          metalness={0.95}
          roughness={0.05}
        />
      </mesh>

      {/* Cap top */}
      <mesh position={[0, 1.95, 0]}>
        <sphereGeometry args={[0.28, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial
          color="#c8a84b"
          metalness={0.95}
          roughness={0.05}
        />
      </mesh>

      {/* Inner liquid */}
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.44, 0.49, 2.6, 32]} />
        <MeshDistortMaterial
          color="#e8b84b"
          transparent={true}
          opacity={0.5}
          distort={0.05}
          speed={1}
        />
      </mesh>

      {/* Label area (darker band on bottle) */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.53, 0.53, 1.4, 64]} />
        <meshStandardMaterial color="#1a1208" transparent opacity={0.4} />
      </mesh>

      {/* Decorative ring at bottom of cap */}
      <mesh position={[0, 1.44, 0]}>
        <torusGeometry args={[0.26, 0.025, 16, 64]} />
        <meshStandardMaterial color="#f0d060" metalness={1} roughness={0.05} />
      </mesh>
    </group>
  );
}

export default function PerfumeBottle3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} color="#d4a843" intensity={2} />
      <pointLight position={[-5, 3, -3]} color="#ffffff" intensity={0.8} />
      <pointLight position={[0, -5, 2]} color="#c8a84b" intensity={0.5} />
      <spotLight
        position={[0, 8, 0]}
        color="#f0d878"
        intensity={3}
        angle={0.3}
        penumbra={0.5}
        castShadow
      />
      <BottleGroup />
      <Environment preset="city" />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        dampingFactor={0.1}
        enableDamping={true}
        maxPolarAngle={Math.PI * 0.7}
        minPolarAngle={Math.PI * 0.3}
      />
    </Canvas>
  );
}
