/**
 * Core type definitions for D&D CONVEYOR
 */

export interface HandLandmark {
  x: number
  y: number
  z: number
}

export interface HandLandmarks {
  landmarks: HandLandmark[]
  handedness: 'Left' | 'Right'
}

export interface ISLGesture {
  id: string
  label: string
  description?: string
}

export interface GesturePrediction {
  gesture: ISLGesture
  confidence: number
  timestamp: number
}

export interface CameraState {
  isActive: boolean
  hasPermission: boolean
  error: string | null
  stream: MediaStream | null
}

export interface SpeechState {
  isListening: boolean
  isSpeaking: boolean
  transcript: string
  error: string | null
}

export type CommunicationMode = 'isl-to-text' | 'text-to-isl' | 'voice-to-isl'

export interface AppState {
  mode: CommunicationMode
  cameraState: CameraState
  speechState: SpeechState
  currentGesture: GesturePrediction | null
  translationHistory: TranslationEntry[]
}

export interface TranslationEntry {
  id: string
  timestamp: number
  from: string
  to: string
  mode: CommunicationMode
}
