import React, { useState } from 'react';
import './App.css';

export default function App() {
  // 'home' 화면과 'punggyeong' 상세 화면을 전환하는 상태 스위치입니다.
  const [currentView, setCurrentView] = useState('home');

  return (
    <div className="portfolio-container">
      {/* 상단 공통 헤더 모듈 */}
      <header className="top-header">
        <h1 onClick={() => setCurrentView('home')} style={{cursor: 'pointer'}}>
          OhLeeOhLee
        </h1>
        <nav>
          <span onClick={() => setCurrentView('home')}>Projects</span>
          <span>Contact</span>
        </nav>
      </header>

      {/* 메인 화면 (조건부 렌더링) */}
      {currentView === 'home' && (
        <main className="gallery-view">
          <h2>Engineering Portfolio</h2>
          <div className="grid-container">
            {/* 풍경풍경 카드 */}
            <div className="project-card" onClick={() => setCurrentView('punggyeong')}>
              <div className="card-image">☁️ 3D Render View</div>
              <div className="card-text">
                <h3>풍경풍경 (Cloud Bell)</h3>
                <p>날씨 반응형 스마트 풍경</p>
              </div>
            </div>
            
            {/* 준비 중인 프로젝트 카드 */}
            <div className="project-card disabled">
              <div className="card-image">⏳</div>
              <div className="card-text">
                <h3>Project 02</h3>
                <p>준비 중</p>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* 풍경풍경 상세 화면 (조건부 렌더링) */}
      {currentView === 'punggyeong' && (
        <main className="detail-view">
          <button className="back-btn" onClick={() => setCurrentView('home')}>
            ← 뒤로 가기
          </button>
          <h2>풍경풍경 (Cloud Bell)</h2>
          
          <div className="specs-container">
            <div className="cad-viewer-placeholder">
              [ CATIA 3D 모델링 이미지 / 구동 영상 자리 ]
            </div>
            <div className="engineering-log">
              <h3>⚙️ Engineering Specs</h3>
              <ul>
                <li><strong>Mechanism:</strong> 1-DOF 3층 적층 구조 설계</li>
                <li><strong>Actuator:</strong> 서보모터 1개를 활용한 제어 최적화 및 배선 최소화</li>
                <li><strong>Design Challenge:</strong> 2.5mm 캐노피 두께를 고려한 모듈 1.0 이하 정밀 랙 앤 피니언 적용</li>
              </ul>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}