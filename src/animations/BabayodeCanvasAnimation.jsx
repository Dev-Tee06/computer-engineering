import { useEffect, useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';
import './CanvasAnimation.css';

/**
 * Babayode Testimony Oluwatomisin — CPE/2022/1036
 * Lagos Danfo bus, bouncing ball, orbiting moon.
 * Original: 800×450 canvas, world coords 16×9 (y up).
 * Spacebar or button to pause/resume.
 */
export default function BabayodeCanvasAnimation() {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    ballX: 4, ballY: 8, ballVY: 0,
    carX: -2.5, wheelAngle: 0,
    moonAngle: Math.PI, moonPhase: 0,
    paused: false,
    lastTime: null,
    rafId: null,
  });
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const g = canvas.getContext('2d');

    const SKY = '#87CEEB';
    const FLOOR = 3;
    const GRAVITY = -25;
    const BALL_R = 0.45;
    const WHEEL_R = 0.4;
    const CAR_SPEED = 3;

    const stars = [];
    for (let i = 0; i < 70; i++) {
      stars.push([(i * 7.13) % 16, 3.2 + (i * 3.71) % 5.6, i % 3 === 0 ? 0.05 : 0.03]);
    }

    function applyLimits() {
      g.setTransform(canvas.width / 16, 0, 0, -canvas.height / 9, 0, canvas.height);
    }

    function fillCircle(x, y, r, color) {
      g.fillStyle = color;
      g.beginPath();
      g.arc(x, y, r, 0, 2 * Math.PI);
      g.fill();
    }

    function drawBackground() {
      g.fillStyle = SKY;
      g.fillRect(0, 0, 16, 9);
      g.fillStyle = 'white';
      for (const [x, y, size] of stars) g.fillRect(x, y, size, size);
    }

    function drawMoon() {
      const s = stateRef.current;
      g.save();
      g.translate(8, 2);
      g.rotate(s.moonAngle);
      g.translate(6.5, 0);
      g.rotate(-s.moonAngle);
      fillCircle(0, 0, 0.8, '#f0ebc8');
      fillCircle(-0.3, 0.25, 0.17, '#d6d0a8');
      fillCircle(0.25, -0.15, 0.13, '#d6d0a8');
      fillCircle(-0.1, -0.45, 0.09, '#d6d0a8');
      fillCircle(1.1 + 0.6 * Math.sin(s.moonPhase), 0, 0.8, SKY);
      g.restore();
    }

    function drawGround() {
      g.fillStyle = '#226e34';
      g.fillRect(0, 1.5, 16, FLOOR - 1.5);
      g.fillStyle = '#373740';
      g.fillRect(0, 0, 16, 1.5);
      g.fillStyle = '#eeeeee';
      for (let x = 0; x < 16; x += 2) g.fillRect(x, 0.7, 1, 0.1);
    }

    function drawBall() {
      const s = stateRef.current;
      const height = s.ballY - BALL_R - FLOOR;
      const sc = Math.max(0.3, 1 - height / 10);
      g.save();
      g.translate(s.ballX, FLOOR - 0.12);
      g.scale(sc, 1);
      g.fillStyle = '#14461f';
      g.beginPath();
      g.ellipse(0, 0, 0.5, 0.1, 0, 0, 2 * Math.PI);
      g.fill();
      g.restore();
      g.save();
      g.translate(s.ballX, s.ballY);
      fillCircle(0, 0, BALL_R, '#e60026');
      fillCircle(-0.15, 0.15, 0.12, '#ff6678');
      g.restore();
    }

    function drawWheel(angle) {
      g.save();
      g.rotate(-angle);
      fillCircle(0, 0, WHEEL_R, '#141414');
      fillCircle(0, 0, WHEEL_R * 0.6, '#bbbbbb');
      g.strokeStyle = '#141414';
      g.lineWidth = 0.04;
      for (let i = 0; i < 4; i++) {
        g.beginPath(); g.moveTo(0, 0); g.lineTo(WHEEL_R * 0.6, 0); g.stroke();
        g.rotate(Math.PI / 2);
      }
      g.restore();
    }

    function drawCar() {
      const s = stateRef.current;
      g.save();
      g.translate(s.carX, 0.75);

      // Lagos danfo minibus
      g.fillStyle = '#ffd400';
      g.beginPath();
      g.moveTo(-1.65, -0.02); g.lineTo(1.55, -0.02); g.lineTo(1.65, 0.22);
      g.lineTo(1.65, 0.78); g.lineTo(1.35, 0.88); g.lineTo(1.20, 1.38);
      g.lineTo(-1.12, 1.38); g.lineTo(-1.42, 0.88); g.lineTo(-1.65, 0.78);
      g.closePath(); g.fill();
      g.strokeStyle = '#222222'; g.lineWidth = 0.055; g.stroke();

      // windscreen
      g.fillStyle = '#173b52';
      g.beginPath();
      g.moveTo(0.70, 0.91); g.lineTo(1.23, 0.91); g.lineTo(1.10, 1.27); g.lineTo(0.70, 1.27);
      g.closePath(); g.fill();

      // windows
      g.fillStyle = '#b9e7f5';
      g.fillRect(-1.12, 0.94, 0.48, 0.32);
      g.fillRect(-0.55, 0.94, 0.48, 0.32);
      g.fillRect(0.02, 0.94, 0.48, 0.32);

      // dividers
      g.strokeStyle = '#222222'; g.lineWidth = 0.045;
      for (const x of [-0.61, -0.04, 0.53]) {
        g.beginPath(); g.moveTo(x, 0.92); g.lineTo(x, 1.29); g.stroke();
      }

      // stripes
      g.fillStyle = '#171717'; g.fillRect(-1.61, 0.48, 3.15, 0.10);
      g.fillStyle = '#ffffff'; g.fillRect(-1.59, 0.36, 3.12, 0.045);
      g.fillStyle = '#d71920'; g.fillRect(-1.58, 0.25, 3.10, 0.055);

      // route sign
      g.fillStyle = '#f5f5f5'; g.fillRect(0.73, 1.30, 0.39, 0.09);
      g.fillStyle = '#333333'; g.fillRect(1.40, 0.12, 0.16, 0.10);
      g.fillStyle = '#fff2a6'; g.fillRect(1.49, 0.65, 0.11, 0.10);
      g.fillStyle = '#d71920'; g.fillRect(-1.63, 0.63, 0.10, 0.10);

      // wheels
      g.save(); g.translate(-1.00, 0); drawWheel(s.wheelAngle); g.restore();
      g.save(); g.translate(1.00, 0);  drawWheel(s.wheelAngle); g.restore();

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
      s.moonPhase += 0.5 * dt;
    }

    function draw() {
      applyLimits();
      drawBackground(); drawMoon(); drawGround(); drawBall(); drawCar();
    }

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

    return () => {
      cancelAnimationFrame(stateRef.current.rafId);
      window.removeEventListener('keydown', handleKey);
    };
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
