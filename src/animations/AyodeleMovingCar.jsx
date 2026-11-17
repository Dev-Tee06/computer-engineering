import './AyodeleMovingCar.css';

// Helper: 6-sided box with explicit face class names
function Box({ className, children }) {
  return (
    <div className={`ayd-box ${className}`}>
      <div className="f" /><div className="k" />
      <div className="r" /><div className="l" />
      <div className="t" /><div className="b" />
      {children}
    </div>
  );
}

function Wheel({ style }) {
  return (
    <div className="ayd-wheel" style={style}>
      <div className="ayd-tyre" />
    </div>
  );
}

export default function AyodeleMovingCar() {
  return (
    <div className="ayd-car-wrap">
      <div className="ayd-car-scene">
        <div className="ayd-car-world">
          {/* ground */}
          <div className="ayd-grass" />
          <div className="ayd-road">
            <div className="ayd-dashes" />
          </div>

          {/* car */}
          <div className="ayd-car-root">
            <div className="ayd-shadow-el" />
            <div className="ayd-bob">
              <Box className="ayd-cbody" />
              <Box className="ayd-ccabin" />
              {/* 4 wheels: FR, FL, RR, RL */}
              <Wheel style={{ transform: 'translate3d(100px,-22px,42px)' }} />
              <Wheel style={{ transform: 'translate3d(100px,-22px,-42px)' }} />
              <Wheel style={{ transform: 'translate3d(-100px,-22px,42px)' }} />
              <Wheel style={{ transform: 'translate3d(-100px,-22px,-42px)' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
