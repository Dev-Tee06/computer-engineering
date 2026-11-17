import './AyodeleBouncingBall.css';

export default function AyodeleBouncingBall() {
  return (
    <div className="ayd-ball-wrap">
      <div className="ayd-ball-scene">
        <div className="ayd-ball-world">
          <div className="ayd-ball-floor" />
          <div className="ayd-ball-path">
            <div className="ayd-ball-bounce">
              <div className="ayd-ball-ball" />
            </div>
            <div className="ayd-ball-shadow" />
          </div>
        </div>
      </div>
    </div>
  );
}
