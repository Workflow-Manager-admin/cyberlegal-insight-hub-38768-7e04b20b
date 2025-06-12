import React, { useState } from 'react';
import ProgressBar from './ProgressBar';

/**
 * CyberQuizStep provides an interactive cyber hygiene quiz experience:
 * - Card style question UI, multiple choice answers.
 * - Integrated progress bar.
 * - Navigation (Next/Prev), automatic scoring.
 * - On complete, calls onComplete with the score/answers.
 *
 * Props:
 *   onBack() => called to return to previous step
 *   onComplete(scoreObj) => called when quiz is done
 *   initialAnswers?: answers object for persistence
 */
// PUBLIC_INTERFACE
function CyberQuizStep({ onBack, onComplete, initialAnswers = {} }) {
  // Quiz questions and mcq options
  const questions = [
    {
      id: 'q1',
      text: 'Which password is the most secure?',
      options: [
        { value: 'a', label: 'Password123' },
        { value: 'b', label: 'z#K!fP9q$G8v' },
        { value: 'c', label: 'mybirthday1990' },
        { value: 'd', label: 'superman' }
      ],
      correct: 'b'
    },
    {
      id: 'q2',
      text: 'What should you do if you receive a suspicious email with a link?',
      options: [
        { value: 'a', label: 'Click the link to check security' },
        { value: 'b', label: 'Ignore or delete the email' },
        { value: 'c', label: 'Forward to your friends' },
        { value: 'd', label: 'Open attachments right away' }
      ],
      correct: 'b'
    },
    {
      id: 'q3',
      text: 'What is two-factor authentication (2FA) used for?',
      options: [
        { value: 'a', label: 'Making passwords longer' },
        { value: 'b', label: 'Verifying your identity with a second step' },
        { value: 'c', label: 'Sharing your login with others' },
        { value: 'd', label: 'Speeding up sign-in' }
      ],
      correct: 'b'
    },
    {
      id: 'q4',
      text: 'Which device security practice is best?',
      options: [
        { value: 'a', label: 'Install security updates promptly' },
        { value: 'b', label: 'Never update' },
        { value: 'c', label: 'Click all popups' },
        { value: 'd', label: 'Reuse old passwords' }
      ],
      correct: 'a'
    }
  ];

  // Quiz state: current Q index and answers object
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(initialAnswers);

  // For scoring after last question
  const calcScore = () => {
    let score = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correct) score += 1;
    });
    return score;
  };

  // Select/record answer to MCQ
  function handleAnswer(optionVal) {
    setAnswers(a => ({
      ...a,
      [questions[current].id]: optionVal
    }));
  }

  // Next/Prev logic
  function handleNext() {
    if (current < questions.length - 1) setCurrent(c => c + 1);
    else if (Object.keys(answers).length === questions.length) {
      // Done: submit score and answers up
      onComplete && onComplete({ score: calcScore(), answers });
    }
    // else do nothing if not all questions answered
  }

  function handlePrev() {
    if (current > 0) setCurrent(c => c - 1);
    else onBack && onBack();
  }

  // Card UI
  const q = questions[current];
  const selected = answers[q.id];

  return (
    <div className="container" style={{ paddingTop: 80, maxWidth: 540 }}>
      <ProgressBar
        current={current + 1}
        total={questions.length}
        style={{ marginBottom: 18 }}
      />
      <div className="quiz-card cyber-quiz-card">
        <div className="quiz-q-num" aria-hidden style={{
          fontSize: '1.18rem',
          fontWeight: 600,
          color: '#2563eb'
        }}>
          Question {current + 1} of {questions.length}
        </div>
        <h2 className="title" style={{ fontSize: '1.5rem', margin: '15px 0 8px 0', color: '#1b2361' }}>
          {q.text}
        </h2>
        <form style={{
          display: 'flex', flexDirection: 'column', gap: '13px', margin: '18px 0'
        }} onSubmit={e => { e.preventDefault(); handleNext(); }}>
          {q.options.map(opt => (
            <label key={opt.value} className={`quiz-choice${selected === opt.value ? ' selected' : ''}`}>
              <input
                type="radio"
                name={q.id}
                value={opt.value}
                checked={selected === opt.value}
                onChange={() => handleAnswer(opt.value)}
                style={{ marginRight: 10 }}
              />
              {opt.label}
            </label>
          ))}
        </form>
        <div className="quiz-nav-btns" style={{
          display: 'flex', justifyContent: 'space-between', marginTop: 14, gap: 10
        }}>
          <button
            className="btn"
            type="button"
            onClick={handlePrev}
            style={{ padding: '9px 22px', minWidth: 85 }}
          >{current === 0 ? 'Back' : 'Prev'}</button>
          <button
            className="btn btn-large"
            type="button"
            style={{
              background: "linear-gradient(90deg, #2563eb 10%, #fbbf24 110%)",
              color: "#fff",
              fontWeight: 600,
              minWidth: 120
            }}
            onClick={handleNext}
            disabled={selected == null}
          >{current === questions.length - 1 ? 'Finish Quiz' : 'Next'}</button>
        </div>
      </div>
    </div>
  );
}

export default CyberQuizStep;
