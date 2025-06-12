import React, { useState } from 'react';
import WelcomeStep from './WelcomeStep';
import CyberQuizStep from './CyberQuizStep';
import ContractUploadStep from './ContractUploadStep';
import {
  analyzeCyberQuiz,
  analyzeContract,
} from '../utils/riskAnalysis';

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

  // State for quiz and contract data
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizAnalysis, setQuizAnalysis] = useState(null);

  const [contractText, setContractText] = useState('');
  const [contractAnalysis, setContractAnalysis] = useState(null);

  // Steps array for easy management
  const steps = [
    'Welcome',
    'Cyber Hygiene Quiz',
    'Contract Upload/Analysis',
    'Results Dashboard',
    'Thank You',
  ];

  // Navigation handlers
  const goToNext = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const goToPrev = () => setStep((s) => Math.max(s - 1, 0));

  function renderStep() {
    switch (step) {
      case 0:
        return <WelcomeStep onGetStarted={goToNext} />;

      case 1:
        // CyberQuizStep: onComplete triggers analysis and proceed
        return (
          <CyberQuizStep
            onBack={goToPrev}
            initialAnswers={quizAnswers}
            onComplete={({ score, answers }) => {
              setQuizAnswers(answers);
              // Compute quiz risk using mock "AI" logic
              const analysis = analyzeCyberQuiz(answers);
              setQuizAnalysis(analysis);
              goToNext();
            }}
          />
        );

      case 2:
        // Contract Upload/Analysis step - analyze on click
        return (
          <ContractUploadStep
            value={contractText}
            onChange={setContractText}
            uploading={false}
            onBack={goToPrev}
            onAnalyze={() => {
              // Perform "AI" contract analysis using mock utility
              const result = analyzeContract(contractText || "");
              setContractAnalysis(result);
              goToNext();
            }}
          />
        );

      case 3:
        // Unified Results Dashboard with mock "AI" logic
        const cyber = quizAnalysis || analyzeCyberQuiz(quizAnswers);
        const contract = contractAnalysis || analyzeContract(contractText);

        return (
          <div className="container" style={{ paddingTop: 80, maxWidth: 700 }}>
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
              <div>
                <b>Cyber Hygiene:</b>
                {" "}
                <span style={{ color: cyber.tier === "Low" ? "#9ee56c" : (cyber.tier === "Medium" ? "#ffcc80" : "#ff6d6d"), fontWeight: 500 }}>
                  {cyber.tier}
                </span>
                <span style={{
                  color: '#ffc66c', fontWeight: 500, fontSize: '1rem', marginLeft: 7
                }}>
                  ({cyber.score}/{cyber.total})
                </span>
              </div>
              {cyber.message && (
                <div style={{ color: "#25d4c6", marginTop: 3 }}>{cyber.message}</div>
              )}
              {cyber.redFlags && cyber.redFlags.length > 0 && (
                <div style={{ margin: "8px 0 0 0", color: "#fc908d" }}>
                  &#9888; Behavioral Red Flags: {cyber.redFlags.join(", ")}
                </div>
              )}
              <div style={{ marginTop: 15 }}>
                <b>Contract Risk:</b>
                {" "}
                <span style={{ color: contract.tier === "Low" ? "#9ee56c" : (contract.tier === "Medium" ? "#ffcc80" : contract.tier === "High" ? "#ff6d6d" : "#aaa"), fontWeight: 500 }}>
                  {contract.tier}
                </span>
                <span style={{ color: "#ffc66c", fontWeight: 500, fontSize: "1rem", marginLeft: 7 }}>{contract.risk}</span>
              </div>
              {contract.redFlags && contract.redFlags.length > 0 && (
                <div style={{ margin: "8px 0 0 0", color: "#fc908d" }}>
                  &#9888; Contract Red Flags: {contract.redFlags.join(", ")}
                </div>
              )}
              <div style={{ marginTop: 11 }}>
                <b>Summary:</b>
                <div style={{ color: '#8cf9cc', fontSize: '1rem' }}>
                  {contract.summary}
                </div>
              </div>
            </div>
            <div>
              <b>Personalized Recommendations</b>
              <ul>
                {/* Sample, can use actual analysis for finer logic */}
                {cyber.tier === "High" && <li>Strengthen digital behavior: use strong, unique passwords and enable 2FA everywhere.</li>}
                {cyber.redFlags && cyber.redFlags.includes("Phishing risk behavior") && <li>Be extra cautious of suspicious emails and links.</li>}
                {contract.tier === "High" && <li>Re-negotiate or seek legal advice on indemnification, perpetual, or breach clauses.</li>}
                {contract.redFlags && contract.redFlags.includes("Exclusive Clause") && <li>Assess exclusivity risks in your contract; consider negotiation.</li>}
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
