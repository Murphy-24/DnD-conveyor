/**
 * HandTracker - Integrates MediaPipe Hands with gesture recognition
 */

import { HandLandmarks, GesturePrediction } from '@/types'
import { GestureRecognizer } from './GestureRecognizer'

export class HandTracker {
  private hands: any = null
  private gestureRecognizer: GestureRecognizer
  private onGestureCallback: ((prediction: GesturePrediction) => void) | null = null
  private canvas: HTMLCanvasElement | null = null
  private ctx: CanvasRenderingContext2D | null = null

  constructor(gestureRecognizer: GestureRecognizer) {
    this.gestureRecognizer = gestureRecognizer
  }

  /**
   * Initialize MediaPipe Hands with callbacks
   */
  async initialize(videoElement: HTMLVideoElement, canvasElement: HTMLCanvasElement): Promise<void> {
    // MediaPipe imports commented out - add back when dependencies are available
    // const { Hands } = await import('@mediapipe/hands')
    // const { drawConnectors, drawLandmarks } = await import('@mediapipe/drawing_utils')
    // const { HAND_CONNECTIONS } = await import('@mediapipe/hands')

    this.canvas = canvasElement
    this.ctx = canvasElement.getContext('2d')

    // MediaPipe code commented out - will be enabled when dependencies are added
    // this.hands = new Hands({
    //   locateFile: (file: string) => {
    //     return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
    //   }
    // })

    // this.hands.setOptions({
    //   maxNumHands: 2,
    //   modelComplexity: 1,
    //   minDetectionConfidence: 0.5,
    //   minTrackingConfidence: 0.5
    // })

    // this.hands.onResults(async (results: any) => {
    //   if (this.ctx && this.canvas) {
    //     this.ctx.save()
    //     this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    //     this.ctx.drawImage(results.image, 0, 0, this.canvas.width, this.canvas.height)

    //     if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
    //       // Draw hand landmarks
    //       for (const landmarks of results.multiHandLandmarks) {
    //         drawConnectors(this.ctx, landmarks, HAND_CONNECTIONS, {
    //           color: '#00FF00',
    //           lineWidth: 2
    //         })
    //         drawLandmarks(this.ctx, landmarks, {
    //           color: '#FF0000',
    //           lineWidth: 1,
    //           radius: 3
    //         })

    //         // Convert to our format and recognize gesture
    //         const handLandmarks: HandLandmarks = {
    //           landmarks: landmarks.map((lm: any) => ({
    //             x: lm.x,
    //             y: lm.y,
    //             z: lm.z
    //           })),
    //           handedness: results.multiHandedness?.[0]?.displayName || 'Right'
    //         }

    //         const prediction = await this.gestureRecognizer.recognize(handLandmarks)
    //         if (prediction && this.onGestureCallback) {
    //           this.onGestureCallback(prediction)
    //         }
    //       }
    //     }

    //     this.ctx.restore()
    //   }
    // })

    // Set up canvas size
    this.resizeCanvas(videoElement)
  }

  /**
   * Resize canvas to match video
   */
  private resizeCanvas(videoElement: HTMLVideoElement): void {
    if (this.canvas) {
      this.canvas.width = videoElement.videoWidth
      this.canvas.height = videoElement.videoHeight
    }
  }

  /**
   * Process a video frame
   */
  async processFrame(video: HTMLVideoElement): Promise<void> {
    if (this.hands) {
      await this.hands.send({ image: video })
    }
  }

  /**
   * Set callback for gesture detection
   */
  onGesture(callback: (prediction: GesturePrediction) => void): void {
    this.onGestureCallback = callback
  }

  /**
   * Cleanup
   */
  dispose(): void {
    if (this.hands) {
      this.hands.close()
      this.hands = null
    }
    this.canvas = null
    this.ctx = null
    this.onGestureCallback = null
  }
}
