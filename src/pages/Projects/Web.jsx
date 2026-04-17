import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import './Web.css';

// 🖥️ PC 모형 컴포넌트
function ComputerModel() {
  return (
    <group rotation={[0, -Math.PI / 4, 0]}> {/* 얼짱 각도 설정 */}
      {/* 본체: 까만 상자 */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3, 2, 0.1]} />
        <meshStandardMaterial color="#222222" />
        
        {/* ⭐️ 마법의 부품: Html 컴포넌트 */}
        <Html
          position={[0, 0, 0.06]} // 본체 살짝 앞에 배치
          transform              // 3D 회전과 크기를 동기화!
          distanceFactor={1.2}    // 크기 조절
          occlude                // 본체 뒤로 가면 안 보이게 설정
        >
          {/* 실제 웹사이트를 띄우는 iframe */}
          <iframe
            title="Embedded Web"
            src="/Test_Web/"
            style={{
              width: '1024px',  // 실제 웹 가상 해상도
              height: '670px',
              border: 'none',
              borderRadius: '10px',
              overflow: 'hidden',
              background: 'white'
            }}
          />
        </Html>
      </mesh>
      
      {/* 받침대 */}
      <mesh position={[0, -1.2, 0]}>
        <cylinderGeometry args={[0.5, 0.7, 0.4]} />
        <meshStandardMaterial color="#444444" />
      </mesh>
    </group>
  );
}

// 🌐 메인 페이지 컴포넌트
export default function Web() {
  const navigate = useNavigate();

  return (
    <main className="detail-view">
      <button className="back-btn" onClick={() => navigate('/projects')}>
        ← 뒤로 가기
      </button>

      {/* 3D 캔버스 영역 */}
      <div className="web-3d-scene" style={{ width: '100%', height: '80vh' }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          
          <ComputerModel />
          
          <OrbitControls enablePan={true} enableZoom={true} />
        </Canvas>
      </div>

      <div className="engineering-log">
          <h3>⚙️ Engineering Specs</h3>
          <ul>
            <li>
              <strong>Mechanism:</strong> 1-DOF 3층 적층 구조 설계
            </li>
            <li>
              <strong>Actuator:</strong> 서보모터 1개를 활용한 제어 최적화 및
              배선 최소화
            </li>
            <li>
              <strong>Design Challenge:</strong> 2.5mm 캐노피 두께를 고려한 모듈
              1.0 이하 정밀 랙 앤 피니언 적용
            </li>
          </ul>
        </div>
    </main>
  );
}
