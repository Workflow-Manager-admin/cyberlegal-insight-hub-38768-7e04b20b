import React from 'react';

/** 
 * ThankYouStep
 * - Friendly, positive branded wrap-up screen for the CyberLegal Insight Hub.
 * - Shows a "Thank you", summary, resource/feedback CTA, and Kavia branding.
 * - To be used as the final step in the assessment flow.
 * 
 * Props:
 *   onRestart: callback for "Restart Assessment"
 */
// PUBLIC_INTERFACE
function ThankYouStep({ onRestart }) {
  return (
    <div
      className="hero"
      style={{
        textAlign: 'center',
        padding: '100px 0',
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
      aria-label="Thank You Summary"
    >

      {/* Brand logo */}
      <div className="logo" style={{
        color: '#2563eb',
        fontWeight: 700,
        fontSize: '1.38rem',
        marginBottom: 16,
        display: "flex",
        alignItems: "center",
        gap: 8
      }}>
        <span className="logo-symbol" style={{
          color: '#fbbf24',
          fontSize: '1.8rem',
          fontFamily: 'monospace',
        }}>*</span>
        KAVIA AI
      </div>

      {/* Positive illustration */}
      <div style={{ marginBottom: 26, marginTop: 8 }}>
        {/* Sparkle shield-checked-for-success SVG */}
        <svg width="95" height="72" viewBox="0 0 95 72" fill="none" aria-hidden>
          <ellipse cx="48" cy="63" rx="39" ry="8" fill="#c7e6fc" opacity="0.2"/>
          <path d="M47 9c17 3 21 5 21 11.4 0 16.4-9.054 24.935-18.5 28.1a4.4 4.4 0 0 1-3.8 0C29.054 45.335 20 36.8 20 20.4 20 14 30 12 47 9Z" fill="#2563eb"/>
          <circle cx="47" cy="21.5" r="8" fill="#fff"/>
          <rect x="39.5" y="32" width="13" height="3" rx="1.5" fill="#fff"/>
          {/* Checkmark accent */}
          <polyline points="45,25 50,29 55,19" fill="none" stroke="#27e39e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          {/* Sparkle accent */}
          <g>
              <circle cx="75" cy="19" r="1.9" fill="#fbbf24"/>
              <rect x="74.5" y="13" width="1" height="3.2" rx=".5" fill="#fbbf24"/>
              <rect x="74.5" y="22" width="1" height="3.2" rx=".5" fill="#fbbf24"/>
              <rect x="80" y="18.5" width="1" height="3.2" rx=".5" transform="rotate(90 80 18.5)" fill="#fbbf24"/>
              <rect x="70" y="18.5" width="1" height="3.2" rx=".5" transform="rotate(90 70 18.5)" fill="#fbbf24"/>
          </g>
        </svg>
      </div>

      {/* Headline */}
      <h1 className="title" style={{
        fontSize: '2.15rem',
        marginBottom: 18,
        color: '#28306d',
        fontWeight: 700,
        lineHeight: 1.14
      }}>
        Thank You for Using<br />CyberLegal Insight Hub!
      </h1>

      {/* Friendly summary */}
      <div className="description" style={{
        marginBottom: 30,
        color: "#4074a3",
        fontSize: "1.12rem",
        fontWeight: 500
      }}>
        Your risk report and personalized action plan are ready.<br />
        Stay proactive, keep learning, and revisit us anytime.<br />
        <span style={{ color: "#2563eb", fontWeight: 500 }}>You're on the path to safer digital & legal choices!</span>
      </div>

      {/* CTA section */}
      <div style={{
        marginBottom: 32,
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        alignItems: 'center',
        width: '100%',
        maxWidth: 370
      }}>
        <a
          className="btn btn-large"
          style={{
            background: 'linear-gradient(90deg,#2563eb 16%,#fbbf24 94%)',
            color: '#fff',
            fontWeight: 600,
            fontSize: '1.085rem',
            borderRadius: 5,
            boxShadow: '0 1px 7px #217ddb1f',
            marginBottom: 3
          }}
          href="https://www.kavia.ai/resources"
          target="_blank"
          rel="noopener noreferrer"
        >
          Explore Cyber & Legal Resources
        </a>
        <a
          className="btn"
          style={{
            background: '#eaf2fe',
            color: '#2563eb',
            fontWeight: 500,
            fontSize: "0.98rem",
            borderRadius: 5
          }}
          href="https://forms.gle/xnouhx5rwoUr2o4CA"
          target="_blank"
          rel="noopener noreferrer"
        >
          Give Feedback
        </a>
      </div>

      <button
        className="btn"
        type="button"
        style={{
          background: "#2563eb",
          color: "white",
          fontWeight: 600,
          borderRadius: 4,
          minWidth: 120,
        }}
        onClick={onRestart}
      >
        Restart Assessment
      </button>

      <div style={{
        marginTop: 38,
        fontSize: "0.98rem",
        color: "#badaff",
        opacity: 0.83,
        fontWeight: 400
      }}>
        Powered securely by <span style={{ color: "#fbbf24", fontWeight: 600 }}>Kavia AI</span>
      </div>
    </div>
  );
}

export default ThankYouStep;
