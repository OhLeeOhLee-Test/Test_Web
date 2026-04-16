import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'; // 👈 라우터 부품들 가져오기
import LoadingScreen from './LoadingScreen';
import './App.css';

// ⚙️ 1. 메인 공장 로직 (여기에 레일을 깔아줍니다)
export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

// ⚙️ 2. 실제 화면 조립 라인
function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ⭐️ currentView 스위치 대신, "이 주소로 이동해라!"라고 명령하는 내비게이션 기계를 씁니다.
  const navigate = useNavigate();

  useEffect(() => {
    const fadeTimer = setTimeout(() => setIsFadingOut(true), 2500);
    const removeTimer = setTimeout(() => setIsLoading(false), 3000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  // 화면 이동과 동시에 햄버거 메뉴를 닫아주는 함수
  const goTo = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <div className="app-wrapper">
      {isLoading && <LoadingScreen isFadingOut={isFadingOut} />}

      {/* ⭐️ 공통 헤더: 화면이 바뀌어도 지붕은 항상 그 자리에 있습니다. */}
      <header className="top-header-bg">
        <div className="header-content">
          <h1 onClick={() => goTo('/')} style={{ cursor: 'pointer' }}>
            OhLeeOhLee
          </h1>

          <div
            className="hamburger-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              viewBox="0 0 24 24"
              width="32"
              height="32"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            >
              {isMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </div>

          <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`}>
            <span onClick={() => goTo('/')}>PROJECTS</span>
            <span onClick={() => setIsMenuOpen(false)}>CONTACT</span>
            <span
              onClick={() => setIsMenuOpen(false)}
              style={{ fontSize: '14px', marginTop: '40px', color: '#555' }}
            >
              CLOSE
            </span>
          </nav>
        </div>
      </header>

      {/* ⭐️ 본문 영역: 주소에 따라 내용물이 갈아 끼워지는 '무대'입니다. */}
      <div className="portfolio-container">
        <Routes>
          {/* 주소가 '/' (메인) 일 때 보여줄 화면 */}
          <Route
            path="/"
            element={
              <main className="gallery-view">
                <h2>Engineering Portfolio</h2>
                <div className="grid-container">
                  <div
                    className="project-card"
                    onClick={() => goTo('/punggyeong')}
                  >
                    <div className="card-image">☁️ 3D Render View</div>
                    <div className="card-text">
                      <h3>풍경풍경 (Cloud Bell)</h3>
                      <p>날씨 반응형 스마트 풍경</p>
                    </div>
                  </div>
                  <div className="project-card disabled">
                    <div className="card-image">⏳</div>
                    <div className="card-text">
                      <h3>Project 02</h3>
                      <p>준비 중</p>
                    </div>
                  </div>
                </div>
              </main>
            }
          />

          {/* 주소가 '/punggyeong' 일 때 보여줄 화면 */}
          <Route
            path="/punggyeong"
            element={
              <main className="detail-view">
                <button className="back-btn" onClick={() => goTo('/')}>
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
                        <strong>Actuator:</strong> 서보모터 1개를 활용한 제어
                        최적화 및 배선 최소화
                      </li>
                      <li>
                        <strong>Design Challenge:</strong> 2.5mm 캐노피 두께를
                        고려한 모듈 1.0 이하 정밀 랙 앤 피니언 적용
                      </li>
                    </ul>
                  </div>
                </div>
              </main>
            }
          />
        </Routes>
      </div>
    </div>
  );
}
