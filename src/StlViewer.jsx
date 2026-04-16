import React, { Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Html, Center, ContactShadows } from '@react-three/drei';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';

function DuckModel() {
  const fileUrl = import.meta.env.BASE_URL + 'RubberDuck.stl';
  const geometry = useLoader(STLLoader, fileUrl);

  return (
    // ⭐️ 핵심: scale 속성을 추가합니다. 
    // scale={1}이 원본 크기이고, 0.5는 절반, 0.1은 10% 크기입니다.
    // [x, y, z] 비율을 다르게 줄 수도 있지만, 보통 단일 숫자로 균일하게 줄입니다.
    <mesh geometry={geometry} scale={1} castShadow receiveShadow>
      <meshStandardMaterial 
        color="#ffcc00" 
        roughness={0.05} 
        metalness={0.4} 
        envMapIntensity={1}
      />
    </mesh>
  );
}

// ⭐️ 보정된 3D 뷰어: autoRotate와 controls 옵션을 부모로부터 받습니다.
export default function StlViewer({ autoRotate = false, controls = true }) {
  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: '#0a0a0a' }}>
      <Canvas shadows camera={{ position: [3, 3, 5], fov: 45 }}>
        <ambientLight intensity={0.4} />
        
        {/* ⭐️ 그림자용 주 조명: 위치를 사선으로 배치해 그림자가 바닥에 길게 남게 합니다. */}
        <directionalLight 
          position={[5, 8, 5]} 
          intensity={1.2} 
          castShadow 
          shadow-mapSize={[1024, 1024]}
        />
        
        {/* ⭐️ 입체감을 위한 보조 조명 (반대편) */}
        <pointLight position={[-5, 5, -5]} intensity={0.8} />

        <Suspense fallback={<Html center></Html>}>
          <Center top>
            <DuckModel />
          </Center>

          {/* ⭐️ 강력한 그림자 치트키: ContactShadows를 사용하면 훨씬 자연스러운 그림자가 생깁니다. */}
          <ContactShadows 
            position={[0, -0.6, 0]} 
            opacity={0.6} 
            scale={10} 
            blur={2} 
            far={1} 
          />

          <OrbitControls 
            autoRotate={autoRotate} 
            autoRotateSpeed={3}
            enableRotate={controls}  // 👈 조절 가능 여부
            enableZoom={controls}    // 👈 줌 가능 여부
            enablePan={controls}     // 👈 이동 가능 여부
            makeDefault 
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
