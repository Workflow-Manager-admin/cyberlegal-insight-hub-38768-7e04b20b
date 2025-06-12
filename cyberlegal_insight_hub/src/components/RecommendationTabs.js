import React, { useState } from "react";
import { getRecommendations } from "../utils/recommendations";

// PUBLIC_INTERFACE
/**
 * RecommendationTabs component:
 * - Shows AI/GPT-like personalized suggestions and explanations
 * - Tabs for Digital, Legal, and Ask AI (sample conversational Q&A)
 * - Explanations expand/collapse for detail; Q&A expandable for answers
 *
 * Props:
 *   cyber: object (cyber quiz analysis)
 *   contract: object (contract risk analysis)
 */
function RecommendationTabs({ cyber, contract }) {
  const [tab, setTab] = useState("digital"); // digital | legal | qna

  // Get personalized recs
  const { digital, legal, qna } = getRecommendations(cyber, contract);

  // Expand/collapse state for explanations and Q&A
  const [expanded, setExpanded] = useState({}); // {key: bool} for sections/Qs

  function toggleExpand(key) {
    setExpanded((s) => ({ ...s, [key]: !s[key] }));
  }

  const tabList = [
    { key: "digital", label: "Digital Safety" },
    { key: "legal", label: "Legal Awareness" },
    { key: "qna", label: "Ask AI" }
  ];

  return (
    <div
      className="recommendation-tabs"
      style={{
        marginTop: 22,
        background: "#181c2b",
        borderRadius: 12,
        boxShadow: "0 4px 22px #2360cd13",
        padding: "28px 22px 22px 22px",
        maxWidth: 670,
        marginLeft: "auto",
        marginRight: "auto"
      }}
      aria-label="Personalized Recommendations and Education Center"
    >
      <div
        style={{
          display: "flex",
          gap: 1,
          borderBottom: "2px solid #2a303d",
          marginBottom: 7
        }}
      >
        {tabList.map((t) => (
          <button
            key={t.key}
            type="button"
            className={`btn dashboard-tab-btn${tab === t.key ? " selected" : ""}`}
            aria-selected={tab === t.key}
            onClick={() => setTab(t.key)}
            style={{
              background: tab === t.key
                ? "linear-gradient(90deg,#2563eb 24%,#fbbf24 77%)"
                : "#252932",
              color: tab === t.key ? "#fff" : "#98e3f9",
              fontWeight: tab === t.key ? 700 : 500,
              border: "none",
              borderRadius: "5px 5px 0 0",
              fontSize: "1.1rem",
              padding: "8px 24px 9px 24px",
              boxShadow: tab === t.key ? "0 2.5px 16px #0058" : "none",
              marginBottom: "-2px",
              cursor: "pointer",
              transition: "background 0.23s"
            }}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div
        className="recommendation-tabpanel"
        style={{
          background: "#1d2132",
          borderRadius: "0 0 12px 12px",
          minHeight: 100,
          fontSize: "1.06rem",
          padding: "18px 9px 2px 9px"
        }}
      >
        {/* Digital Safety Tab */}
        {tab === "digital" && (
          <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {digital.map((rec, idx) => (
              <li
                key={`digital-${rec.title}`}
                style={{
                  marginBottom: 13,
                  color: "#4fedca",
                  borderBottom: "1.5px solid #233566",
                  paddingBottom: 9
                }}
              >
                <div style={{ fontWeight: 600, fontSize: "1.13rem", display: "flex", alignItems: "center" }}>
                  <span role="img" aria-label="lightbulb" style={{fontSize:"1.2rem",marginRight:6}}>💡</span>
                  {rec.title}
                  <button
                    type="button"
                    aria-label={expanded[rec.title] ? "Collapse explanation" : "Expand explanation"}
                    onClick={() => toggleExpand(rec.title)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#ffb951",
                      fontWeight: 500,
                      marginLeft: 5,
                      fontSize: "1.05rem",
                      cursor: "pointer",
                      outline: "none"
                    }}
                  >
                    {expanded[rec.title] ? "–" : "+"}
                  </button>
                </div>
                {expanded[rec.title] && (
                  <div style={{ marginTop: 7, color: "#9ae8ff" }}>
                    {rec.explanation}
                  </div>
                )}
              </li>
            ))}
            {digital.length === 0 && (
              <li style={{ color: "#a0fed0", textAlign: "center", fontWeight: 500 }}>No major digital hygiene risks detected.</li>
            )}
          </ul>
        )}
        {/* Legal Awareness Tab */}
        {tab === "legal" && (
          <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {legal.map((rec, idx) => (
              <li
                key={`legal-${rec.title}`}
                style={{
                  marginBottom: 13,
                  color: "#ffee88",
                  borderBottom: "1.5px solid #46404a",
                  paddingBottom: 9
                }}
              >
                <div style={{ fontWeight: 600, fontSize: "1.12rem", display: "flex", alignItems: "center" }}>
                  <span role="img" aria-label="book" style={{fontSize: "1.14rem",marginRight: 7}}>📄</span>
                  {rec.title}
                  <button
                    type="button"
                    aria-label={expanded[rec.title] ? "Collapse explanation" : "Expand explanation"}
                    onClick={() => toggleExpand(rec.title)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#fd7",
                      fontWeight: 500,
                      marginLeft: 5,
                      fontSize: "1.05rem",
                      cursor: "pointer",
                      outline: "none"
                    }}
                  >
                    {expanded[rec.title] ? "–" : "+"}
                  </button>
                </div>
                {expanded[rec.title] && (
                  <div style={{ marginTop: 7, color: "#ffe9ad" }}>
                    {rec.explanation}
                  </div>
                )}
              </li>
            ))}
            {legal.length === 0 && (
              <li style={{ color: "#ffeaaa", textAlign: "center", fontWeight: 500 }}>No major contract risks detected.</li>
            )}
          </ul>
        )}
        {/* Ask AI/Q&A Tab */}
        {tab === "qna" && (
          <ul style={{ padding: 0, listStyle: "none", margin: 0 }}>
            {qna.map((pair, idx) => (
              <li
                key={`qna-${idx}`}
                style={{
                  background: "#23243a",
                  marginBottom: 11,
                  borderRadius: 5,
                  padding: "13px 17px 9px 13px",
                  boxShadow: "0 2px 6px #192e3d11"
                }}
              >
                <div style={{ fontWeight: 600, color: "#7beeec", fontSize: "1.07rem", marginBottom: 3, display: "flex", alignItems: "center" }}>
                  <span role="img" aria-label="question" style={{fontSize:"1.13rem",marginRight:7}}>🤖</span>
                  {pair.q}
                  <button
                    type="button"
                    aria-label={expanded[`qna-${idx}`] ? "Collapse answer" : "Expand answer"}
                    onClick={() => toggleExpand(`qna-${idx}`)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#8ff",
                      fontWeight: 500,
                      marginLeft: 7,
                      fontSize: "1.02rem",
                      cursor: "pointer",
                      outline: "none"
                    }}
                  >
                    {expanded[`qna-${idx}`] ? "–" : "+"}
                  </button>
                </div>
                {expanded[`qna-${idx}`] && (
                  <div style={{ color: "#a9f5c0", marginTop: 5 }}>
                    {pair.a}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div style={{ textAlign: "right", marginTop: 7 }}>
        <span style={{ color: "#ffe299", fontSize: "0.98rem", fontWeight: 500, opacity: 0.72 }}>
          Powered by Kavia AI · Personalized Education Center
        </span>
      </div>
    </div>
  );
}

export default RecommendationTabs;
