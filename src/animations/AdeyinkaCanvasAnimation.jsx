import { useEffect, useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';
import './CanvasAnimation.css';

/**
 * Olanrewaju Treasure Adeyinka — CPE/2021/1052
 * Complete canvas animation: dark sky, 70 stars, orbiting moon with craters,
 * bouncing ball (gravity, energy loss), red car with rotating wheels.
 * World: 16×9 (y up). Canvas: 800×450.
 */
export default function AdeyinkaCanvasAnimation() {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    ballX: 9, ballY: 9, ballVY: 0,
    carX: -0.5, wheelAngle: 0,
    moonAngle: Math.PI, moonPhase: 0,
    paused: false, lastTime: null, rafId: null,
  });
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const g = canvas.getContext('2d');

    const SKY = '#0a0a08';
    const FLOOR = 3;
    const GRAVITY = -25;
    const BALL_R = 0.45;
    const WHEEL_R = 0.4;
    const CAR_SPEED = 7;

    const stars = [];
    for (let i = 0; i < 70; i++) {
      stars.push([
        Math.random() * 16,
        3.2 + Math.random() * 5.6,
        Math.random() < 0.33 ? 0.05 : 0.03,
      ]);
    }

    function applyLimits() {
      g.setTransform(canvas.width / 16, 0, 0, -canvas.height / 9, 0, canvas.height);
    }

    function fillCircle(x, y, r, color) {
      g.fillStyle = color;
      g.beginPath(); g.arc(x, y, r, 0, 2 * Math.PI); g.fill();
    }

    function drawBackground() {
      g.fillStyle = SKY; g.fillRect(0, 0, 16, 9);
      g.fillStyle = 'white';
      for (const [x, y, size] of stars) g.fillRect(x, y, size, size);
    }

    function drawMoon() {
      const s = stateRef.current;
      g.save();
      g.translate(8, 2); g.rotate(s.moonAngle);
      g.translate(6.5, 0); g.rotate(-s.moonAngle);
      fillCircle(0, 0, 0.8, '#f0ebc8');
      fillCircle(-0.3, 0.25, 0.17, '#d6d0a8');
      fillCircle(0.25, -0.15, 0.13, '#d6d0a8');
      fillCircle(-0.1, -0.45, 0.09, '#d6d0a8');
      fillCircle(1.1 + 0.6 * Math.sin(s.moonPhase), 0, 0.8, SKY);
      g.restore();
    }

    function drawGround() {
      g.fillStyle = '#226e34'; g.fillRect(0, 1.5, 16, FLOOR - 1.5);
      g.fillStyle = '#373740'; g.fillRect(0, 0, 16, 1.5);
      g.fillStyle = '#eeeeee';
      for (let x = 0; x < 16; x += 2) g.fillRect(x, 0.7, 1, 0.1);
    }

    function drawBall() {
      const s = stateRef.current;
      const height = s.ballY - BALL_R - FLOOR;
      const sc = Math.max(0.3, 1 - height / 10);
      g.save(); g.translate(s.ballX, FLOOR - 0.12); g.scale(sc, 1);
      g.fillStyle = '#14461f';
      g.beginPath(); g.ellipse(0, 0, 0.5, 0.1, 0, 0, 2 * Math.PI); g.fill();
      g.restore();
      g.save(); g.translate(s.ballX, s.ballY);
      fillCircle(0, 0, BALL_R, '#ffaa00');
      fillCircle(-0.15, 0.15, 0.12, '#ffdc78');
      g.restore();
    }

    function drawWheel(angle) {
      g.save(); g.rotate(-angle);
      fillCircle(0, 0, WHEEL_R, '#141414');
      fillCircle(0, 0, WHEEL_R * 0.6, '#bbbbbb');
      g.strokeStyle = '#141414'; g.lineWidth = 0.04;
      for (let i = 0; i < 4; i++) {
        g.beginPath(); g.moveTo(0, 0); g.lineTo(WHEEL_R * 0.6, 0); g.stroke();
        g.rotate(Math.PI / 2);
      }
      g.restore();
    }

    function drawCar() {
      const s = stateRef.current;
      g.save(); g.translate(s.carX, 0.75);
      g.fillStyle = '#b82828'; g.fillRect(-1.5, -0.05, 3, 0.65);
      g.beginPath();
      g.moveTo(-0.8, 0.6); g.lineTo(-0.5, 1.2); g.lineTo(0.6, 1.2); g.lineTo(1.0, 0.6);
      g.closePath(); g.fill();
      g.fillStyle = '#aad2eb';
      g.beginPath();
      g.moveTo(-0.65, 0.65); g.lineTo(-0.45, 1.1); g.lineTo(-0.05, 1.1); g.lineTo(-0.05, 0.65); g.closePath(); g.fill();
      g.beginPath();
      g.moveTo(0.05, 0.65); g.lineTo(0.05, 1.1); g.lineTo(0.5, 1.1); g.lineTo(0.8, 0.65); g.closePath(); g.fill();
      fillCircle(1.4, 0.35, 0.1, '#ffe066');
      g.save(); g.translate(-0.95, 0); drawWheel(s.wheelAngle); g.restore();
      g.save(); g.translate(0.95, 0);  drawWheel(s.wheelAngle); g.restore();
      g.restore();
    }

    function update(dt) {
      const s = stateRef.current;
      s.ballVY += GRAVITY * dt;
      s.ballY += s.ballVY * dt;
      if (s.ballY - BALL_R <= FLOOR) {
        s.ballY = FLOOR + BALL_R;
        s.ballVY = -s.ballVY * 0.82;
        if (s.ballVY < 2.5) s.ballVY = 13;
      }
      s.carX += CAR_SPEED * dt;
      s.wheelAngle += CAR_SPEED * dt / WHEEL_R;
      if (s.carX > 17.5) s.carX = -2.5;
      s.moonAngle -= 0.2 * dt;
      if (s.moonAngle < 0) s.moonAngle = Math.PI;
      s.moonPhase += 0.4 * dt;
    }

    function draw() { applyLimits(); drawBackground(); drawMoon(); drawGround(); drawBall(); drawCar(); }

    function frame(time) {
      const s = stateRef.current;
      if (s.lastTime === null) s.lastTime = time;
      const dt = Math.min((time - s.lastTime) / 1000, 0.05);
      s.lastTime = time;
      if (!s.paused) update(dt);
      draw();
      s.rafId = requestAnimationFrame(frame);
    }

    stateRef.current.rafId = requestAnimationFrame(frame);

    function handleKey(e) {
      if (e.code === 'Space') {
        e.preventDefault();
        stateRef.current.paused = !stateRef.current.paused;
        setPaused(stateRef.current.paused);
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => { cancelAnimationFrame(stateRef.current.rafId); window.removeEventListener('keydown', handleKey); };
  }, []);

  function toggle() {
    stateRef.current.paused = !stateRef.current.paused;
    setPaused(stateRef.current.paused);
  }

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
