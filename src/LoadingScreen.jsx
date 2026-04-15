import React, { useEffect, useRef } from 'react';

export default function LoadingScreen() {
  // 1. 리액트용 집게(ref) 준비
  const personRef = useRef(null);
  const hatRef = useRef(null);
  const gearRef = useRef(null);
  const boltRef = useRef(null);
  const smileRef = useRef(null);
  const noteRef = useRef(null);

  // 2. 애니메이션 구동 로직 (화면이 켜질 때 한 번 실행)
  useEffect(() => {
    const HAT_START_Y = 0;
    const HAT_PEAK_Y = 0;
    const HAT_FINAL_Y = 92;

    function setHatY(y) {
      if (hatRef.current) hatRef.current.style.top = y + 'px';
    }

    function animate(fromY, toY, duration, easeFn, onDone) {
      const start = performance.now();
      function step(now) {
        let t = Math.min((now - start) / duration, 1);
        setHatY(fromY + (toY - fromY) * easeFn(t));
        if (t < 1) requestAnimationFrame(step);
        else if (onDone) onDone();
      }
      requestAnimationFrame(step);
    }

    function fallEase(t) {
      return t * t * t;
    }

    const flashDur = 300;
    let delay = 0;
    const icons = [gearRef, boltRef, smileRef, noteRef];

    // 아이콘 4개 순차적 깜빡임
    icons.forEach((iconRef) => {
      setTimeout(() => {
        if (iconRef.current) iconRef.current.style.opacity = '1';
      }, delay);
      setTimeout(() => {
        if (iconRef.current) iconRef.current.style.opacity = '0';
      }, delay + flashDur);
      delay += flashDur;
    });

    // 모자 던지기 및 사람 등장
    setTimeout(() => {
      if (hatRef.current) hatRef.current.style.opacity = '1';
      setHatY(HAT_START_Y);

      animate(
        HAT_START_Y,
        HAT_PEAK_Y,
        1,
        (t) => t,
        () => {
          setTimeout(() => {
            if (personRef.current) personRef.current.style.opacity = '1';
            animate(HAT_PEAK_Y, HAT_FINAL_Y, 480, fallEase, () => {
              setHatY(HAT_FINAL_Y);
            });
          }, 60);
        }
      );
    }, delay);
  }, []);

  // 3. 화면(UI) 렌더링
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#0d0d0d',
      }}
    >
      <div style={{ position: 'relative', width: '160px', height: '240px' }}>
        {/* 아이콘들 */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '60px',
            transform: 'translateX(-50%)',
          }}
        >
          <svg
            ref={gearRef}
            style={{ opacity: 0, position: 'absolute', left: 0, top: 0 }}
            width="80"
            height="80"
            viewBox="0 0 80 80"
          >
            <g transform="translate(40,40)">
              <circle r="12" fill="#888" stroke="#aaa" strokeWidth="1.5" />
              <circle r="5" fill="#0d0d0d" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                <rect
                  key={deg}
                  x="-5"
                  y="-22"
                  width="10"
                  height="12"
                  rx="2"
                  fill="#888"
                  stroke="#aaa"
                  strokeWidth="1"
                  transform={`rotate(${deg})`}
                />
              ))}
            </g>
          </svg>
          <svg
            ref={boltRef}
            style={{ opacity: 0, position: 'absolute', left: 0, top: 0 }}
            width="80"
            height="80"
            viewBox="0 0 80 80"
          >
            <polygon
              points="44,4 24,44 38,44 36,76 56,36 42,36"
              fill="#FFD700"
              stroke="#FFA500"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
          <svg
            ref={smileRef}
            style={{ opacity: 0, position: 'absolute', left: 0, top: 0 }}
            width="80"
            height="80"
            viewBox="0 0 80 80"
          >
            <circle
              cx="40"
              cy="40"
              r="34"
              fill="#FFD700"
              stroke="#FFA500"
              strokeWidth="1.5"
            />
            <circle cx="28" cy="32" r="4" fill="#333" />
            <circle cx="52" cy="32" r="4" fill="#333" />
            <path
              d="M22 48 Q40 66 58 48"
              stroke="#333"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
          <svg
            ref={noteRef}
            style={{ opacity: 0, position: 'absolute', left: 0, top: 0 }}
            width="80"
            height="80"
            viewBox="0 0 80 80"
          >
            <rect x="28" y="8" width="14" height="46" rx="3" fill="#aef" />
            <rect x="40" y="8" width="14" height="46" rx="3" fill="#8cf" />
            <rect x="24" y="48" width="16" height="16" rx="8" fill="#aef" />
            <rect x="40" y="48" width="14" height="14" rx="7" fill="#8cf" />
            <rect x="28" y="8" width="26" height="10" rx="3" fill="#cdf" />
          </svg>
        </div>

        {/* 사람 */}
        <div
          ref={personRef}
          style={{
            position: 'absolute',
            left: '50%',
            top: '120px',
            transform: 'translateX(-50%)',
            opacity: 0,
          }}
        >
          <svg width="80" height="120" viewBox="0 0 80 120">
            <circle
              cx="40"
              cy="22"
              r="18"
              fill="#e8d5b0"
              stroke="#c4a97a"
              strokeWidth="1.5"
            />
            <ellipse
              cx="40"
              cy="90"
              rx="26"
              ry="32"
              fill="#4a6fa5"
              stroke="#3a5a8a"
              strokeWidth="1.5"
            />
            <line
              x1="14"
              y1="75"
              x2="2"
              y2="108"
              stroke="#4a6fa5"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <line
              x1="66"
              y1="75"
              x2="78"
              y2="108"
              stroke="#4a6fa5"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <circle cx="33" cy="19" r="3" fill="#3a2a1a" />
            <circle cx="47" cy="19" r="3" fill="#3a2a1a" />
            <path
              d="M33 30 Q40 36 47 30"
              stroke="#c47a5a"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* 모자 */}
        <div
          ref={hatRef}
          style={{
            position: 'absolute',
            left: '50%',
            top: '0px',
            transform: 'translateX(-50%)',
            opacity: 0,
          }}
        >
          <svg width="80" height="60" viewBox="0 0 80 60">
            <ellipse
              cx="40"
              cy="52"
              rx="36"
              ry="8"
              fill="#2a1f0e"
              stroke="#4a3820"
              strokeWidth="1.5"
            />
            <path
              d="M16 52 Q18 28 40 20 Q62 28 64 52Z"
              fill="#1a2f4a"
              stroke="#2a4a6a"
              strokeWidth="1.5"
            />
            <rect
              x="14"
              y="46"
              width="52"
              height="8"
              rx="2"
              fill="#8B7355"
              stroke="#6a5a3a"
              strokeWidth="1"
            />
            <path
              d="M28 36 Q32 30 40 28 Q48 30 52 36"
              stroke="#c4a020"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="40" cy="22" r="4" fill="#c4a020" />
            <path d="M22 50 L20 42 L24 40 L26 48Z" fill="#1a2f4a" />
            <path d="M58 50 L60 42 L56 40 L54 48Z" fill="#1a2f4a" />
          </svg>
        </div>
      </div>
    </div>
  );
}
