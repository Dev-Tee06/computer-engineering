import { Play, Pause, RotateCcw, Maximize2 } from 'lucide-react';
import './AnimationControls.css';

export default function AnimationControls({
  playing,
  onPlay,
  onPause,
  onRestart,
  onFullscreen,
  showRestart = true,
  showFullscreen = false,
}) {
  return (
    <div className="anim-controls">
      {playing ? (
        <button className="anim-btn" onClick={onPause} title="Pause">
          <Pause size={16} /> Pause
        </button>
      ) : (
        <button className="anim-btn anim-btn--primary" onClick={onPlay} title="Play">
          <Play size={16} /> Play
        </button>
      )}
      {showRestart && (
        <button className="anim-btn" onClick={onRestart} title="Restart">
          <RotateCcw size={15} /> Restart
        </button>
      )}
      {showFullscreen && (
        <button className="anim-btn" onClick={onFullscreen} title="Fullscreen">
          <Maximize2 size={15} />
        </button>
      )}
    </div>
  );
}
