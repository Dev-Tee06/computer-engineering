import { useEffect, useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';
import './CanvasAnimation.css';

/**
 * Oladipo Jonathan Oluwapelumi — CPE/2022/1066
 * Partial source: canvas + HTML structure for moon, car, bouncing ball.
 * Sky-blue background, reconstructed from submitted markup.
 */
export default function OladipoCanvasAnimation() {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    ballX: 2, ballY: 7, ballVY: 0, ballDX: 0.04,
    carX: -2, wheelAngle: 0,
    moonAngle: 0,
    paused: false, lastTime: null, rafId: null,
  });
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const g = canvas.getContext('2d');
    const W = 16, H = 9;
    const FLOOR = 2.4, GRAVITY = -18, BALL_R = 0.4, WHEEL_R = 0.35;

    function applyLimits() {
      g.setTransform(canvas.width / W, 0, 0, -canvas.height / H, 0, canvas.height);
    }

    function fillCircle(x, y, r, color) {
      g.fillStyle = color; g.beginPath(); g.arc(x, y, r, 0, 2 * Math.PI); g.fill();
    }

    function drawScene() {
      const s = stateRef.current;
      // sky background (skyblue per submission)
      g.fillStyle = '#87ceeb'; g.fillRect(0, 0, W, H);
      // ground
      g.fillStyle = '#4ade80'; g.fillRect(0, 0, W, 2);
      g.fillStyle = '#1a1a2e'; g.fillRect(0, 0, W, 1.2);
      // road markings
      g.fillStyle = '#fff';
      for (let x = 0; x < W; x += 1.8) g.fillRect(x, 0.55, 0.9, 0.08);
      // moon (orbiting)
      g.save();
      g.translate(8, 6); g.rotate(s.moonAngle);
      g.translate(3, 0); g.rotate(-s.moonAngle);
      fillCircle(0, 0, 0.6, '#fffff0');
      fillCircle(-0.15, 0.15, 0.1, '#d4d0a0');
      g.restore();
      // ball shadow
      const ht = s.ballY - BALL_R - FLOOR;
      const sc = Math.max(0.3, 1 - ht / 7);
      g.save(); g.translate(s.ballX, FLOOR - 0.1); g.scale(sc, 0.3);
      g.fillStyle = 'rgba(0,0,0,0.4)'; g.beginPath(); g.arc(0,0,BALL_R,0,Math.PI*2); g.fill();
      g.restore();
      // ball
      fillCircle(s.ballX, s.ballY, BALL_R, '#f97316');
      fillCircle(s.ballX - 0.1, s.ballY + 0.1, 0.1, 'rgba(255,255,255,0.4)');
      // car
      g.save(); g.translate(s.carX, 0.6);
      g.fillStyle = '#2563eb'; g.fillRect(-1.2, 0, 2.4, 0.5);
      g.fillStyle = '#3b82f6';
      g.beginPath(); g.moveTo(-0.7,0.5); g.lineTo(-0.5,0.9); g.lineTo(0.5,0.9); g.lineTo(0.7,0.5); g.closePath(); g.fill();
      g.fillStyle = '#bfdbfe'; g.fillRect(-0.45, 0.52, 0.35, 0.28); g.fillRect(0.1, 0.52, 0.35, 0.28);
      // wheels
      function whl(wx) {
        g.save(); g.translate(wx, 0); g.rotate(-s.wheelAngle);
        fillCircle(0, 0, WHEEL_R, '#1a1a1a');
        fillCircle(0, 0, WHEEL_R * 0.55, '#9ca3af');
        g.restore();
      }
      whl(-0.75); whl(0.75);
      g.restore();
    }

    function update(dt) {
      const s = stateRef.current;
      s.ballVY += GRAVITY * dt; s.ballY += s.ballVY * dt;
      if (s.ballY - BALL_R <= FLOOR) {
        s.ballY = FLOOR + BALL_R; s.ballVY = -s.ballVY * 0.78;
        if (s.ballVY < 2) s.ballVY = 10;
      }
      s.ballX += s.ballDX;
      if (s.ballX > 15 || s.ballX < 1) s.ballDX *= -1;
      s.carX += 4 * dt;
      s.wheelAngle += 4 * dt / WHEEL_R;
      if (s.carX > 17) s.carX = -2;
      s.moonAngle += 0.4 * dt;
    }

    function frame(time) {
      const s = stateRef.current;
      if (s.lastTime === null) s.lastTime = time;
      const dt = Math.min((time - s.lastTime) / 1000, 0.05);
      s.lastTime = time;
      if (!s.paused) update(dt);
      applyLimits(); drawScene();
      s.rafId = requestAnimationFrame(frame);
    }
    stateRef.current.rafId = requestAnimationFrame(frame);
    function handleKey(e) {
      if (e.code === 'Space') { e.preventDefault(); stateRef.current.paused = !stateRef.current.paused; setPaused(stateRef.current.paused); }
    }
    window.addEventListener('keydown', handleKey);
    return () => { cancelAnimationFrame(stateRef.current.rafId); window.removeEventListener('keydown', handleKey); };
  }, []);

  function toggle() { stateRef.current.paused = !stateRef.current.paused; setPaused(stateRef.current.paused); }

  return (
    <div className="canvas-anim-wrap">
      <canvas ref={canvasRef} width={800} height={450} className="canvas-anim" />
      <div className="canvas-anim-controls">
        <button className="canvas-anim-btn" onClick={toggle}>
          {paused ? <><Play size={15}/> Resume</> : <><Pause size={15}/> Pause</>}
        </button>
        <span className="canvas-anim-hint">Space bar also works</span>
      </div>
    </div>
  );
}
