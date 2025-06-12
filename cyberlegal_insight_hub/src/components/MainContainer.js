import React, { useState } from 'react';
import WelcomeStep from './WelcomeStep';
import CyberQuizStep from './CyberQuizStep';
// PUBLIC_INTERFACE
function MainContainer() {
  /**
   * MainContainer manages the entire multi-step CyberLegal Insight Hub flow:
   * 1. Welcome
   * 2. Cyber Hygiene Quiz
   * 3. Contract Upload/Analysis
   * 4. Results Dashboard
   * 5. Thank You/Follow-up
   */

  // Step index: 0=Welcome, 1=Quiz, 2=Contract, 3=Results, 4=ThankYou
  const [step, setStep] = useState(0);

  // Placeholder local state for quiz and contract data
  const [quizAnswers, setQuizAnswers] = useState({});
  const [contractText, setContractText] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);

  // Steps array for easy management
  const steps = [
    'Welcome',
    'Cyber Hygiene Quiz',
    'Contract Upload/Analysis',
    'Results Dashboard',
    'Thank You',
  ];

  // Handlers for navigation and (future) data actions
  const goToNext = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const goToPrev = () => setStep((s) => Math.max(s - 1, 0));

  function renderStep() {
    switch (step) {
      case 0:
        // Use branded WelcomeStep component
        return <WelcomeStep onGetStarted={goToNext} />;

      case 1:
        // CyberQuizStep: interactive quiz UI with scoring and progress
        return (
          <CyberQuizStep
            onBack={goToPrev}
            initialAnswers={quizAnswers}
            onComplete={({ score, answers }) => {
              setQuizAnswers(answers); // persist for results
              goToNext();
            }}
          />
        );

      case 2:
        // Contract Upload/Analysis placeholder
        return (
          <div className="container" style={{ paddingTop: 80, maxWidth: 540 }}>
            <h2 className="title" style={{ fontSize: '2rem', marginBottom: 10 }}>Analyze a Contract or Legal Text</h2>
            <div className="description" style={{ marginBottom: 10 }}>
              Paste or upload your contract for instant, local AI-powered analysis. <br />
              <span style={{ color: '#56e2ff', fontSize: '0.97rem' }}>
                Your data is secure—nothing leaves your browser.
              </span>
            </div>
            <textarea
              rows={7}
              className="container"
              style={{
                width: '100%',
                resize: 'vertical',
                fontFamily: 'inherit',
                padding: 12,
                fontSize: '1rem',
                marginBottom: 16,
                borderRadius: 4,
                border: '1px solid #eee',
              }}
              placeholder="Paste your contract or legal agreement text here..."
              value={contractText}
              onChange={e => setContractText(e.target.value)}
            />
            {/* No file upload for MVP per instruction, just paste for now */}
            <button className="btn" onClick={goToPrev} style={{ marginRight: 8 }}>Back</button>
            <button
              className="btn btn-large"
              disabled={!contractText.trim()}
              onClick={() => {
                // Future: perform local AI analysis here
                setAnalysisResult({ risk: 'Medium', summary: 'Example: Arbitration clause present.' });
                goToNext();
              }}
            >Analyze</button>
          </div>
        );

      case 3:
        // Results Dashboard placeholder (with quiz scoring)
        // Determine Cyber Hygiene message based on quiz score
        const totalQuizQs = 4;
        const quizScore = Object.values(quizAnswers || {}).length > 0
          ? Object.values(quizAnswers).filter((v,i) => {
              // Score logic matches CyberQuizStep correct answers
              const corrects = ['b','b','b','a'];
              return v === corrects[i];
            }).length
          : 0;
        const hygieneMsg = quizScore === totalQuizQs
          ? "Excellent"
          : quizScore >= 3
          ? "Good"
          : quizScore > 0
          ? "Needs Improvement"
          : "Not attempted";

        return (
          <div className="container" style={{ paddingTop: 80, maxWidth: 680 }}>
            <h2 className="title" style={{ fontSize: '2rem', marginBottom: 10 }}>Your Risk Assessment Results</h2>
            <div className="description" style={{ marginBottom: 14 }}>
              Here’s your unified digital & contractual risk profile:
            </div>
            <div style={{
              background: 'rgba(27,27,40,0.8)',
              borderRadius: 8,
              padding: 24,
              marginBottom: 18,
              border: '1px solid var(--border-color)'
            }}>
              <div><b>Cyber Hygiene:</b> {hygieneMsg} <span style={{color:'#ffc66c',fontWeight:500,fontSize:'1rem'}}>({quizScore}/{totalQuizQs})</span></div>
              <div><b>Contract Risk:</b> {analysisResult ? analysisResult.risk : 'N/A'}</div>
              <div style={{ marginTop: 9 }}>
                <b>Summary:</b>
                <div style={{ color: '#8cf9cc', fontSize: '1rem' }}>
                  {analysisResult ? analysisResult.summary : 'No contract analyzed.'}
                </div>
              </div>
            </div>
            <div>
              <b>Personalized Recommendations</b>
              <ul>
                <li>Change passwords regularly and avoid reuse.</li>
                <li>Be cautious of email links and attachments.</li>
                <li>Review arbitration, termination, and exclusivity clauses in contracts.</li>
              </ul>
            </div>
            <button className="btn" onClick={goToPrev} style={{ marginRight: 8 }}>Back</button>
            <button className="btn btn-large" onClick={goToNext}>View Action Plan</button>
          </div>
        );

      case 4:
        // Thank You / Follow-up
        return (
          <div className="hero" style={{ textAlign: 'center', padding: '90px 0' }}>
            <h1 className="title" style={{ fontSize: '2.1rem', marginBottom: 20 }}>Thank You for Using CyberLegal Insight Hub!</h1>
            <div className="description" style={{ marginBottom: 35 }}>
              Your personalized risk report and action plan have been prepared. Stay informed and safe!
            </div>
            <button className="btn" onClick={() => setStep(0)}>
              Restart Assessment
            </button>
          </div>
        );
      default:
        return null;
    }
  }

  // Progress bar for steps 1-3
  function StepProgressBar() {
    if (step === 0 || step === steps.length - 1) return null;
    return (
      <div style={{
        margin: '30px auto 32px',
        maxWidth: 420,
        textAlign: 'center',
        fontSize: '0.95rem'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 8
        }}>
          {steps.slice(1, -1).map((label, idx) => (
            <div key={label} style={{
              flex: 1,
              color: idx + 1 <= step ? '#37c8e8' : '#cce6ff',
              fontWeight: idx + 1 === step ? 700 : 400
            }}>
              {label}
              {idx < steps.length - 3 && (
                <span style={{
                  margin: '0 5px',
                  color: '#ccc'
                }}>→</span>
              )}
            </div>
          ))}
        </div>
        <div style={{
          height: 6,
          background: 'linear-gradient(to right, #37c8e8 0%, #fbbf24 100%)',
          opacity: 0.28,
          borderRadius: 3
        }}>
          <div style={{
            width: `${Math.min((step) * 40, 100)}%`,
            height: '100%',
            background: 'linear-gradient(to right, #37c8e8 0%, #fbbf24 80%)',
            borderRadius: 3
          }} />
        </div>
      </div>
    );
  }

  return (
    <div>
      <StepProgressBar />
      {renderStep()}
    </div>
  );
}

export default MainContainer;
