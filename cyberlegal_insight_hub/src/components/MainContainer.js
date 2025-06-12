import React, { useState } from 'react';
import WelcomeStep from './WelcomeStep';
import CyberQuizStep from './CyberQuizStep';
import ContractUploadStep from './ContractUploadStep';
import ResultsDashboard from './ResultsDashboard';
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
        // ResultsDashboard (modular UI, unified, tabbed)
        const cyber = quizAnalysis || analyzeCyberQuiz(quizAnswers);
        const contract = contractAnalysis || analyzeContract(contractText);

        return (
          <React.Fragment>
            <ResultsDashboard
              cyber={cyber}
              contract={contract}
              onBack={goToPrev}
              onNext={goToNext}
            />
          </React.Fragment>
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
