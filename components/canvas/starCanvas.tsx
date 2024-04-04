import React, { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Preload } from '@react-three/drei'

import * as THREE from "three";
import CanvasLoader from './canvasLoader';

const CustomGeometryParticles: React.FC<{ count: number; shape: string }> = (props) => {
  const { count, shape } = props;

  // This reference gives us direct access to our points
  const points = useRef<any>();

  useFrame((state, delta) => {
    if (points.current) {
      points.current.rotation.x += delta / 10
      points.current.rotation.y += delta / 15
    }
  })

  // Generate our positions attributes array
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);

    if (shape === "box") {
      for (let i = 0; i < count; i++) {
        let x = (Math.random() - 0.5) * 2;
        let y = (Math.random() - 0.5) * 2;
        let z = (Math.random() - 0.5) * 2;

        positions.set([x, y, z], i * 3);
      }
    }

    if (shape === "sphere") {
      const distance = 1;

      for (let i = 0; i < count; i++) {
        const theta = THREE.MathUtils.randFloatSpread(360);
        const phi = THREE.MathUtils.randFloatSpread(360);

        let x = distance * Math.sin(theta) * Math.cos(phi);
        let y = distance * Math.sin(theta) * Math.sin(phi);
        let z = distance * Math.cos(theta);

        positions.set([x, y, z], i * 3);
      }
    }

    return positions;
  }, [count, shape]);

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.003}
        color="#5786F5"
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
};

const StarsCanvas: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0 z-[-1]">
      <Canvas camera={{ position: [0, 0, .01] }}>
        <Suspense fallback={<CanvasLoader />}>
          <CustomGeometryParticles count={5000} shape="box" />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  )
}

export default StarsCanvas;
