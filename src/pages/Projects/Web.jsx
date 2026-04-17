import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Web.css';

export default function Web() {
  const navigate = useNavigate();

  return (
    <main className="detail-view">
      <button className="back-btn" onClick={() => navigate('/projects')}>
        ← 뒤로 가기
      </button>

      <h2>웹</h2>

      <div className="specs-container">
        
        {/* 설명 글씨는 뷰어 아래로 */}
        <div className="engineering-log">
          여기지롱 이거 만든 거임
        </div>
      </div>
    </main>
  );
}
