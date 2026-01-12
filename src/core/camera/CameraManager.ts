/**
 * CameraManager - Handles camera access and video streaming
 */

export class CameraManager {
  private stream: MediaStream | null = null
  private videoElement: HTMLVideoElement | null = null
  private onFrameCallback: ((video: HTMLVideoElement) => void) | null = null
  private animationFrameId: number | null = null

  /**
   * Initialize camera access
   */
  async initialize(videoElement: HTMLVideoElement): Promise<void> {
    try {
      this.videoElement = videoElement
      
      // Request camera access
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        }
      })

      videoElement.srcObject = this.stream
      await videoElement.play()

      this.startFrameCapture()
    } catch (error) {
      throw new Error(`Camera access failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  /**
   * Start capturing frames for processing
   */
  private startFrameCapture(): void {
    const captureFrame = () => {
      if (this.videoElement && this.onFrameCallback) {
        this.onFrameCallback(this.videoElement)
      }
      this.animationFrameId = requestAnimationFrame(captureFrame)
    }
    captureFrame()
  }

  /**
   * Set callback for frame processing
   */
  onFrame(callback: (video: HTMLVideoElement) => void): void {
    this.onFrameCallback = callback
  }

  /**
   * Stop camera stream
   */
  stop(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId)
      this.animationFrameId = null
    }

    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop())
      this.stream = null
    }

    if (this.videoElement) {
      this.videoElement.srcObject = null
      this.videoElement = null
    }

    this.onFrameCallback = null
  }

  /**
   * Check if camera is active
   */
  isActive(): boolean {
    return this.stream !== null && this.stream.active
  }

  /**
   * Get current video element
   */
  getVideoElement(): HTMLVideoElement | null {
    return this.videoElement
  }
}
