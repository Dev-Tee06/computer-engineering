import './AyodeleMovingMoon.css';

export default function AyodeleMovingMoon() {
  return (
    <div className="ayd-moon-wrap">
      <div className="ayd-stars" />
      <div className="ayd-stars2" />
      <div className="ayd-moon-scene">
        <div className="ayd-travel-x">
          <div className="ayd-travel-y">
            <div className="ayd-travel-z">
              <div className="ayd-moon">
                <div className="ayd-surface" />
                <div className="ayd-shade" />
                <div className="ayd-phase" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ayd-hills" />
    </div>
  );
}
