import React from 'react';

/**
 * ProgressBar component: shows current/total steps as a gradient bar.
 * Props:
 *   current: number (1-based)
 *   total: number
 *   style?: override for bar container
 */
// PUBLIC_INTERFACE
function ProgressBar({ current, total, style }) {
  const percent = Math.min(100, (current / total) * 100);

  return (
    <div
      className="progress-bar-container"
      style={{
        width: '100%',
        margin: '0 auto 16px',
        ...style
      }}
    >
      <div
        className="progress-bar-track"
        style={{
          height: 8,
          background: 'linear-gradient(to right, #2563eb 0%, #fbbf24 100%)',
          opacity: 0.18,
          borderRadius: 5
        }}
      >
        <div
          className="progress-bar-fill"
          style={{
            width: `${percent}%`,
            height: '100%',
            background: 'linear-gradient(to right, #2563eb 0%, #fbbf24 90%)',
            borderRadius: 5,
            transition: 'width 0.34s cubic-bezier(.41,1,.49,1)',
          }}
        />
      </div>
      <div style={{
        fontSize: '0.97rem',
        textAlign: 'right',
        color: '#4074a3',
        marginTop: 3,
        fontWeight: 500,
        letterSpacing: '0.01em'
      }}>
        {current} / {total}
      </div>
    </div>
  );
}

export default ProgressBar;
