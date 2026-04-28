import React, { useState } from 'react';
import { FileText, Lock, Users, Trash2, Copy, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Topbar({ title, onTitleChange, isSaving, documentId }) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedId, setCopiedId] = useState(false);
  const navigate = useNavigate();

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(documentId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this document?")) {
      try {
        await fetch(`http://localhost:3001/documents/${documentId}`, {
          method: 'DELETE',
        });
        navigate('/');
      } catch (error) {
        console.error("Failed to delete document:", error);
        alert("Error deleting document.");
      }
    }
  };

  return (
    <div className="topbar">
      <div className="topbar-left">
        <div className="doc-icon">
          <FileText size={32} fill="#1a73e8" stroke="#ffffff" />
        </div>
        <div>
          <input
            type="text"
            className="doc-title-input"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Untitled Document"
          />
          <div className="saving-indicator">
            {isSaving ? "Saving..." : "Saved to cloud"}
          </div>
        </div>
      </div>
      
      <div className="topbar-center">
        <div className="doc-id-badge">
          <span className="doc-id-label">Doc ID:</span>
          <span className="doc-id-value">{documentId}</span>
          <button 
            className="copy-id-btn" 
            onClick={handleCopyId} 
            title="Copy ID"
          >
            {copiedId ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
            <span className="copy-tooltip">{copiedId ? "Copied!" : "Copy"}</span>
          </button>
        </div>
      </div>

      <div className="topbar-right">
        <button className="delete-btn" onClick={handleDelete}>
          <Trash2 size={18} />
          Delete
        </button>
        <button className="share-btn" onClick={handleShare}>
          {copiedLink ? <Check size={18} /> : <Share2Icon />}
          {copiedLink ? "Link Copied!" : "Share"}
        </button>
      </div>
    </div>
  );
}

// Just a local wrapper for Share icon to keep it clean
function Share2Icon() {
  return <Users size={18} />;
}
