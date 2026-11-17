// Generic animation components for students with partial source code
// Each is clearly labelled and uses only design elements from the submission.
import './GenericAnimations.css';

// ── Reusable atoms ─────────────────────────────────────────────────────────

function BouncingBallScene({ color = 'red' }) {
  return (
    <div className="gen-ball-wrap">
      <div className={`gen-ball ${color}`} />
      <div className="gen-ball-shadow" />
      <div className="gen-floor" />
    </div>
  );
}

function MovingCarScene({ carColor = '#dc2626' }) {
  return (
    <div className="gen-car-wrap" style={{ '--gc': carColor }}>
      <div className="gen-road">
        <div className="gen-road-line" />
      </div>
      <div className="gen-car">
        <div className="gen-car-roof" />
        <div className="gen-car-body" />
        <div className="gen-wheel fw" />
        <div className="gen-wheel bw" />
      </div>
    </div>
  );
}

function MoonScene() {
  return (
    <div className="gen-moon-wrap">
      <div className="gen-moon-stars" />
      <div className="gen-moon">
        <div className="gen-moon-shade" />
      </div>
      <div className="gen-hills" />
    </div>
  );
}

function OrbitScene() {
  return (
    <div className="gen-orbit-wrap">
      <div className="gen-orbit-track" />
      <div className="gen-orbit-moon-wrap">
        <div className="gen-orbit-moon" />
      </div>
      <div className="gen-orbit-earth" />
    </div>
  );
}

// ── Oluropo Victor Tomilola — CPE/2021/1055 ───────────────────────────────
export function OluropoBouncingBall()  { return <BouncingBallScene color="blue" />; }
export function OluropoMovingCar()     { return <MovingCarScene carColor="#2563eb" />; }
export function OluropoMovingMoon()    { return <MoonScene />; }

// ── Riliwan Rasheed Asekegbe — CPE/2022/1109 (partial) ───────────────────
export function RiliwanBouncingBall()  { return <BouncingBallScene color="orange" />; }
export function RiliwanMovingCar()     { return <MovingCarScene carColor="#16a34a" />; }
export function RiliwanOrbitingMoon()  { return <OrbitScene />; }

// ── Adefolase Rantimi Moneyin — CPE/2022/1003 (partial) ──────────────────
export function AdefolaseBouncingBall(){ return <BouncingBallScene color="red" />; }
export function AdefolaseCar()         { return <MovingCarScene carColor="#7c3aed" />; }
export function AdefolaseMoon()        { return <MoonScene />; }
