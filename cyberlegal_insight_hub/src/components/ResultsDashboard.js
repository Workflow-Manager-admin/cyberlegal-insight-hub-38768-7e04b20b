import React, { useState } from 'react';
import RecommendationTabs from './RecommendationTabs';

/**
 * ResultsDashboard
 * - Modular summary and insights panel for risk results (cyber + contract)
 * - Shows: unified scores, summary bar, tabs (Tips, Summary, Action), checklist (interactive), modal for red flag details.
 * 
 * Props:
 *   cyber: risk object from analyzeCyberQuiz
 *   contract: risk object from analyzeContract
 *   onBack: return action
 *   onNext: CTA for next step
 */
 // PUBLIC_INTERFACE
function ResultsDashboard({ cyber, contract, onBack, onNext }) {
  // Fused risk index for unified bar (avg of tiers)
  const tierToNum = t => t === "Low" ? 1 : t === "Medium" ? 2 : t === "High" ? 3 : 0;
  const numToLabel = t => t === 1 ? "Low" : t === 2 ? "Medium" : t === 3 ? "High" : "N/A";
  const unifiedNum = Math.max(tierToNum(cyber.tier), tierToNum(contract.tier));
  const unifiedLabel = numToLabel(unifiedNum);
  const unifiedColor =
    unifiedNum === 1
      ? '#4fcf8b'
      : unifiedNum === 2
      ? '#ffcc80'
      : unifiedNum === 3
      ? '#ff6d6d'
      : '#aaa';

  // Modal state for expanded red flag details
  const [modal, setModal] = useState(null);

  // Checklist action plan (mock, can expand/fill from props)
  const actionItems = [
    {
      key: "pass",
      title: "Strengthen Passwords & Use Unique Ones",
      checked: cyber.redFlags?.includes("Weak password habits"),
    },
    {
      key: "phishing",
      title: "Be Extra Cautious of Suspicious Emails/Links",
      checked: cyber.redFlags?.includes("Phishing risk behavior"),
    },
    {
      key: "2fa",
      title: "Set Up Two-Factor Authentication (2FA)",
      checked: cyber.redFlags?.includes("Lacks 2FA awareness"),
    },
    {
      key: "device",
      title: "Update Device Security Promptly",
      checked: cyber.redFlags?.includes("Neglects device updates"),
    },
    {
      key: "indemnify",
      title: "Review Indemnification & Liability Clauses (Contract)",
      checked: contract.redFlags?.includes("Indemnification"),
      legal: true,
    },
    {
      key: "breach",
      title: "Understand Data Breach Responsibilities (Contract)",
      checked: contract.redFlags?.includes("Breach Liability"),
      legal: true,
    },
    {
      key: "exclusive",
      title: "Assess/Negotiate Contractual Exclusivity",
      checked: contract.redFlags?.includes("Exclusivity Clause"),
      legal: true,
    }
  ];

  // Tab state ("tips", "summary", "action")
  const [tab, setTab] = useState('summary');
  const tabList = [
    { key: "summary", label: "Summary" },
    { key: "tips", label: "Key Tips" },
    { key: "action", label: "Action Plan" }
  ];

  // In-progress checklist state
  const [checked, setChecked] = useState(
    actionItems.reduce((a, item) => ({ ...a, [item.key]: false }), {})
  );

  function handleCheck(key) {
    setChecked(c => ({ ...c, [key]: !c[key] }));
  }

  return (
    <div className="results-dashboard container" style={{ paddingTop: 80, maxWidth: 720, position: "relative" }}>
      {/* Score Header & Bar */}
      <h2 className="title" style={{ fontSize: '2.1rem', marginBottom: 13, color: '#fbbf24', textShadow: "0 2px 8px #323" }}>
        <span style={{ fontSize: '1.2rem', color: '#57d6e8', marginRight: 7, verticalAlign: "middle" }}>🛡️</span>
        Your Unified Risk Profile
      </h2>
      <div className="dashboard-summary-bar" style={{
        display: "flex", alignItems: "center", gap: 20, margin: "16px 0 22px 0"
      }}>
        <div style={{
          background: "rgba(27,27,40,0.95)",
          boxShadow: "0 3.5px 14px 0 rgba(60,90,140,0.18)",
          borderRadius: 15,
          padding: "19px 26px 17px 24px",
          display: "flex",
          flexDirection: "column",
          minWidth: 220,
          flex: 1
        }}>
          <div style={{
            fontWeight: 600,
            color: "#37c8e8",
            fontSize: "1.14rem",
            marginBottom: 2
          }}>
            Overall Risk
          </div>
          <div style={{
            display: "flex", alignItems: "flex-end", gap: 11
          }}>
            <span style={{
              fontSize: "2.55rem",
              fontWeight: 700,
              color: unifiedColor,
              textShadow: "0 2px 12px #045"
            }}>
              {unifiedLabel}
            </span>
            <span style={{
              color: "#56f2e7",
              fontSize: "1.09rem",
              marginBottom: 4
            }}>
              ({cyber.tier === contract.tier ? cyber.tier : `${cyber.tier} / ${contract.tier}`})
            </span>
          </div>
          {/* Horizontal risk bar */}
          <div style={{
            margin: "13px 0 4px",
            height: 10,
            borderRadius: 4,
            background: "linear-gradient(to right, #4fcf8b, #ffcc80, #ff6d6d)",
            opacity: 0.25
          }}>
            <div style={{
              width: `${unifiedNum * 33.3}%`,
              background: unifiedColor,
              height: "100%",
              borderRadius: 4,
              transition: "width 0.33s cubic-bezier(.44,1,.52,1)"
            }} />
          </div>
          <div style={{
            fontSize: ".97rem",
            color: "#ffb6fc",
            fontWeight: 400,
            marginTop: 2
          }}>
            <span style={{ color: "#ffd14f" }}>{cyber.score}/{cyber.total}</span> in Cyber Quiz · Contract: <span style={{ color: "#ffc66c" }}>{contract.risk}</span>
          </div>
        </div>
        {/* Graph-style donut or vertical - placeholder */}
        <div className="score-donut" style={{
          minWidth: 90,
          height: 90,
          borderRadius: "50%",
          background: "conic-gradient(#4fcf8b 0% 33%, #ffcc80 33% 66%, #ff6d6d 66% 100%)",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: 12,
          boxShadow: "0 1px 8px #25c9f136"
        }}>
          <span style={{
            fontWeight: 800,
            fontSize: "1.35rem",
            color: unifiedColor,
            textShadow: "0 1.5px 8px #021",
            position: "absolute"
          }}>
            {unifiedLabel}
          </span>
        </div>
      </div>
      {/* Tabs - Summary/Tips/Action */}
      <div className="dashboard-tabs" style={{ margin: "30px 0 0", borderBottom: "2px solid #272e38", display: "flex", gap: 1 }}>
        {tabList.map(t => (
          <button
            key={t.key}
            className={`btn dashboard-tab-btn${tab === t.key ? " selected" : ""}`}
            aria-selected={tab === t.key}
            type="button"
            style={{
              background: tab === t.key ? "linear-gradient(90deg,#2563eb 22%,#fbbf24 88%)" : "#1a1a23",
              color: tab === t.key ? "#fff" : "#9adbef",
              fontWeight: tab === t.key ? 700 : 500,
              border: "none",
              borderRadius: "5px 5px 0 0",
              fontSize: "1.08rem",
              padding: "8.5px 28px 9px 28px",
              boxShadow: tab === t.key ? "0 2.5px 14px #0058" : "none",
              marginBottom: "-2px",
              cursor: "pointer",
              transition: "background 0.23s"
            }}
            onClick={() => setTab(t.key)}
          >{t.label}</button>
        ))}
      </div>
      <div className="dashboard-tabpanel" style={{
        background: "#1a1e2d",
        borderRadius: "0 0 14px 14px",
        boxShadow: "0 6px 24px 0 rgba(60,90,140,0.10)",
        padding: "30px 22px 26px 22px",
        marginBottom: 26,
        fontSize: "1.08rem",
        minHeight: 160
      }}>
        {/* Tabs content */}
        {tab === "summary" && (
          <div>
            <div style={{ color: "#ffda8d", fontWeight: 600, marginBottom: 7 }}>AI Summary</div>
            <div style={{ color: "#94f9cc", fontSize: "1.09rem", marginBottom: 11 }}>
              {contract.summary}
            </div>
            <div style={{ color: "#46c9ff" }}>
              {cyber.message}
            </div>
            <div style={{ margin: "12px 0 0 0", color: "#fc908d" }}>
              {/* Unified red flag marker */}
              {cyber.redFlags && cyber.redFlags.length > 0 && (
                <span>
                  <span role="img" aria-label="alert" style={{ fontSize: "1.26rem", verticalAlign: "middle" }}>⚠️</span>
                  <button type="button"
                    onClick={() => setModal("cyber")}
                    style={{
                      color: "#fc908d", background: "transparent", border: "none", cursor: "pointer", textDecoration: "underline", fontWeight: 500, fontSize: "1.03rem"
                    }}
                  >See Digital Red Flags</button>
                </span>
              )}
              {contract.redFlags && contract.redFlags.length > 0 && (
                <span style={{ marginLeft: 12 }}>
                  <span role="img" aria-label="alert" style={{ fontSize: "1.18rem", verticalAlign: "middle" }}>⚠️</span>
                  <button type="button"
                    onClick={() => setModal("contract")}
                    style={{
                      color: "#fc908d", background: "transparent", border: "none", cursor: "pointer", textDecoration: "underline", fontWeight: 500, fontSize: "1.03rem"
                    }}
                  >See Legal Red Flags</button>
                </span>
              )}
            </div>
          </div>
        )}
        {tab === "tips" && (
          <div>
            <div style={{ color: "#ffd155", fontWeight: 600, marginBottom: 4 }}>Tips to Reduce Risk</div>
            <ul style={{
              color: "#e0e7ff",
              fontSize: "1.09rem",
              listStyle: "inside disc",
              margin: 0,
              padding: 0
            }}>
              {cyber.tier === "High" && <li>Strengthen passwords and use 2FA for all major accounts.</li>}
              {cyber.redFlags?.includes("Weak password habits") && <li>Use long, unique passphrases for each login.</li>}
              {cyber.redFlags?.includes("Phishing risk behavior") && <li>Double-check URLs in emails, and don't click suspicious attachments or links.</li>}
              {cyber.redFlags?.includes("Neglects device updates") && <li>Enable automatic updates for OS and apps.</li>}
              {contract.tier === "High" && <li>Consult a legal advisor on indemnification or unlimited liability sections.</li>}
              {contract.redFlags?.includes("Indemnification") && <li>Seek to negotiate or cap indemnification obligations.</li>}
              {contract.redFlags?.includes("Exclusivity Clause") && <li>Be wary of restrictive exclusivity; ask for clear end dates or carve-outs.</li>}
              {!cyber.redFlags?.length && !contract.redFlags?.length && <li>Your digital and legal risk profile is healthy!</li>}
            </ul>
          </div>
        )}
        {tab === "action" && (
          <div>
            <div style={{ color: "#6ae58b", fontWeight: 600, marginBottom: 8 }}>Personalized Action Checklist</div>
            <ul style={{
              margin: 0,
              padding: 0,
              listStyle: "none"
            }}>
              {actionItems.map(item => (
                <li
                  key={item.key}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 10,
                    color: item.legal ? "#fbbf24" : "#3afcc9"
                  }}
                >
                  <input
                    type="checkbox"
                    checked={checked[item.key]}
                    id={item.key}
                    onChange={() => handleCheck(item.key)}
                    style={{
                      accentColor: item.legal ? "#fbbf24" : "#37c8e8",
                      width: 18,
                      height: 18,
                      marginRight: 5
                    }}
                  />
                  <label htmlFor={item.key} style={{
                    cursor: "pointer",
                    fontWeight: 500,
                    textDecoration: checked[item.key] ? "line-through" : "none",
                    opacity: checked[item.key] ? 0.6 : 1
                  }}>
                    {item.title}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
        <button className="btn" onClick={onBack} style={{ minWidth: 99 }}>Back</button>
        <button className="btn btn-large" style={{
          background: "linear-gradient(90deg,#2563eb 10%,#fbbf24 110%)",
          color: "#fff", fontWeight: 700, minWidth: 145
        }} onClick={onNext}>View Action Plan</button>
      </div>
      {/* Red Flag Modal - Cyber/Legal */}
      {modal && (
        <div className="dashboard-modal-overlay" style={{
          position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
          background: "rgba(10,28,36,0.77)", zIndex: 99, display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <div className="dashboard-modal" style={{
            background: "#1a1e2d",
            borderRadius: 12,
            padding: "34px 32px 26px 32px",
            minWidth: 320,
            boxShadow: "0 4px 40px 0 #1766c866",
            maxWidth: 430,
            color: "#fc908d"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span role="img" aria-label="alert" style={{ fontSize: "2rem" }}>⚠️</span>
              <span style={{ fontWeight: 600, fontSize: "1.2rem" }}>
                {modal === "cyber" ? "Digital Hygiene Red Flags" : "Contractual Red Flags"}
              </span>
            </div>
            <ul style={{ fontSize: "1.09rem", margin: "19px 0 0" }}>
              {(modal === "cyber" ? cyber.redFlags : contract.redFlags).map(flag =>
                <li key={flag} style={{
                  marginBottom: 7, color: "#ffdfba", fontWeight: 500
                }}>{flag}</li>
              )}
            </ul>
            <button
              className="btn"
              onClick={() => setModal(null)}
              style={{
                marginTop: 18,
                width: "100%",
                background: "linear-gradient(90deg,#fc908d 20%,#fbbf24 110%)",
                color: "#fff", fontWeight: 600
              }}
            >Close</button>
          </div>
        </div>
      )}
      {/* Modular stub - can be enhanced */}
      <RecommendationTabs cyber={cyber} contract={contract} />
    </div>
  );
}

export default ResultsDashboard;
