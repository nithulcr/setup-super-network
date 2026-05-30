'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface SmokeCursorProps {
  particleCount?: number;
  particleSize?: number;
  smokeOpacity?: number;
  smokeColor?: string;
  followSpeed?: number;
}

const vertexShader = `
  varying vec2 vUv;
  varying float vOpacity;
  attribute float aSize;
  attribute float aOpacity;
  
  void main() {
    vUv = uv;
    vOpacity = aOpacity;
    vec4 mvPosition = modelViewMatrix * instanceMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  varying float vOpacity;
  uniform vec3 uColor;
  
  void main() {
    float d = distance(vUv, vec2(0.5));
    float strength = pow(0.05 / d, 1.8);
    strength *= vOpacity;
    
    gl_FragColor = vec4(uColor, strength * 0.4);
  }
`;

const SmokeParticles = ({
  particleCount = 150,
  particleSize = 1.2,
  smokeOpacity = 0.3,
  smokeColor = '#d1255d',
}: SmokeCursorProps) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { viewport, mouse } = useThree();
  
  const particles = useMemo(() => {
    const data = [];
    for (let i = 0; i < particleCount; i++) {
      data.push({
        x: 0,
        y: 0,
        vx: (Math.random() - 0.5) * 0.01,
        vy: (Math.random() - 0.5) * 0.01,
        size: Math.random() * particleSize,
        life: 0,
        maxLife: 0.5 + Math.random() * 1.5,
      });
    }
    return data;
  }, [particleCount, particleSize]);

  const opacityBuffer = useMemo(() => new Float32Array(particleCount), [particleCount]);
  const opacityAttribute = useRef<THREE.InstancedBufferAttribute>(null);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  const uniforms = useMemo(() => ({
    uColor: { value: new THREE.Color(smokeColor) },
  }), [smokeColor]);

  useFrame((state) => {
    if (!meshRef.current) return;

    const targetX = (mouse.x * viewport.width) / 2;
    const targetY = (mouse.y * viewport.height) / 2;

    particles.forEach((p, i) => {
      p.life += 0.01;

      if (p.life > p.maxLife) {
        p.life = 0;
        p.x = targetX;
        p.y = targetY;
        p.vx = (Math.random() - 0.5) * 0.02;
        p.vy = (Math.random() - 0.5) * 0.02;
      }

      p.x += p.vx;
      p.y += p.vy;
      
      dummy.position.set(p.x, p.y, 0);
      const s = p.size * (1 + p.life * 2);
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);

      const lifeRatio = p.life / p.maxLife;
      opacityBuffer[i] = (1 - lifeRatio) * smokeOpacity;
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (opacityAttribute.current) {
      opacityAttribute.current.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[null as any, null as any, particleCount]}>
      <planeGeometry args={[1, 1]}>
        <instancedBufferAttribute
          ref={opacityAttribute}
          attach="attributes-aOpacity"
          args={[opacityBuffer, 1]}
        />
      </planeGeometry>
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </instancedMesh>
  );
};

const SmokeCursor = (props: SmokeCursorProps) => {
  return (
    <div
      className="smokeCursor"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 10,
        background: 'transparent',
        overflow: 'hidden',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
      >
        <SmokeParticles {...props} />
      </Canvas>
    </div>
  );
};

export default SmokeCursor;
