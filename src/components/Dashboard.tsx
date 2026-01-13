/**
 * Dashboard - Main dashboard page after login
 */

import { useState } from 'react'
import './Dashboard.css'

interface DashboardProps {
  onLogout?: () => void
  onNavigateToLibrary?: () => void
  onNavigateToISLToText?: () => void
  onNavigateToTextToISL?: () => void
}

export const Dashboard = ({ onLogout, onNavigateToLibrary, onNavigateToISLToText, onNavigateToTextToISL }: DashboardProps) => {
  // Get user data from database (localStorage)
  const getUserData = () => {
    const userData = localStorage.getItem('dndconveyor_user')
    if (userData) {
      return JSON.parse(userData)
    }
    return { name: 'User', email: '' }
  }

  const userData = getUserData()

  const handleLogout = () => {
    // Clear user session
    localStorage.removeItem('dndconveyor_user')
    if (onLogout) {
      onLogout()
    }
  }

  return (
    <div className="dashboard-container">
      {/* Background with same style as login */}
      <div className="dashboard-background">
        <div className="dashboard-background-overlay"></div>
      </div>

      {/* Header */}
      <header className="dashboard-header">
        <div className="dashboard-header-content">
          <div className="dashboard-logo">
            <h1 className="dashboard-logo-text">LinguoSign</h1>
            <p className="dashboard-tagline">Bridging Silence Through Signs</p>
          </div>
          <div className="dashboard-user">
            <div className="user-info">
              <div className="user-avatar">
                <span>{userData.name ? userData.name.charAt(0).toUpperCase() : 'U'}</span>
              </div>
              <div className="user-details">
                <span className="user-name">{userData.name || 'User'}</span>
                <span className="user-email">{userData.email || ''}</span>
              </div>
            </div>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="dashboard-content">
          {/* Welcome Section */}
          <section className="dashboard-welcome">
            <div className="welcome-card">
              <h2 className="welcome-title">Welcome Back{userData.name ? `, ${userData.name}` : ''}!</h2>
              <p className="welcome-subtitle">Ready to bridge communication through sign language</p>
            </div>
          </section>

          {/* Quick Actions */}
          <section className="dashboard-actions">
            <h3 className="section-title">Quick Actions</h3>
            <div className="action-cards">
              <div className="action-card">
                <div className="action-icon">👋</div>
                <h4 className="action-title">ISL to Text</h4>
                <p className="action-description">Translate sign language to text and speech</p>
                <button className="action-button" onClick={onNavigateToISLToText}>Start</button>
              </div>
              <div className="action-card">
                <div className="action-icon">📝</div>
                <h4 className="action-title">Text to ISL</h4>
                <p className="action-description">Convert text or voice to sign language visualization</p>
                <button className="action-button" onClick={onNavigateToTextToISL}>Start</button>
              </div>
            </div>
          </section>

          {/* Library Button Section */}
          <section className="dashboard-library-section">
            <div className="library-button-card">
              <div className="library-button-content">
                <div className="library-button-icon">📚</div>
                <div className="library-button-text">
                  <h3 className="library-button-title">Sign Language Library</h3>
                  <p className="library-button-description">Explore alphabets, numbers, and common phrases in Indian Sign Language</p>
                </div>
                <button className="library-button" onClick={onNavigateToLibrary}>
                  Open Library
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>
          </section>

          {/* Recent Activity */}
          <section className="dashboard-activity">
            <h3 className="section-title">Recent Activity</h3>
            <div className="activity-card">
              <div className="activity-list">
                <div className="activity-item">
                  <div className="activity-icon">📊</div>
                  <div className="activity-content">
                    <p className="activity-text">No recent activity</p>
                    <span className="activity-time">Start using LinguoSign to see your activity here</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
