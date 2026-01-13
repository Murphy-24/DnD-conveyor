/**
 * Main App Component - D&D CONVEYOR
 */

import React, { useState, useCallback, useEffect, ErrorInfo } from 'react'
import { CommunicationMode, GesturePrediction, ISLGesture } from '@/types'
import { ModeSelector } from './components/ModeSelector'
import { CameraView } from './components/CameraView'
import { SignVisualizer } from './components/SignVisualizer'
import { CommunicationPanel } from './components/CommunicationPanel'
import { GestureRecognizer } from './core/gesture/GestureRecognizer'
import { Login } from './components/Login'
import './App.css'

// Simple error handler - always show login

function App() {
  // Always show login page - no toggle needed
  const [showLogin] = useState(true)
  const [mode, setMode] = useState<CommunicationMode>('isl-to-text')
  const [currentGesture, setCurrentGesture] = useState<GesturePrediction | null>(null)
  const [translationText, setTranslationText] = useState<string>('')
  const [gestureMap, setGestureMap] = useState<Map<string, ISLGesture>>(new Map())
  const [cameraError, setCameraError] = useState<string | null>(null)

  // Initialize gesture recognizer and build gesture map
  // Only initialize if not showing login page
  useEffect(() => {
    if (showLogin) {
      // Skip initialization when showing login page
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
  }, [showLogin])

  const handleGestureDetected = useCallback((prediction: GesturePrediction) => {
    setCurrentGesture(prediction)
    setTranslationText(prediction.gesture.label)
  }, [])

  const handleTextInput = useCallback((text: string) => {
    setTranslationText(text)
  }, [])

  // Always show login page
  try {
    if (showLogin) {
      return <Login />
    }
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
