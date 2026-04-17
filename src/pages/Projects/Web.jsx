import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import './Web.css';

// 🖥️ 1. 3D 컴퓨터 모형 부품 설계
function ComputerModel() {
  return (
    // 전체 모형을 살짝 비틀어서 얼짱 각도(-25도)로 보여줍니다.
    <group rotation={[0, -Math.PI / 7, 0]}>
      {/* 📺 모니터 본체 */}
      <mesh position={[0, 0.5, 0]}>
        {/* 가로 3.2, 세로 2.2, 두께 0.1짜리 납작한 상자 */}
        <boxGeometry args={[3.2, 2.2, 0.1]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.8} />

        {/* ⭐️ 마법의 부품: 실제 웹사이트를 띄우는 HTML 레이어 */}
        {/* 모니터 표면보다 아주 살짝 앞(0.06)에 배치해서 파묻히지 않게 합니다. */}
        <Html
          position={[0, 0, 0.06]}
          transform
          distanceFactor={1.3} // 화면 크기 배율 조절
          occlude // 모니터 뒤로 돌리면 안 보이게 설정
        >
          <iframe
            title="Embedded Portfolio"
            src="/"
            style={{
              width: '1024px', // 가상 브라우저의 가로 해상도
              height: '680px', // 가상 브라우저의 세로 해상도
              border: 'none',
              borderRadius: '8px', // 화면 모서리를 살짝 둥글게
              background: '#fff',
            }}
          />
        </Html>
      </mesh>

      {/* 🗼 모니터 기둥 */}
      <mesh position={[0, -0.8, -0.05]}>
        <cylinderGeometry args={[0.1, 0.1, 0.6]} />
        <meshStandardMaterial color="#444" />
      </mesh>

      {/* 🥏 모니터 받침대 */}
      <mesh position={[0, -1.1, -0.05]}>
        <cylinderGeometry args={[0.6, 0.6, 0.05]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
    </group>
  );
}

// 🌐 2. 메인 화면 조립
export default function Web() {
  const navigate = useNavigate();

  return (
    <main className="detail-view">
      {/* 상단 네비게이션 */}
      <button className="back-btn" onClick={() => navigate('/projects')}>
        ← 프로젝트 목록으로
      </button>

      <h2>Engineering Portfolio Web</h2>

      {/* ⭐️ 3D 장면이 들어갈 상자 (헤더 밑으로 깔리게 설계됨) */}
      <div className="web-3d-scene">
        <Canvas camera={{ position: [0, 0, 4.5], fov: 60 }}>
          {/* 조명 세팅 */}
          <ambientLight intensity={0.7} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} />

          {/* 아까 만든 컴퓨터 조립 */}
          <ComputerModel />

          {/* 마우스 조작 부품 (확대/축소, 회전 가능) */}
          <OrbitControls enablePan={false} minDistance={2} maxDistance={8} />
        </Canvas>
      </div>

      {/* 하단 설명글 */}
      <div className="specs-container">
        <div className="engineering-log">
          <h3>Project Architecture</h3>
          <p>
            React 기반의 싱글 페이지 애플리케이션(SPA)으로 구축된 포트폴리오
            웹사이트입니다. Three.js와 React Three Fiber를 활용하여 3D 시각화
            모듈을 통합하였으며, 지금 보고 계신 이 화면 또한 가상 공간 내에
            렌더링 된 재귀적(Recursive) 구조를 가지고 있습니다.
          </p>
        </div>
      </div>
    </main>
  );
}
