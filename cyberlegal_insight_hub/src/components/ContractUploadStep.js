import React, { useRef } from 'react';

/**
 * ContractUploadStep provides an interface for users to:
 * - Paste or upload contract/legal text
 * - See privacy notice (local-only, secure)
 * - Supports text area and optional file upload (TXT, PDF as disabled for MVP)
 * 
 * Props:
 *   value: current contract text
 *   onChange(value): called when text is pasted/changed
 *   onAnalyze(): proceed action (e.g., triggers parent to analyze contract)
 *   onBack(): go to previous step
 *   uploading?: boolean (optional)
 */
// PUBLIC_INTERFACE
function ContractUploadStep({ value, onChange, onAnalyze, onBack, uploading }) {
  const fileInputRef = useRef();

  // Only TXT files allowed in MVP; PDF parsing requires further infra
  function handleFileSelect(e) {
    const file = e.target.files?.[0];
    if (file && file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = () => {
        onChange(reader.result || "");
      };
      reader.readAsText(file);
    } else {
      alert("Only plain text (.txt) files supported at this time.");
      e.target.value = '';
    }
  }

  return (
    <div className="contract-upload-card container" style={{ paddingTop: 80, maxWidth: 540 }}>
      <h2 className="title contract-upload-title" style={{ fontSize: '2rem', marginBottom: 10 }}>Analyze a Contract or Legal Text</h2>
      <div className="description contract-upload-desc" style={{ marginBottom: 16 }}>
        Paste or upload your contract for <span style={{ color: "#32ddcf" }}>instant, <b>local</b> AI-powered analysis</span>.<br />
        <span className="privacy-indicator" style={{
          display: 'inline-block', marginTop: 6, color: "#56e2ff", fontSize: "0.97rem", fontWeight: 500
        }}>
          <span role="img" aria-label="Lock" style={{marginRight: 2}}>🔒</span>
          <span>Your contract stays private—nothing leaves your browser.</span>
        </span>
      </div>
      
      <textarea
        rows={7}
        className="contract-textarea"
        style={{
          width: '100%',
          resize: 'vertical',
          fontFamily: 'inherit',
          padding: 13,
          fontSize: '1.025rem',
          marginBottom: 16,
          borderRadius: 5,
          border: '1.3px solid #e3eeff',
          minHeight: 120,
          background: '#f8fafc',
          color: '#1a236b',
        }}
        placeholder="Paste your contract or legal agreement text here..."
        value={value}
        onChange={e => onChange(e.target.value)}
        spellCheck="false"
      />

      <div className="contract-upload-actions" style={{
        display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8
      }}>
        <button
          className="btn"
          type="button"
          onClick={onBack}
          style={{ minWidth: 90, borderRadius: 4 }}
        >Back</button>

        <button
          className="btn btn-large"
          type="button"
          style={{
            background: "linear-gradient(90deg,#2563eb 10%,#fbbf24 110%)",
            color: "#fff",
            fontWeight: 600,
            minWidth: 115,
            borderRadius: 4
          }}
          disabled={uploading || !value.trim()}
          onClick={onAnalyze}
        >{uploading ? "Analyzing…" : "Analyze"}</button>

        <button
          type="button"
          className="btn"
          style={{
            background: "#e6f3fa",
            color: "#2266a9",
            border: "none",
            fontWeight: 500,
            borderRadius: 4,
            fontSize: '0.97rem',
            padding: "10px 14px"
          }}
          onClick={() => fileInputRef.current?.click()}
        >Upload .txt</button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".txt"
          style={{ display: "none" }}
          onChange={handleFileSelect}
        />
      </div>
      <div className="contract-upload-note" style={{
        color: "#7fa1c7", fontSize: "0.97rem", marginTop: 6
      }}>
        Supported: plain text (<b>.txt</b>). PDF coming soon.
      </div>
      <div className="contract-upload-privacycopy" style={{
        color: "#2cdaaf", fontSize: "0.96rem", marginTop: 14, lineHeight: 1.45, textAlign: "left"
      }}>
        <b>Privacy Promise:</b> Your contract is analyzed <u>locally</u> with Kavia AI. We never store or transmit your data.
      </div>
    </div>
  );
}

export default ContractUploadStep;
