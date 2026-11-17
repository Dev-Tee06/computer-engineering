import { useState } from 'react';
import './TimothyAnimations.css';

function usePlayState(initial = false) {
  const [playing, setPlaying] = useState(initial);
  return { playing, play: () => setPlaying(true), pause: () => setPlaying(false) };
}

export function TimothyBouncingBall() {
  const { playing, play, pause } = usePlayState();
  return (
    <div>
      <div className={`tim-ball-scene${playing ? ' tim-playing' : ''}`}>
        <div className="tim-ball-object" />
        <div className="tim-ball-floor" />
      </div>
      <div className="tim-controls">
        <button className="tim-btn" onClick={play}>Start</button>
        <button className="tim-btn" onClick={pause}>Stop</button>
      </div>
    </div>
  );
}

export function TimothyMovingCar() {
  const { playing, play, pause } = usePlayState();
  return (
    <div>
      <div className={`tim-car-scene${playing ? ' tim-playing' : ''}`}>
        <div className="tim-sunlight" />
        <div className="tim-cloud" />
        <div className="tim-roadway" />
        <div className="tim-vehicle">🚗</div>
      </div>
      <div className="tim-controls">
        <button className="tim-btn" onClick={play}>Start</button>
        <button className="tim-btn" onClick={pause}>Stop</button>
      </div>
    </div>
  );
}

export function TimothyMovingMoon() {
  const { playing, play, pause } = usePlayState();
  return (
    <div>
      <div className={`tim-moon-scene${playing ? ' tim-playing' : ''}`}>
        <div className="tim-stars" />
        <div className="tim-moon-object">🌕</div>
        <div className="tim-night-ground" />
      </div>
      <div className="tim-controls">
        <button className="tim-btn" onClick={play}>Start</button>
        <button className="tim-btn" onClick={pause}>Stop</button>
      </div>
    </div>
  );
}
