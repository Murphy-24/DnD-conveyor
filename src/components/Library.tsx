/**
 * Library - Sign Language Library Page
 */

import { useState } from 'react'
import './Library.css'

interface LibraryProps {
  onBack?: () => void
}

export const Library = ({ onBack }: LibraryProps) => {
  const [activeTab, setActiveTab] = useState<'alphabets' | 'numbers' | 'phrases'>('alphabets')

  return (
    <div className="library-container">
      {/* Background with same style as login */}
      <div className="library-background">
        <div className="library-background-overlay"></div>
      </div>

      {/* Header */}
      <header className="library-header">
        <div className="library-header-content">
          <div className="library-logo">
            <h1 className="library-logo-text">LinguoSign</h1>
            <p className="library-tagline">Bridging Silence Through Signs</p>
          </div>
          <button className="back-button" onClick={onBack}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span>Back to Dashboard</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="library-main">
        <div className="library-content-wrapper">
          <h2 className="library-page-title">Sign Language Library</h2>
          <p className="library-page-subtitle">Explore alphabets, numbers, and common phrases in Indian Sign Language</p>
          
          {/* Library Tabs */}
          <div className="library-tabs">
            <button 
              className={`library-tab ${activeTab === 'alphabets' ? 'active' : ''}`}
              onClick={() => setActiveTab('alphabets')}
            >
              <span className="tab-icon">🔤</span>
              <span>Alphabets</span>
            </button>
            <button 
              className={`library-tab ${activeTab === 'numbers' ? 'active' : ''}`}
              onClick={() => setActiveTab('numbers')}
            >
              <span className="tab-icon">🔢</span>
              <span>Numbers</span>
            </button>
            <button 
              className={`library-tab ${activeTab === 'phrases' ? 'active' : ''}`}
              onClick={() => setActiveTab('phrases')}
            >
              <span className="tab-icon">💬</span>
              <span>Common Phrases</span>
            </button>
          </div>

          {/* Library Content */}
          <div className="library-content">
            {/* Alphabets Tab */}
            {activeTab === 'alphabets' && (
              <div className="library-grid">
                {Array.from({ length: 26 }, (_, i) => {
                  const letter = String.fromCharCode(65 + i) // A-Z
                  return (
                    <div key={letter} className="sign-card">
                      <div className="sign-image-placeholder">
                        <span className="sign-letter">{letter}</span>
                      </div>
                      <div className="sign-label">{letter}</div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Numbers Tab */}
            {activeTab === 'numbers' && (
              <div className="library-grid">
                {Array.from({ length: 10 }, (_, i) => {
                  const number = i.toString()
                  return (
                    <div key={number} className="sign-card">
                      <div className="sign-image-placeholder">
                        <span className="sign-number">{number}</span>
                      </div>
                      <div className="sign-label">{number}</div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Common Phrases Tab */}
            {activeTab === 'phrases' && (
              <div className="library-grid phrases-grid">
                {[
                  'Hello',
                  'Thank You',
                  'Please',
                  'Sorry',
                  'Yes',
                  'No',
                  'Good Morning',
                  'Good Night',
                  'How are you?',
                  'I love you',
                  'Help me',
                  'Water',
                  'Food',
                  'Bathroom',
                  'Goodbye'
                ].map((phrase) => (
                  <div key={phrase} className="sign-card phrase-card">
                    <div className="sign-image-placeholder phrase-placeholder">
                      <span className="sign-phrase-icon">👋</span>
                    </div>
                    <div className="sign-label phrase-label">{phrase}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
