import { Video, AlertTriangle, Download } from 'lucide-react';
import './BlenderVideoPreview.css';

/**
 * BlenderVideoPreview — shown for Blender/bpy submissions.
 * Displays video if available at previewPath, otherwise shows a placeholder.
 */
export default function BlenderVideoPreview({ assignment }) {
  const { previewPath, title } = assignment;

  // Try to load video; if it fails we show the placeholder
  if (previewPath) {
    return (
      <div className="blender-wrap">
        <video
          className="blender-video"
          src={previewPath}
          controls
          loop
          playsInline
          preload="metadata"
          onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
        />
        <BlenderPlaceholder title={title} />
      </div>
    );
  }

  return (
    <div className="blender-wrap">
      <BlenderPlaceholder title={title} />
    </div>
  );
}

function BlenderPlaceholder({ title }) {
  return (
    <div className="blender-placeholder">
      <div className="blender-placeholder__icon">
        <Video size={40} />
      </div>
      <h3 className="blender-placeholder__title">{title}</h3>
      <p className="blender-placeholder__desc">
        This animation was created as a Blender Python (<code>bpy</code>) script and requires
        rendering in Blender before it can play in a browser.
      </p>
      <div className="blender-placeholder__steps">
        <div className="blender-placeholder__step">
          <span className="blender-placeholder__step-num">1</span>
          Open Blender → Scripting workspace → paste the submitted Python script.
        </div>
        <div className="blender-placeholder__step">
          <span className="blender-placeholder__step-num">2</span>
          Click <strong>Run Script</strong>. Press Spacebar in the viewport to preview.
        </div>
        <div className="blender-placeholder__step">
          <span className="blender-placeholder__step-num">3</span>
          Render the animation (Render → Render Animation). Export as MP4 or WebM.
        </div>
        <div className="blender-placeholder__step">
          <span className="blender-placeholder__step-num">4</span>
          Drop the exported file in <code>public/videos/</code> and update the
          assignment's <code>previewPath</code> in <code>src/data/assignments.js</code>.
        </div>
      </div>
      <div className="blender-placeholder__notice">
        <AlertTriangle size={14} />
        No fabricated render is shown. Place the actual exported video to enable playback.
      </div>
    </div>
  );
}
