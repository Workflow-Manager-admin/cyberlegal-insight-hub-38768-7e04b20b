//
// riskAnalysis.js
//
// PUBLIC_INTERFACE
/**
 * Mock risk analysis functions for CyberLegal Insight Hub.
 * Simulates AI-driven assessments of quiz responses and contract text.
 */

/**
 * Assigns a risk tier based on a numeric score out of total.
 * @param {number} score
 * @param {number} total
 * @returns {'Low'|'Medium'|'High'}
 */
export function getRiskTier(score, total) {
  // 80%+ = Low, 50-79% = Medium, below 50% = High
  const percent = total > 0 ? (score / total) * 100 : 0;
  if (percent >= 80) return "Low";
  if (percent >= 50) return "Medium";
  return "High";
}

/**
 * Analyze quiz answers and return cyber hygiene score, tier, and message.
 * @param {Object} answers - {q1: 'a', q2: 'b', ...}
 * @returns {*} {score, total, tier, message, redFlags[]}
 */
export function analyzeCyberQuiz(answers) {
  // Fake "correct" answers logic matching CyberQuizStep's quiz
  const corrects = { q1: "b", q2: "b", q3: "b", q4: "a" };
  const total = Object.keys(corrects).length;
  let score = 0;
  let redFlags = [];
  for (let k of Object.keys(corrects)) {
    if (answers[k] === corrects[k]) score++;
    else {
      // Push red flag on cyber behavior
      switch (k) {
        case "q1":
          redFlags.push("Weak password habits");
          break;
        case "q2":
          redFlags.push("Phishing risk behavior");
          break;
        case "q3":
          redFlags.push("Lacks 2FA awareness");
          break;
        case "q4":
          redFlags.push("Neglects device updates");
          break;
        default:
          break;
      }
    }
  }
  const tier = getRiskTier(score, total);
  let message;
  if (score === total) message = "Excellent cyber hygiene!";
  else if (score >= 3) message = "Good but room for improvement.";
  else if (score > 0) message = "Caution: Address your digital habits.";
  else message = "Critical: Major cyber hygiene gaps.";
  return {
    score,
    total,
    tier,
    message,
    redFlags
  };
}

/**
 * Analyze contract text for simple risk signals and output contract risk, tier, issues and summary.
 * This is a MOCK: Flags common terms/clauses or wording riskily.
 * @param {string} contractText
 * @returns {*} {risk, tier, summary, issues[], redFlags[]}
 */
export function analyzeContract(contractText) {
  const lower = contractText.toLowerCase();
  let risk = "Low";
  let issues = [];
  let redFlags = [];

  // Simple keyword-based flagging (expand as needed)
  if (lower.includes("arbitration")) {
    issues.push("Arbitration clause detected (limits court access)");
    redFlags.push("Binding Arbitration");
    risk = "Medium";
  }
  if (lower.match(/(terminate|termination)/)) {
    issues.push("Termination clause found; review triggers.");
    redFlags.push("Early Termination");
    risk = "Medium";
  }
  if (lower.match(/exclusive|exclusivity/)) {
    issues.push("Exclusivity risk (may block alternatives).");
    redFlags.push("Exclusivity Clause");
    risk = "Medium";
  }
  if (lower.match(/indemnify|indemnification/)) {
    issues.push("Indemnification provisions (possible major liability).");
    redFlags.push("Indemnification");
    risk = "High";
  }
  if (lower.match(/perpetual|in perpetuity/)) {
    issues.push("Perpetual obligations detected.");
    redFlags.push("No End Date");
    risk = "High";
  }
  if (lower.includes("data breach")) {
    issues.push("References to data breach responsibilities.");
    redFlags.push("Breach Liability");
    risk = "High";
  }
  // If text is empty/set, mark as N/A
  if (!contractText.trim()) {
    return {
      risk: "N/A",
      tier: "N/A",
      summary: "No contract provided.",
      issues: [],
      redFlags: []
    };
  }

  // Assign the highest risk encountered by keyword (brute force simple severity logic)
  let tier = "Low";
  if (redFlags.some(f => ["Breach Liability", "No End Date", "Indemnification"].includes(f))) {
    tier = "High";
    risk = "High";
  } else if (redFlags.length > 0) {
    tier = "Medium";
    risk = "Medium";
  }

  let summary = issues.length > 0
    ? `Red flags: ${redFlags.join(", ")}. Review: ${issues.join(" ")}`
    : "No high-risk clauses detected. Minimal legal risk.";

  return {
    risk,
    tier,
    summary,
    issues,
    redFlags
  };
}
