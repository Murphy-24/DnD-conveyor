/**
 * TextToISL - Text to ISL Conversion Page
 */

import { useState, useRef } from 'react'
import './TextToISL.css'

interface TextToISLProps {
  onBack?: () => void
}

export const TextToISL = ({ onBack }: TextToISLProps) => {
  const [inputText, setInputText] = useState<string>('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [recognizedWords, setRecognizedWords] = useState<string[]>([])
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  // Handle text input
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value)
  }

  // Process text to ISL
  const processTextToISL = async () => {
    if (!inputText.trim()) {
      alert('Please enter some text')
      return
    }

    setIsProcessing(true)
    
    // Simulate processing
    setTimeout(() => {
      const words = inputText.trim().split(/\s+/)
      setRecognizedWords(words)
      setIsProcessing(false)
    }, 1500)
  }

  // Clear input and results
  const handleClear = () => {
    setInputText('')
    setRecognizedWords([])
  }

  // Voice input using Web Speech API
  const startVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      const recognition = new SpeechRecognition()
      
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = 'en-US'

      recognition.onstart = () => {
        setIsListening(true)
      }

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript
        setInputText(prev => prev + (prev ? ' ' : '') + transcript)
        setIsListening(false)
      }

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error)
        setIsListening(false)
        alert('Speech recognition error. Please try again.')
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognitionRef.current = recognition
      recognition.start()
    } else {
      alert('Speech recognition is not supported in your browser')
    }
  }

  // Stop voice input
  const stopVoiceInput = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  return (
    <div className="text-to-isl-container">
      {/* Background */}
      <div className="text-isl-background">
        <div className="text-isl-background-overlay"></div>
      </div>

      {/* Header */}
      <header className="text-isl-header">
        <div className="text-isl-header-content">
          <div className="text-isl-logo">
            <h1 className="text-isl-logo-text">Text to ISL</h1>
            <p className="text-isl-subtitle">Convert Text to Indian Sign Language</p>
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
      <main className="text-isl-main">
        <div className="text-isl-content-wrapper">
          {/* Input Section */}
          <section className="text-isl-input-section">
            <div className="input-container-card">
              <h3 className="section-title">Text Input</h3>
              
              {/* Text Input Area */}
              <div className="text-input-wrapper">
                <textarea
                  className="text-input"
                  placeholder="Enter text to convert to Indian Sign Language..."
                  value={inputText}
                  onChange={handleTextChange}
                  rows={6}
                />
                <div className="input-footer">
                  <span className="character-count">{inputText.length} characters</span>
                </div>
              </div>

              {/* Input Controls */}
              <div className="input-controls">
                <div className="control-group">
                  <button
                    className={`voice-input-button ${isListening ? 'listening' : ''}`}
                    onClick={isListening ? stopVoiceInput : startVoiceInput}
                  >
                    {isListening ? (
                      <>
                        <div className="pulse-dot"></div>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="6" y="6" width="12" height="12" rx="2"/>
                        </svg>
                        <span>Stop Recording</span>
                      </>
                    ) : (
                      <>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                          <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                          <line x1="12" y1="19" x2="12" y2="23"/>
                          <line x1="8" y1="23" x2="16" y2="23"/>
                        </svg>
                        <span>Voice Input</span>
                      </>
                    )}
                  </button>

                  <button
                    className="clear-button"
                    onClick={handleClear}
                    disabled={!inputText && recognizedWords.length === 0}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"/>
                      <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                    <span>Clear</span>
                  </button>
                </div>

                <button
                  className="convert-button"
                  onClick={processTextToISL}
                  disabled={isProcessing || !inputText.trim()}
                >
                  {isProcessing ? (
                    <>
                      <div className="spinner"></div>
                      <span>Converting...</span>
                    </>
                  ) : (
                    <>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      <span>Convert to ISL</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </section>

          {/* ISL Visualization Section */}
          <section className="text-isl-visualization-section">
            <div className="visualization-card">
              <h3 className="section-title">Sign Language Visualization</h3>
              
              {recognizedWords.length > 0 ? (
                <div className="isl-visualization">
                  <div className="words-display">
                    {recognizedWords.map((word, index) => (
                      <div key={index} className="word-sign-card">
                        <div className="sign-display-area">
                          <div className="sign-placeholder">
                            <span className="sign-letter">{word.charAt(0).toUpperCase()}</span>
                          </div>
                        </div>
                        <div className="word-label">{word}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="full-text-display">
                    <div className="full-text-label">Full Text:</div>
                    <div className="full-text-content">{inputText}</div>
                  </div>
                </div>
              ) : (
                <div className="no-visualization">
                  <div className="no-visualization-icon">👋</div>
                  <p className="no-visualization-text">No visualization yet</p>
                  <p className="no-visualization-subtext">Enter text and click "Convert to ISL" to see sign language representation</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

// Extend Window interface for Speech Recognition
interface SpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  start(): void
  stop(): void
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null
  onend: ((this: SpeechRecognition, ev: Event) => any) | null
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult
  length: number
}

interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative
  length: number
  isFinal: boolean
}

interface SpeechRecognitionAlternative {
  transcript: string
  confidence: number
}

declare global {
  interface Window {
    webkitSpeechRecognition: {
      new (): SpeechRecognition
    }
    SpeechRecognition: {
      new (): SpeechRecognition
    }
  }
}
