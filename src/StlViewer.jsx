import React, { Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';

function DuckModel() {
  // ⭐️ 핵심: Vite 환경에서 주소 오류가 나지 않도록, 절대 경로를 자동으로 계산해 줍니다.
  const fileUrl = import.meta.env.BASE_URL + 'RubberDuck.stl';

  // 3D 엔진이 STL 도면을 읽어옵니다.
  const geometry = useLoader(STLLoader, fileUrl);

  return (
    <mesh geometry={geometry}>
      {/* 오리니까 예쁜 노란색 매트리얼(재질)을 입혀줍니다! (질감, 반사율 조절 가능) */}
      <meshStandardMaterial color="#ffcc00" roughness={0.3} metalness={0.1} />
    </mesh>
  );
}

export default function StlViewer() {
  return (
    // 3D 뷰어를 감싸는 검은색 액자 설정
    <div
      style={{
        width: '100%',
        height: '400px',
        backgroundColor: '#111',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid #333',
      }}
    >
      <Canvas>
        <Suspense
          fallback={<span style={{ color: 'white' }}>오리 로딩 중... 🦆</span>}
        >
          {/* Stage: 스튜디오 조명과 그림자를 자동으로 예쁘게 세팅해 주는 마법의 부품 */}
          <Stage environment="city" intensity={0.6} adjustCamera>
            <DuckModel />
          </Stage>
          {/* OrbitControls: 마우스로 돌려볼 수 있고, 알아서 빙글빙글 돌게 만듭니다 */}
          <OrbitControls autoRotate autoRotateSpeed={2} enableZoom={true} />
        </Suspense>
      </Canvas>
    </div>
  );
}
