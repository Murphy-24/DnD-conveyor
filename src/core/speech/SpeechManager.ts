/**
 * SpeechManager - Handles text-to-speech and speech-to-text
 */

export class SpeechManager {
  private synthesis: SpeechSynthesis
  private recognition: any = null
  private isListening: boolean = false
  private onTranscriptCallback: ((text: string) => void) | null = null

  constructor() {
    this.synthesis = window.speechSynthesis
    this.initializeSpeechRecognition()
  }

  /**
   * Initialize Web Speech Recognition API
   */
  private initializeSpeechRecognition(): void {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition

    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition()
      this.recognition.continuous = true
      this.recognition.interimResults = true
      this.recognition.lang = 'en-IN' // Indian English

      this.recognition.onresult = (event: any) => {
        let transcript = ''
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript
        }
        if (this.onTranscriptCallback) {
          this.onTranscriptCallback(transcript)
        }
      }

      this.recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error)
      }

      this.recognition.onend = () => {
        this.isListening = false
      }
    }
  }

  /**
   * Convert text to speech
   */
  speak(text: string, options?: { rate?: number; pitch?: number; volume?: number }): void {
    // Cancel any ongoing speech
    this.synthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'en-IN'
    utterance.rate = options?.rate || 1.0
    utterance.pitch = options?.pitch || 1.0
    utterance.volume = options?.volume || 1.0

    this.synthesis.speak(utterance)
  }

  /**
   * Stop current speech
   */
  stopSpeaking(): void {
    this.synthesis.cancel()
  }

  /**
   * Check if currently speaking
   */
  isSpeaking(): boolean {
    return this.synthesis.speaking
  }

  /**
   * Start speech recognition
   */
  startListening(): void {
    if (!this.recognition) {
      throw new Error('Speech recognition not available in this browser')
    }

    if (!this.isListening) {
      this.isListening = true
      this.recognition.start()
    }
  }

  /**
   * Stop speech recognition
   */
  stopListening(): void {
    if (this.recognition && this.isListening) {
      this.recognition.stop()
      this.isListening = false
    }
  }

  /**
   * Set callback for transcript updates
   */
  onTranscript(callback: (text: string) => void): void {
    this.onTranscriptCallback = callback
  }

  /**
   * Check if speech recognition is available
   */
  isRecognitionAvailable(): boolean {
    return this.recognition !== null
  }

  /**
   * Check if currently listening
   */
  getIsListening(): boolean {
    return this.isListening
  }
}
