import React, { useState, useEffect } from 'react'; // 👈 useEffect 추가
import LoadingScreen from './LoadingScreen'; // 👈 1. 방금 만든 부품 가져오기
import './App.css';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  // ⭐️ 1. 페이드 아웃 신호를 통제할 스위치를 만듭니다.
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [currentView, setCurrentView] = useState('home');

  useEffect(() => {
    // ⭐️ 2. 2.5초 뒤에 "이제 투명해져라!" 하고 신호를 보냅니다.
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 2500);

    // ⭐️ 3. 투명해질 시간(0.5초)을 벌어준 뒤, 3초가 되면 화면을 아예 치워버립니다.
    const removeTimer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  return (
    <div className="portfolio-container">
      {/* ⭐️ 4. 로딩 화면에 isFadingOut 제어 신호선을 딱 연결해 줍니다! */}
      {isLoading && <LoadingScreen isFadingOut={isFadingOut} />}

      {/* 상단 공통 헤더 모듈 */}
      <header className="top-header">
        <div className="header-content">
          <h1
            onClick={() => setCurrentView('home')}
            style={{ cursor: 'pointer' }}
          >
            OhLeeOhLee
          </h1>
          <nav>
            <span onClick={() => setCurrentView('home')}>Projects</span>
            <span>Contact</span>
          </nav>
        </div>
      </header>

      {/* 메인 화면 */}
      {currentView === 'home' && (
        <main className="gallery-view">
          <h2>Engineering Portfolio</h2>
          <div className="grid-container">
            {/* 풍경풍경 카드 */}
            <div
              className="project-card"
              onClick={() => setCurrentView('punggyeong')}
            >
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

      {/* 풍경풍경 상세 화면 */}
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
                <li>
                  <strong>Mechanism:</strong> 1-DOF 3층 적층 구조 설계
                </li>
                <li>
                  <strong>Actuator:</strong> 서보모터 1개를 활용한 제어 최적화
                  및 배선 최소화
                </li>
                <li>
                  <strong>Design Challenge:</strong> 2.5mm 캐노피 두께를 고려한
                  모듈 1.0 이하 정밀 랙 앤 피니언 적용
                </li>
              </ul>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
