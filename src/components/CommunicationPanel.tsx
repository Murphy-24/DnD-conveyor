/**
 * CommunicationPanel - Main communication interface component
 */

import { useState, useEffect, useRef } from 'react'
import { CommunicationMode, GesturePrediction, ISLGesture } from '@/types'
import { SpeechManager } from '@/core/speech/SpeechManager'
import { GestureRecognizer } from '@/core/gesture/GestureRecognizer'
import './CommunicationPanel.css'

interface CommunicationPanelProps {
  mode: CommunicationMode
  onGestureDetected?: (prediction: GesturePrediction) => void
  onTextInput?: (text: string) => void
  detectedGesture?: GesturePrediction | null
}

export const CommunicationPanel = ({
  mode,
  onGestureDetected,
  onTextInput,
  detectedGesture
}: CommunicationPanelProps) => {
  const [textInput, setTextInput] = useState('')
  const [transcript, setTranscript] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  
  const speechManagerRef = useRef<SpeechManager | null>(null)
  const gestureRecognizerRef = useRef<GestureRecognizer | null>(null)

  // Update transcript when gesture is detected
  useEffect(() => {
    if (detectedGesture && mode === 'isl-to-text') {
      setTranscript(detectedGesture.gesture.label)
      if (speechManagerRef.current) {
        speechManagerRef.current.speak(detectedGesture.gesture.label)
        setIsSpeaking(true)
        setTimeout(() => setIsSpeaking(false), 1000)
      }
    }
  }, [detectedGesture, mode])

  useEffect(() => {
    // Initialize speech manager
    speechManagerRef.current = new SpeechManager()
    speechManagerRef.current.onTranscript((text) => {
      setTranscript(text)
      if (onTextInput) {
        onTextInput(text)
      }
    })

    // Initialize gesture recognizer
    const recognizer = new GestureRecognizer()
    recognizer.initialize().then(() => {
      gestureRecognizerRef.current = recognizer
    })

    return () => {
      if (speechManagerRef.current) {
        speechManagerRef.current.stopListening()
        speechManagerRef.current.stopSpeaking()
      }
    }
  }, [onTextInput])

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value)
  }

  const handleTextSubmit = () => {
    if (textInput.trim() && speechManagerRef.current) {
      speechManagerRef.current.speak(textInput)
      setIsSpeaking(true)
      
      setTimeout(() => {
        setIsSpeaking(false)
      }, textInput.length * 100) // Rough estimate
    }
  }

  const handleVoiceInput = () => {
    if (!speechManagerRef.current) return

    if (isListening) {
      speechManagerRef.current.stopListening()
      setIsListening(false)
    } else {
      speechManagerRef.current.startListening()
      setIsListening(true)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTextSubmit()
    }
  }

  return (
    <div className="communication-panel">
      {mode === 'isl-to-text' && (
        <div className="output-section">
          <h3>Detected Gesture</h3>
          <div className="output-display">
            <p className="output-text">
              {transcript || 'Waiting for gesture...'}
            </p>
          </div>
        </div>
      )}

      {(mode === 'text-to-isl' || mode === 'voice-to-isl') && (
        <div className="input-section">
          <h3>Enter Text or Speak</h3>
          <div className="input-group">
            <input
              type="text"
              className="text-input"
              placeholder="Type your message..."
              value={textInput}
              onChange={handleTextChange}
              onKeyPress={handleKeyPress}
            />
            <button
              className="submit-button"
              onClick={handleTextSubmit}
              disabled={!textInput.trim() || isSpeaking}
            >
              {isSpeaking ? 'Speaking...' : 'Speak'}
            </button>
          </div>
          
          <div className="voice-input-group">
            <button
              className={`voice-button ${isListening ? 'listening' : ''}`}
              onClick={handleVoiceInput}
              disabled={!speechManagerRef.current?.isRecognitionAvailable()}
            >
              {isListening ? '🛑 Stop Listening' : '🎤 Start Voice Input'}
            </button>
            {transcript && (
              <div className="transcript-display">
                <p>{transcript}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
