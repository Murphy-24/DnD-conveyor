/**
 * CameraView - Component for displaying camera feed and hand tracking
 */

import { useEffect, useRef } from 'react'
import { CameraManager } from '@/core/camera/CameraManager'
import { HandTracker } from '@/core/gesture/HandTracker'
import { GestureRecognizer } from '@/core/gesture/GestureRecognizer'
import { GesturePrediction } from '@/types'
import './CameraView.css'

interface CameraViewProps {
  onGestureDetected?: (prediction: GesturePrediction) => void
  onError?: (error: string) => void
}

export const CameraView = ({ onGestureDetected, onError }: CameraViewProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cameraManagerRef = useRef<CameraManager | null>(null)
  const handTrackerRef = useRef<HandTracker | null>(null)
  const gestureRecognizerRef = useRef<GestureRecognizer | null>(null)

  useEffect(() => {
    // Initialize gesture recognizer
    const recognizer = new GestureRecognizer()
    recognizer.initialize().then(() => {
      gestureRecognizerRef.current = recognizer
      
      // Initialize hand tracker
      if (videoRef.current && canvasRef.current) {
        const tracker = new HandTracker(recognizer)
        tracker.initialize(videoRef.current, canvasRef.current).then(() => {
          handTrackerRef.current = tracker
          
          if (onGestureDetected) {
            tracker.onGesture(onGestureDetected)
          }
        }).catch((error) => {
          if (onError) {
            onError(error.message)
          }
        })
      }
    }).catch((error) => {
      if (onError) {
        onError(error.message)
      }
    })

    // Initialize camera
    const cameraManager = new CameraManager()
    cameraManagerRef.current = cameraManager

    if (videoRef.current) {
      cameraManager
        .initialize(videoRef.current)
        .then(() => {
          cameraManager.onFrame(async (video) => {
            if (handTrackerRef.current) {
              await handTrackerRef.current.processFrame(video)
            }
          })
        })
        .catch((error) => {
          if (onError) {
            onError(error.message)
          }
        })
    }

    return () => {
      cameraManager.stop()
      if (handTrackerRef.current) {
        handTrackerRef.current.dispose()
      }
    }
  }, [onGestureDetected, onError])

  return (
    <div className="camera-view">
      <video
        ref={videoRef}
        className="camera-video"
        autoPlay
        playsInline
        muted
      />
      <canvas
        ref={canvasRef}
        className="camera-canvas"
      />
      <div className="camera-overlay">
        <div className="gesture-detection-area" />
      </div>
    </div>
  )
}
