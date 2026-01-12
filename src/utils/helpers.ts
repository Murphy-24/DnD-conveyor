/**
 * Utility helper functions
 */

/**
 * Debounce function to limit function calls
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(later, wait)
  }
}

/**
 * Throttle function to limit function calls
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Check if browser supports required APIs
 */
export function checkBrowserSupport(): {
  camera: boolean
  speechSynthesis: boolean
  speechRecognition: boolean
  mediaPipe: boolean
} {
  return {
    camera: !!navigator.mediaDevices?.getUserMedia,
    speechSynthesis: 'speechSynthesis' in window,
    speechRecognition:
      'SpeechRecognition' in window || 'webkitSpeechRecognition' in window,
    mediaPipe: true // MediaPipe loads dynamically
  }
}

/**
 * Format error message for user display
 */
export function formatError(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  if (typeof error === 'string') {
    return error
  }
  return 'An unknown error occurred'
}

/**
 * Normalize text for gesture mapping
 */
export function normalizeText(text: string): string {
  return text
    .toUpperCase()
    .trim()
    .replace(/[^A-Z0-9\s]/g, '') // Remove special characters
}
