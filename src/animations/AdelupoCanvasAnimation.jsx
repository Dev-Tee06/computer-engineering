import { useEffect, useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';
import './CanvasAnimation.css';

/**
 * Oluwabusayomi Taiwo Adelupo — CPE/2021/1006
 * Canvas animation: dark background, bouncing ball, moving car, moon.
 */
export default function AdelupoCanvasAnimation() {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    ballX: 2, ballY: 7, ballVY: 0,
    carX: -2, wheelAngle: 0,
    moonX: 0, moonY: 7, moonDX: 0.03,
    paused: false, lastTime: null, rafId: null,
  });
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const g = canvas.getContext('2d');
    const W = 16, H = 9;
    const FLOOR = 2.5, GRAVITY = -20, BALL_R = 0.4, WHEEL_R = 0.35, CAR_SPD = 4;

    function applyLimits() {
      g.setTransform(canvas.width / W, 0, 0, -canvas.height / H, 0, canvas.height);
    }

    function fillCircle(x, y, r, color) {
      g.fillStyle = color; g.beginPath(); g.arc(x, y, r, 0, 2 * Math.PI); g.fill();
    }

    function drawScene() {
      const s = stateRef.current;
      // sky
      g.fillStyle = '#111827'; g.fillRect(0, 0, W, H);
      // stars
      g.fillStyle = 'rgba(255,255,255,0.7)';
      const starPos = [[1,8],[3,7.5],[5,8.2],[7,7.8],[9,8.1],[11,7.6],[13,8],[15,7.9],[2,6.5],[4,7],[6,6.8],[8,7.2],[10,6.9],[12,7.3],[14,6.6]];
      for (const [x,y] of starPos) { g.beginPath(); g.arc(x,y,0.05,0,Math.PI*2); g.fill(); }
      // moon
      fillCircle(s.moonX, s.moonY, 0.6, '#f0ebc8');
      fillCircle(s.moonX - 0.2, s.moonY + 0.15, 0.12, '#d6d0a8');
      fillCircle(s.moonX + 0.2, s.moonY - 0.1, 0.09, '#d6d0a8');
      // ground
      g.fillStyle = '#1a3a2a'; g.fillRect(0, 1.2, W, FLOOR - 1.2);
      g.fillStyle = '#2d2d35'; g.fillRect(0, 0, W, 1.2);
      g.fillStyle = '#ddd';
      for (let x = 0; x < W; x += 1.8) g.fillRect(x, 0.55, 0.9, 0.08);
      // ball shadow
      const ht = s.ballY - BALL_R - FLOOR;
      const sc = Math.max(0.3, 1 - ht / 8);
      g.save(); g.translate(s.ballX, FLOOR - 0.1); g.scale(sc, 0.3);
      g.fillStyle = 'rgba(0,0,0,0.5)'; g.beginPath(); g.arc(0,0,BALL_R,0,Math.PI*2); g.fill();
      g.restore();
      // ball
      g.save(); g.translate(s.ballX, s.ballY);
      fillCircle(0, 0, BALL_R, '#3b82f6');
      fillCircle(-0.1, 0.1, 0.1, 'rgba(255,255,255,0.4)');
      g.restore();
      // car
      g.save(); g.translate(s.carX, 0.6);
      g.fillStyle = '#dc2626'; g.fillRect(-1.2, 0, 2.4, 0.5);
      g.fillStyle = '#ef4444';
      g.beginPath(); g.moveTo(-0.7,0.5); g.lineTo(-0.5,0.9); g.lineTo(0.5,0.9); g.lineTo(0.7,0.5); g.closePath(); g.fill();
      g.fillStyle = '#93c5fd'; g.fillRect(-0.45, 0.52, 0.38, 0.3); g.fillRect(0.08, 0.52, 0.38, 0.3);
      fillCircle(1.1, 0.25, 0.08, '#fef08a');
      g.save(); g.translate(-0.75, 0); 
      g.save(); g.rotate(-s.wheelAngle); fillCircle(0,0,WHEEL_R,'#111'); fillCircle(0,0,WHEEL_R*0.5,'#aaa'); g.restore();
      g.restore();
      g.save(); g.translate(0.75, 0);
      g.save(); g.rotate(-s.wheelAngle); fillCircle(0,0,WHEEL_R,'#111'); fillCircle(0,0,WHEEL_R*0.5,'#aaa'); g.restore();
      g.restore();
      g.restore();
    }

    function update(dt) {
      const s = stateRef.current;
      s.ballVY += GRAVITY * dt;
      s.ballY += s.ballVY * dt;
      if (s.ballY - BALL_R <= FLOOR) {
        s.ballY = FLOOR + BALL_R; s.ballVY = -s.ballVY * 0.8;
        if (s.ballVY < 2) s.ballVY = 11;
      }
      s.carX += CAR_SPD * dt; s.wheelAngle += CAR_SPD * dt / WHEEL_R;
      if (s.carX > 17) s.carX = -2;
      s.moonX += s.moonDX;
      if (s.moonX > 15 || s.moonX < 1) s.moonDX *= -1;
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
