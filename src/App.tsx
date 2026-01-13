/**
 * Main App Component - D&D CONVEYOR
 */

import { useState, useCallback, useEffect } from 'react'
import { CommunicationMode, GesturePrediction, ISLGesture } from '@/types'
import { ModeSelector } from './components/ModeSelector'
import { CameraView } from './components/CameraView'
import { SignVisualizer } from './components/SignVisualizer'
import { CommunicationPanel } from './components/CommunicationPanel'
import { GestureRecognizer } from './core/gesture/GestureRecognizer'
import { Login } from './components/Login'
import { Dashboard } from './components/Dashboard'
import { Library } from './components/Library'
import { ISLToText } from './components/ISLToText'
import { TextToISL } from './components/TextToISL'
import './App.css'

function App() {
  // State to manage navigation between login, dashboard, library, ISL to Text, and Text to ISL
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'library' | 'isl-to-text' | 'text-to-isl'>('dashboard')
  const [mode, setMode] = useState<CommunicationMode>('isl-to-text')
  const [currentGesture, setCurrentGesture] = useState<GesturePrediction | null>(null)
  const [translationText, setTranslationText] = useState<string>('')
  const [gestureMap, setGestureMap] = useState<Map<string, ISLGesture>>(new Map())
  const [cameraError, setCameraError] = useState<string | null>(null)

  // Initialize gesture recognizer and build gesture map
  // Only initialize if logged in
  useEffect(() => {
    if (!isLoggedIn) {
      // Skip initialization when on login page
      return
    }
    
    try {
      const recognizer = new GestureRecognizer()
      recognizer.initialize().then(() => {
        try {
          const gestures = recognizer.getAllGestures()
          const map = new Map<string, ISLGesture>()
          gestures.forEach(gesture => {
            map.set(gesture.label, gesture)
          })
          setGestureMap(map)
        } catch (error) {
          console.warn('Error building gesture map:', error)
          setGestureMap(new Map())
        }
      }).catch((error) => {
        console.warn('Gesture recognizer initialization error:', error)
        setGestureMap(new Map())
      })
    } catch (error) {
      console.warn('Error creating gesture recognizer:', error)
      setGestureMap(new Map())
    }
  }, [isLoggedIn])

  const handleGestureDetected = useCallback((prediction: GesturePrediction) => {
    setCurrentGesture(prediction)
    setTranslationText(prediction.gesture.label)
  }, [])

  const handleTextInput = useCallback((text: string) => {
    setTranslationText(text)
  }, [])

  // Handle login - show dashboard after login
  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  // Handle logout - return to login
  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentPage('dashboard')
  }

  // Handle navigation to library
  const handleNavigateToLibrary = () => {
    setCurrentPage('library')
  }

  // Handle navigation back to dashboard
  const handleBackToDashboard = () => {
    setCurrentPage('dashboard')
  }

  // Handle navigation to ISL to Text
  const handleNavigateToISLToText = () => {
    setCurrentPage('isl-to-text')
  }

  // Handle navigation to Text to ISL
  const handleNavigateToTextToISL = () => {
    setCurrentPage('text-to-isl')
  }

  // Show dashboard, library, ISL to Text, or Text to ISL if logged in, otherwise show login
  if (isLoggedIn) {
    if (currentPage === 'library') {
      return <Library onBack={handleBackToDashboard} />
    }
    if (currentPage === 'isl-to-text') {
      return <ISLToText onBack={handleBackToDashboard} />
    }
    if (currentPage === 'text-to-isl') {
      return <TextToISL onBack={handleBackToDashboard} />
    }
    return <Dashboard 
      onLogout={handleLogout} 
      onNavigateToLibrary={handleNavigateToLibrary}
      onNavigateToISLToText={handleNavigateToISLToText}
      onNavigateToTextToISL={handleNavigateToTextToISL}
    />
  }

  // Show login page
  try {
    return <Login onLogin={handleLogin} />
  } catch (error) {
    console.error('Error rendering Login:', error)
    // Fallback to simple login if error
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#0a0a1a',
        color: '#fff'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1>LinguoSign</h1>
          <p>Bridging Silence Through Signs</p>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">D&D CONVEYOR</h1>
        <p className="app-subtitle">
          Two-way communication bridge using Indian Sign Language (ISL)
        </p>
      </header>

      <main className="app-main">
        <ModeSelector currentMode={mode} onModeChange={setMode} />

        <div className="app-content">
          {mode === 'isl-to-text' && (
            <>
              <div className="camera-section">
                <CameraView
                  onGestureDetected={handleGestureDetected}
                  onError={setCameraError}
                />
                {cameraError && (
                  <div className="error-message">
                    {cameraError}
                  </div>
                )}
              </div>
              <CommunicationPanel
                mode={mode}
                onGestureDetected={handleGestureDetected}
                detectedGesture={currentGesture}
              />
            </>
          )}

          {(mode === 'text-to-isl' || mode === 'voice-to-isl') && (
            <>
              <CommunicationPanel
                mode={mode}
                onTextInput={handleTextInput}
              />
              <div className="visualization-section">
                <SignVisualizer
                  text={translationText}
                  gestureMap={gestureMap}
                />
              </div>
            </>
          )}
        </div>
      </main>

      <footer className="app-footer">
        <p>D&D CONVEYOR - Making communication accessible for everyone</p>
      </footer>
    </div>
  )
}

export default App
