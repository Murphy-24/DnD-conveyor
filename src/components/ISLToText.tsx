/**
 * ISLToText - ISL to Text Conversion Page
 */

import { useState, useRef, useEffect } from 'react'
import './ISLToText.css'

interface ISLToTextProps {
  onBack?: () => void
}

export const ISLToText = ({ onBack }: ISLToTextProps) => {
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [recognizedText, setRecognizedText] = useState<string>('')
  const [uploadedVideo, setUploadedVideo] = useState<string | null>(null)
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Start camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        } 
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        setIsCameraActive(true)
      }
    } catch (error) {
      console.error('Error accessing camera:', error)
      alert('Unable to access camera. Please check permissions.')
    }
  }

  // Stop camera
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    setIsCameraActive(false)
  }

  // Handle video upload
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file)
      const videoURL = URL.createObjectURL(file)
      setUploadedVideo(videoURL)
      if (videoRef.current) {
        videoRef.current.src = videoURL
        videoRef.current.play()
      }
    } else {
      alert('Please upload a valid video file')
    }
  }

  // Process ISL (simulated - replace with actual ISL recognition)
  const processISL = async () => {
    setIsProcessing(true)
    
    // Simulate ISL recognition processing
    setTimeout(() => {
      // This is a placeholder - replace with actual ISL recognition logic
      const sampleText = "Hello, how are you?"
      setRecognizedText(sampleText)
      setIsProcessing(false)
      
      // Speak the recognized text
      speakText(sampleText)
    }, 2000)
  }

  // Text to Speech
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      // Stop any ongoing speech
      window.speechSynthesis.cancel()
      
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'en-US'
      utterance.rate = 0.9
      utterance.pitch = 1
      utterance.volume = 1
      
      window.speechSynthesis.speak(utterance)
    }
  }

  // Stop speech
  const stopSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera()
      if (uploadedVideo) {
        URL.revokeObjectURL(uploadedVideo)
      }
    }
  }, [uploadedVideo])

  return (
    <div className="isl-to-text-container">
      {/* Background */}
      <div className="isl-background">
        <div className="isl-background-overlay"></div>
      </div>

      {/* Header */}
      <header className="isl-header">
        <div className="isl-header-content">
          <div className="isl-logo">
            <h1 className="isl-logo-text">ISL to Text</h1>
            <p className="isl-subtitle">Convert Indian Sign Language to Text & Speech</p>
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
      <main className="isl-main">
        <div className="isl-content-wrapper">
          {/* Video Section */}
          <section className="isl-video-section">
            <div className="video-container-card">
              <h3 className="section-title">Video Input</h3>
              
              {/* Video Display */}
              <div className="video-display-wrapper">
                <video
                  ref={videoRef}
                  className="video-display"
                  autoPlay
                  playsInline
                  muted
                />
                {!isCameraActive && !uploadedVideo && (
                  <div className="video-placeholder">
                    <div className="placeholder-icon">📹</div>
                    <p className="placeholder-text">No video source</p>
                    <p className="placeholder-subtext">Start camera or upload a video</p>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="video-controls">
                <div className="control-group">
                  <button
                    className={`control-button ${isCameraActive ? 'active' : ''}`}
                    onClick={isCameraActive ? stopCamera : startCamera}
                  >
                    {isCameraActive ? (
                      <>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="6" y="6" width="12" height="12" rx="2"/>
                          <path d="M10 10v4M14 10v4"/>
                        </svg>
                        <span>Stop Camera</span>
                      </>
                    ) : (
                      <>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                          <circle cx="12" cy="13" r="4"/>
                        </svg>
                        <span>Start Camera</span>
                      </>
                    )}
                  </button>

                  <label className="upload-button">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoUpload}
                      style={{ display: 'none' }}
                    />
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="17 8 12 3 7 8"/>
                      <line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                    <span>Upload Video</span>
                  </label>
                </div>

                <button
                  className="process-button"
                  onClick={processISL}
                  disabled={isProcessing || (!isCameraActive && !uploadedVideo)}
                >
                  {isProcessing ? (
                    <>
                      <div className="spinner"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      <span>Recognize ISL</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </section>

          {/* Results Section */}
          <section className="isl-results-section">
            <div className="results-card">
              <h3 className="section-title">Recognition Results</h3>
              
              {recognizedText ? (
                <div className="results-content">
                  {/* Text Output */}
                  <div className="text-output">
                    <div className="output-label">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                        <line x1="16" y1="13" x2="8" y2="13"/>
                        <line x1="16" y1="17" x2="8" y2="17"/>
                        <polyline points="10 9 9 9 8 9"/>
                      </svg>
                      <span>Recognized Text</span>
                    </div>
                    <div className="text-content">{recognizedText}</div>
                  </div>

                  {/* Voice Output */}
                  <div className="voice-output">
                    <div className="output-label">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                        <line x1="12" y1="19" x2="12" y2="23"/>
                        <line x1="8" y1="23" x2="16" y2="23"/>
                      </svg>
                      <span>Voice Output</span>
                    </div>
                    <div className="voice-controls">
                      <button className="voice-button" onClick={() => speakText(recognizedText)}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
                        </svg>
                        <span>Play</span>
                      </button>
                      <button className="voice-button" onClick={stopSpeech}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="6" y="6" width="12" height="12" rx="2"/>
                        </svg>
                        <span>Stop</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="no-results">
                  <div className="no-results-icon">📝</div>
                  <p className="no-results-text">No recognition results yet</p>
                  <p className="no-results-subtext">Start camera or upload a video, then click "Recognize ISL"</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
