/**
 * Application constants
 */

export const APP_NAME = 'D&D CONVEYOR'

export const COMMUNICATION_MODES = {
  ISL_TO_TEXT: 'isl-to-text',
  TEXT_TO_ISL: 'text-to-isl',
  VOICE_TO_ISL: 'voice-to-isl'
} as const

export const GESTURE_CONFIDENCE_THRESHOLD = 0.7

export const FRAME_PROCESSING_INTERVAL = 100 // ms (10fps for gesture recognition)

export const GESTURE_DISPLAY_DURATION = 1000 // ms

export const SPEECH_OPTIONS = {
  rate: 1.0,
  pitch: 1.0,
  volume: 1.0,
  lang: 'en-IN'
} as const

export const CAMERA_CONSTRAINTS = {
  video: {
    width: { ideal: 1280 },
    height: { ideal: 720 },
    facingMode: 'user' as const
  }
} as const

export const MEDIAPIPE_CONFIG = {
  maxNumHands: 2,
  modelComplexity: 1,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
} as const
