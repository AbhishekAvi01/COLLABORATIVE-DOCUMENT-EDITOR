import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';
import { FileText, Plus, Users, Zap, Share2, Save, ArrowRight } from 'lucide-react';

export default function Home() {
  const [docId, setDocId] = useState('');
  const navigate = useNavigate();

  const createNewDoc = () => {
    navigate(`/documents/${uuidV4()}`);
  };

  const joinDoc = (e) => {
    e.preventDefault();
    if (docId.trim()) {
      navigate(`/documents/${docId}`);
    }
  };

  return (
    <div className="landing-page">

      <nav className="landing-nav">
        <div className="logo-container">
          <FileText size={32} className="logo-icon" />
          <span className="app-name">LiveDocs</span>
        </div>
      </nav>


      <header className="hero-section fade-in">
        <div className="hero-content">
          <h1 className="hero-title">REAL-TIME COLLABORATIVE DOCUMENT EDITOR</h1>
          <p className="hero-description">
            A real-time collaborative document editor where multiple users can edit and share documents instantly. No sign-up required.
          </p>

          <div className="hero-actions">
            <button onClick={createNewDoc} className="btn-primary hero-btn">
              <Plus size={20} /> Create Document
            </button>
            <div className="join-wrapper">
              <form onSubmit={joinDoc} className="join-inline-form">
                <input
                  type="text"
                  placeholder="Enter Document ID"
                  value={docId}
                  onChange={(e) => setDocId(e.target.value)}
                  className="join-input"
                />
                <button type="submit" className="btn-secondary join-btn">
                  Join <ArrowRight size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>


      <section className="features-section fade-in-delay-1">
        <h2 className="section-title">Why choose LiveDocs?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrapper"><Users size={24} className="feature-icon" /></div>
            <h3>Real-time Editing</h3>
            <p>Edit documents live with others, seeing changes as they type.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper"><Zap size={24} className="feature-icon" /></div>
            <h3>Instant Sync</h3>
            <p>Changes appear instantly without needing to refresh the page.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper"><Share2 size={24} className="feature-icon" /></div>
            <h3>Share via Code</h3>
            <p>Simply join documents using a unique, secure document ID.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper"><Save size={24} className="feature-icon" /></div>
            <h3>Auto Save</h3>
            <p>Your work is saved automatically to the cloud as you type.</p>
          </div>
        </div>
      </section>


      <section className="how-it-works fade-in-delay-2">
        <h2 className="section-title">How it works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h4>Create or Join</h4>
            <p>Start a new document or enter an existing document ID.</p>
          </div>
          <div className="step-connector"></div>
          <div className="step">
            <div className="step-number">2</div>
            <h4>Share ID</h4>
            <p>Share the unique ID or URL link with your collaborators.</p>
          </div>
          <div className="step-connector"></div>
          <div className="step">
            <div className="step-number">3</div>
            <h4>Start Editing</h4>
            <p>Work together seamlessly in real-time from anywhere.</p>
          </div>
        </div>
      </section>

      <footer className="landing-footer fade-in-delay-2">
        <p>&copy; {new Date().getFullYear()} LiveDocs. Built for collaboration.</p>
      </footer>
    </div>
  );
}
