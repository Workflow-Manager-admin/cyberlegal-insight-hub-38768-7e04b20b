//
// recommendations.js
//
// PUBLIC_INTERFACE
/**
 * This module mocks GPT-style contextual recommendations, explanations, and sample Q&A for digital and contract risk.
 * Used by RecommendationTabs to provide education center interactivity.
 */

/**
 * Generate personalized recommendations and educational explanations based on current risk context.
 *
 * @param {object} cyber - Output from analyzeCyberQuiz
 * @param {object} contract - Output from analyzeContract
 * @returns {object} { digital: [...], legal: [...], qna: [...] }
 */
export function getRecommendations(cyber, contract) {
  // Digital hygiene: suggest improvements based on detected flags/tier
  const digital = [];
  if (cyber.redFlags?.includes("Weak password habits"))
    digital.push({
      title: "Strengthen Your Passwords",
      explanation:
        "Create strong, unique passwords for every account. Use a password manager and avoid using names, birthdays, or common phrases."
    });

  if (cyber.redFlags?.includes("Phishing risk behavior"))
    digital.push({
      title: "Phishing Awareness",
      explanation:
        "Be wary of emails asking you to click suspicious links or attachments. Always verify the sender, and report phishing attempts."
    });

  if (cyber.redFlags?.includes("Lacks 2FA awareness"))
    digital.push({
      title: "Enable Two-Factor Authentication",
      explanation:
        "2FA makes it much harder for bad actors to access your accounts. Enable it wherever available, especially for sensitive services."
    });

  if (cyber.redFlags?.includes("Neglects device updates"))
    digital.push({
      title: "Keep Devices Updated",
      explanation:
        "Install security and OS updates promptly. Updates often fix vulnerabilities hackers exploit."
    });

  if (digital.length === 0 && cyber.tier === "Low") {
    digital.push({
      title: "Great Job Maintaining Cyber Hygiene!",
      explanation: "You have excellent digital safety habits. Continue reviewing your security practices regularly as threats evolve."
    });
  }

  // Legal/contract: explain red-flagged clauses or issues
  const legal = [];
  if (contract.redFlags?.includes("Binding Arbitration"))
    legal.push({
      title: "Arbitration Clauses",
      explanation:
        "Binding arbitration limits your right to take disputes to court. Understand the implications and seek legal guidance if needed."
    });

  if (contract.redFlags?.includes("Early Termination"))
    legal.push({
      title: "Termination Clauses",
      explanation:
        "Review termination triggers—some contracts allow the other party to end the agreement early, which may increase risk for you."
    });

  if (contract.redFlags?.includes("Exclusivity Clause"))
    legal.push({
      title: "Exclusivity Limitations",
      explanation:
        "Exclusivity can prevent you from working with others or limit your options. Seek clear end dates or more favorable terms if possible."
    });

  if (contract.redFlags?.includes("Indemnification"))
    legal.push({
      title: "Indemnification Risks",
      explanation:
        "Indemnification requires you to pay for certain losses/damages. Negotiate to cap your liability or seek clarity on these obligations."
    });

  if (contract.redFlags?.includes("Breach Liability"))
    legal.push({
      title: "Data Breach Responsibilities",
      explanation:
        "Understand your responsibilities if a data breach occurs and clarify both parties’ obligations."
    });

  if (contract.redFlags?.includes("No End Date"))
    legal.push({
      title: "Perpetual Obligations",
      explanation:
        "Watch for clauses that impose obligations “in perpetuity” or with no clear end date. Negotiate sunset provisions where possible."
    });

  if (legal.length === 0 && contract.tier === "Low")
    legal.push({
      title: "Minimal Legal Risk Detected",
      explanation: "No high-risk contract provisions found. Continue to review legal documents for peace of mind."
    });

  // GPT-like FAQ/conversational Q&A: tailored to flagged issues, always at least a sample
  const qna = [
    {
      q: "Why are strong passwords important?",
      a: "Strong passwords protect your accounts from hackers who use automated tools to guess credentials. Unique, complex passwords make breaches much less likely."
    },
    {
      q: "Should I enable two-factor authentication for all accounts?",
      a: "Yes. Especially for financial, email, and critical accounts—2FA provides an extra layer of security, requiring more than just a password to gain access."
    },
    {
      q: "What should I do if my contract has an indemnification clause?",
      a: "Seek to limit or clarify your liability. If uncertain, consult with a legal professional to understand exactly what risks you're accepting."
    },
    {
      q: "Tips to avoid phishing?",
      a: "Check the sender’s email, don’t click unknown links, and don’t download unexpected attachments. If in doubt, contact the company using official channels."
    }
  ];

  // Filter Q&A to top issues (just demo for MVP - could be made dynamic by redFlags)
  const filteredQna = [];
  if ((cyber.redFlags?.length ?? 0) > 0) {
    filteredQna.push(qna[0]);
    if (cyber.redFlags.includes("Lacks 2FA awareness")) filteredQna.push(qna[1]);
    if (cyber.redFlags.includes("Phishing risk behavior")) filteredQna.push(qna[3]);
  }
  if ((contract.redFlags?.length ?? 0) > 0) {
    filteredQna.push(qna[2]);
  }
  if (filteredQna.length === 0) filteredQna.push(...qna.slice(0, 2));

  return { digital, legal, qna: filteredQna };
}
