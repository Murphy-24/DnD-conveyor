/**
 * SignVisualizer - Component for displaying sign language visualizations
 */

import { useEffect, useRef } from 'react'
import { SignVisualizer as SignVisualizerCore } from '@/core/visualization/SignVisualizer'
import { ISLGesture } from '@/types'
import './SignVisualizer.css'

interface SignVisualizerProps {
  gesture?: ISLGesture
  text?: string
  gestureMap?: Map<string, ISLGesture>
}

export const SignVisualizer = ({ gesture, text, gestureMap }: SignVisualizerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const visualizerRef = useRef<SignVisualizerCore | null>(null)

  useEffect(() => {
    if (canvasRef.current) {
      const visualizer = new SignVisualizerCore()
      visualizer.initialize(canvasRef.current)
      visualizerRef.current = visualizer
    }

    return () => {
      if (visualizerRef.current) {
        visualizerRef.current.clear()
      }
    }
  }, [])

  useEffect(() => {
    if (visualizerRef.current) {
      if (gesture) {
        visualizerRef.current.visualizeGesture(gesture)
      } else if (text && gestureMap) {
        visualizerRef.current.visualizeText(text, gestureMap)
      } else {
        visualizerRef.current.clear()
      }
    }
  }, [gesture, text, gestureMap])

  return (
    <div className="sign-visualizer">
      <canvas ref={canvasRef} className="sign-canvas" />
      {gesture && (
        <div className="gesture-label">
          <span className="gesture-text">{gesture.label}</span>
        </div>
      )}
    </div>
  )
}
