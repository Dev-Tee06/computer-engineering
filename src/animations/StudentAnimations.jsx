import { useEffect, useRef } from 'react';
import './StudentAnimations.css';

function BouncingBallCanvas({ title, ballColor = '#2563eb' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    let x = 50;
    let y = 50;
    let vx = 3;
    let vy = 0;
    let lastTime = null;
    let rafId;
    const radius = 25;
    const gravity = 0.5;
    const floor = 350;

    function frame(time) {
      const frames = lastTime === null ? 0 : Math.min((time - lastTime) / 1000, 0.05) * 60;
      lastTime = time;
      vy += gravity * frames;
      x += vx * frames;
      y += vy * frames;

      if (y + radius >= floor) {
        y = floor - radius;
        vy = -Math.abs(vy) * 0.8;
      }
      if (x + radius >= canvas.width || x - radius <= 0) {
        vx *= -1;
        x = Math.max(radius, Math.min(canvas.width - radius, x));
      }

      context.fillStyle = '#87ceeb';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = '#475569';
      context.fillRect(0, floor, canvas.width, canvas.height - floor);
      context.fillStyle = ballColor;
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fill();
      context.fillStyle = 'rgba(255,255,255,0.35)';
      context.beginPath();
      context.arc(x - 8, y - 9, 7, 0, Math.PI * 2);
      context.fill();

      rafId = requestAnimationFrame(frame);
    }

    rafId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafId);
  }, [ballColor]);

  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={400}
      className="student-ball-canvas"
      aria-label={title}
      role="img"
    />
  );
}

export function AjagunBouncingBall() {
  return <BouncingBallCanvas title="Ajagun Fiyinfunoluwa James's bouncing ball" />;
}

export function ArinmoBouncingBall() {
  return (
    <div className="arinmo-ball-scene" role="img" aria-label="Arinmo Oluwabusola Victoria's bouncing ball">
      <div className="arinmo-ball-scene__title">Bouncing Ball</div>
      <div className="arinmo-ball-scene__ball" />
      <div className="arinmo-ball-scene__ground" />
    </div>
  );
}

function NightScene({ studentName }) {
  const stars = Array.from({ length: 28 }, (_, index) => ({
    left: `${(index * 37 + 9) % 100}%`,
    top: `${(index * 23 + 8) % 64}%`,
    delay: `${(index % 7) * -0.3}s`,
  }));

  return (
    <div className="student-night-scene" role="img" aria-label={`${studentName}'s animated moon, car and bouncing ball scene`}>
      <div className="student-night-scene__sky">
        <div className="student-night-scene__title">Moon, Car &amp; Bouncing Ball</div>
        <div className="student-night-scene__stars" aria-hidden="true">
          {stars.map((star, index) => (
            <span
              key={index}
              className="student-night-scene__star"
              style={{ left: star.left, top: star.top, animationDelay: star.delay }}
            />
          ))}
        </div>
        <div className="student-night-scene__moon" aria-hidden="true">
          <span />
          <span />
        </div>
      </div>
      <div className="student-night-scene__car" aria-hidden="true">
        <div className="student-night-scene__car-top" />
        <div className="student-night-scene__wheel student-night-scene__wheel--left" />
        <div className="student-night-scene__wheel student-night-scene__wheel--right" />
      </div>
      <div className="student-night-scene__ball" aria-hidden="true" />
      <div className="student-night-scene__ground">
        <div className="student-night-scene__road-line" />
      </div>
    </div>
  );
}

export function FatomilolaNightScene() {
  return <NightScene studentName="Fatomilola Evans Oluwapelumi" />;
}

export function IkotunNightScene() {
  return <NightScene studentName="Ikotun Toluwalase Elizabeth" />;
}
