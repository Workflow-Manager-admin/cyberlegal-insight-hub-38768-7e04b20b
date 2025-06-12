import React from 'react';

// PUBLIC_INTERFACE
function WelcomeStep({ onGetStarted }) {
  /**
   * Branded, card-style Welcome Component for CyberLegal Insight Hub.
   * Shows Kavia branding, animated illustration, and a Get Started CTA.
   */
  return (
    <div
      className="welcome-card-container"
      style={{
        minHeight: 'calc(87vh - 120px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'none',
      }}
    >
      <div className="welcome-card" style={{
        background: 'white',
        borderRadius: 18,
        boxShadow: '0 6px 30px 0 rgba(60,100,160,0.14), 0 1.5px 6px rgba(60,90,160,0.08)',
        maxWidth: 430,
        width: '100%',
        padding: '54px 34px 40px 34px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 24,
      }}>
        <div className="logo" style={{
          color: 'var(--base-dark)',
          fontSize: '1.25rem',
          fontWeight: 600,
          marginBottom: 8,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <span className="logo-symbol" style={{
            color: '#2563eb',
            fontSize: '1.8rem',
            fontFamily: 'monospace',
            verticalAlign: 'middle',
          }}>
            *
          </span>
          KAVIA AI
        </div>
        <div
          className="welcome-illustration"
          aria-hidden={true}
          style={{
            width: 102,
            height: 102,
            marginBottom: 10,
          }}
        >
          {/* SVG Illustration Placeholder: shield + document + sparkle accent */}
          <svg width="102" height="102" viewBox="0 0 102 102" fill="none">
            <rect x="18" y="34" width="66" height="40" rx="7" fill="#f1f5f9" />
            <rect x="27" y="43" width="48" height="23" rx="4" fill="#c7e6fc" />
            <rect x="27" y="66" width="18" height="5" rx="2" fill="#e0e7ff" />
            <g>
              <ellipse cx="51" cy="33" rx="18" ry="13" fill="#2563eb" opacity="0.32"/>
              <path
                d="M51 17c12 2 15 3.5 15 7.75 0 11.13-6.464 16.92-13.6 19.06a3.2 3.2 0 0 1-2.8 0C42.464 41.67 36 35.88 36 24.75 36 20.5 39 19 51 17Z"
                fill="#2563eb"
              />
              <circle cx="51" cy="26.5" r="4" fill="#fff" />
              <rect x="46.5" y="32.5" width="9" height="2.5" rx="1" fill="#fff" />
            </g>
            {/* Sparkle accent */}
            <g>
              <circle cx="80" cy="32" r="2.2" fill="#fbbf24" />
              <rect x="79.5" y="24" width="1" height="4" rx=".5" fill="#fbbf24" />
              <rect x="79.5" y="36" width="1" height="4" rx=".5" fill="#fbbf24" />
              <rect x="87" y="31.5" width="1" height="4" rx=".5" transform="rotate(90 87 31.5)" fill="#fbbf24" />
              <rect x="75" y="31.5" width="1" height="4" rx=".5" transform="rotate(90 75 31.5)" fill="#fbbf24" />
            </g>
          </svg>
        </div>
        <div className="subtitle" style={{
          color: '#2563eb',
          fontWeight: 600,
          fontSize: '1.09rem',
          marginBottom: 0,
        }}>
          Welcome to the CyberLegal Insight Hub
        </div>
        <h1 className="title" style={{
          color: 'var(--base-dark)',
          fontSize: '2.1rem',
          fontWeight: 700,
          margin: '0 0 5px 0',
          lineHeight: 1.21,
        }}>
          Unify Your Digital & Legal Readiness
        </h1>
        <div className="description" style={{
          color: '#3b465a',
          fontSize: '1.08rem',
          marginBottom: 12,
          textAlign: 'center',
        }}>
          Instantly evaluate your cyber hygiene and gain clarity on your contracts—powered securely by Kavia AI.<br />
          <span style={{ color: '#2563eb', fontWeight: 500 }}>
            Start your journey toward digital and legal confidence.
          </span>
        </div>
        <button
          className="btn btn-large"
          style={{
            background: 'linear-gradient(90deg, #2563eb 10%, #fbbf24 110%)',
            color: 'white',
            fontWeight: 600,
            boxShadow: '0 1px 8px 0 rgba(60,110,120,0.10)',
            letterSpacing: '0.04em',
            fontSize: '1.14rem',
            minWidth: 170,
            borderRadius: '5px',
            marginTop: 8,
          }}
          onClick={onGetStarted}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default WelcomeStep;
