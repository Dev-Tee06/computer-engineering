import { useState } from 'react';
import { ChevronRight, Pause, Play, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import './CrazyMotionStudio.css';

const voiceLines = [
  { lead: '"LOOK AT ME!"', message: 'Do you see someone who has given up?' },
  { lead: '', message: '"I have lost the ability to walk... but I have not lost my dreams."' },
  { lead: '', message: '"You measure strength by movement. I measure it by the courage to keep going."' },
  { lead: '"MY STORY IS NOT OVER!"', message: 'And neither is yours.' },
];

function SceneCard({ number, title, description, sceneClass, children, controls }) {
  const [playing, setPlaying] = useState(true);

  return (
    <article className="cms-card">
      <header className="cms-card-heading">
        <span className="cms-card-number">{number}</span>
        <div>
          <h3 className="cms-card-title">{title}</h3>
          <p className="cms-card-description">{description}</p>
        </div>
      </header>

      <div className={`cms-scene ${sceneClass}${playing ? ' cms-running' : ''}`}>
        {children}
      </div>

      <div className="cms-card-footer">
        <div className="cms-card-interactions">{controls}</div>
        <button
          className="cms-play-toggle"
          type="button"
          onClick={() => setPlaying((current) => !current)}
          aria-label={`${playing ? 'Pause' : 'Play'} ${title} animation`}
          aria-pressed={playing}
        >
          {playing ? <Pause size={15} /> : <Play size={15} />}
          {playing ? 'Pause' : 'Play'}
        </button>
      </div>
    </article>
  );
}

export default function CrazyMotionStudio() {
  const [hornActive, setHornActive] = useState(false);
  const [activeVoiceLine, setActiveVoiceLine] = useState(0);
  const line = voiceLines[activeVoiceLine];

  return (
    <div className="cms-wrap">
      <header className="cms-header">
        <div className="cms-eyebrow">CPE 505 · Interactive animation</div>
        <h2>Crazy Motion Studio</h2>
        <p>Three scenes. Pick a moment, press play, and make it your own.</p>
      </header>

      <div className="cms-scenes">
        <SceneCard
          number="01"
          title="The Great Chase"
          description="A curious cat, one quick mouse, and a sunny afternoon."
          sceneClass="cms-cat-scene"
        >
          <div className="cms-scene-title">THE GREAT CHASE</div>
          <div className="cms-cat-sun" />
          <div className="cms-grass" />
          <div className="cms-cat-shadow" />
          <div className="cms-cat-character">
            <span className="cms-cat-face">🐈</span>
          </div>
          <div className="cms-mouse-track">
            <div className="cms-mouse-character">🐁</div>
          </div>
          <div className="cms-cat-z">?!</div>
          <div className="cms-cat-caption">"COME BACK HERE!" 😂</div>
        </SceneCard>

        <SceneCard
          number="02"
          title="Danfo: Lagos Traffic"
          description="Gridlock, a busy road, and the conductor's call."
          sceneClass="cms-danfo-scene"
          controls={
            <button
              className="cms-interaction-btn"
              type="button"
              onClick={() => setHornActive((active) => !active)}
              aria-pressed={hornActive}
            >
              {hornActive ? <VolumeX size={15} /> : <Volume2 size={15} />}
              {hornActive ? 'Quiet horn' : 'Honk the Danfo'}
            </button>
          }
        >
          <div className="cms-scene-title">LAGOS TRAFFIC · NO GREE FOR ANYBODY</div>
          <div className="cms-lagos-sky">
            <div className="cms-danfo-sun" />
            <div className="cms-building cms-b1" />
            <div className="cms-building cms-b2" />
            <div className="cms-building cms-b3" />
            <div className="cms-tl">
              <span /><span /><span />
            </div>
          </div>
          <div className="cms-road">
            <div className="cms-lane" />
            <div className="cms-vehicle cms-other-car">🚗</div>
            <div className="cms-vehicle cms-truck">🚚</div>
            <div className="cms-danfo">
              <div className="cms-danfo-sign">LAGOS DANFO</div>
              <div className="cms-danfo-ws" />
              <div className="cms-danfo-body">
                <span className="cms-window">▰</span>
                <span className="cms-window">▰</span>
                <span className="cms-window">▰</span>
                <span className="cms-window">▰</span>
              </div>
              <div className="cms-danfo-front">
                <div className="cms-headlight" />
                <div className="cms-bumper" />
              </div>
              <div className="cms-dwheel cms-dlw" />
              <div className="cms-dwheel cms-drw" />
            </div>
            <div className="cms-road-line" />
          </div>
          <div className={`cms-horn${hornActive ? ' cms-honking' : ''}`} aria-live="polite">
            {hornActive ? '📢 PAAAM! PAAAM!' : ''}
          </div>
          <div className="cms-traffic-text">HOLD-UP!! 😭</div>
          <div className="cms-danfo-caption">
            <span>CONDUCTOR:</span> "Oshodi! Oshodi! Enter with your change!" 😂
          </div>
        </SceneCard>

        <SceneCard
          number="03"
          title="The Unbreakable Voice"
          description="A story of courage, resilience, and hope."
          sceneClass="cms-drama-scene"
          controls={
            <>
              <button
                className="cms-interaction-btn cms-interaction-btn--quiet"
                type="button"
                onClick={() => setActiveVoiceLine(0)}
              >
                <RotateCcw size={14} />
                Restart
              </button>
              <button
                className="cms-interaction-btn"
                type="button"
                onClick={() => setActiveVoiceLine((current) => (current + 1) % voiceLines.length)}
              >
                Next line
                <ChevronRight size={15} />
              </button>
            </>
          }
        >
          <div className="cms-scene-title">THE UNBREAKABLE VOICE</div>
          <div className="cms-spotlight" />
          <div className="cms-dialogue" aria-live="polite" aria-atomic="true">
            <div className="cms-dialogue-line">
              {line.lead && <strong>{line.lead}</strong>}
              <span>{line.message}</span>
            </div>
            <div className="cms-dialogue-progress" aria-label={`Line ${activeVoiceLine + 1} of ${voiceLines.length}`}>
              {voiceLines.map((_, index) => (
                <span
                  key={index}
                  className={index === activeVoiceLine ? 'cms-dialogue-step cms-dialogue-step--active' : 'cms-dialogue-step'}
                />
              ))}
            </div>
          </div>
          <div className="cms-character">
            <div className="cms-char-head">
              <div className="cms-eye l" />
              <div className="cms-eye r" />
              <div className="cms-mouth" />
            </div>
            <div className="cms-char-body" />
            <div className="cms-arm l" />
            <div className="cms-arm r" />
          </div>
          <div className="cms-platform" />
        </SceneCard>
      </div>
    </div>
  );
}
