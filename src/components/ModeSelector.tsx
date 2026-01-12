/**
 * ModeSelector - Component for selecting communication mode
 */

import { CommunicationMode } from '@/types'
import './ModeSelector.css'

interface ModeSelectorProps {
  currentMode: CommunicationMode
  onModeChange: (mode: CommunicationMode) => void
}

export const ModeSelector = ({ currentMode, onModeChange }: ModeSelectorProps) => {
  const modes: { value: CommunicationMode; label: string; description: string }[] = [
    {
      value: 'isl-to-text',
      label: 'ISL → Text/Speech',
      description: 'Translate sign language to text and speech'
    },
    {
      value: 'text-to-isl',
      label: 'Text → ISL',
      description: 'Convert text to sign language visualization'
    },
    {
      value: 'voice-to-isl',
      label: 'Voice → ISL',
      description: 'Convert voice to sign language visualization'
    }
  ]

  return (
    <div className="mode-selector">
      <h2 className="mode-selector-title">Select Communication Mode</h2>
      <div className="mode-options">
        {modes.map((mode) => (
          <button
            key={mode.value}
            className={`mode-button ${currentMode === mode.value ? 'active' : ''}`}
            onClick={() => onModeChange(mode.value)}
          >
            <div className="mode-button-content">
              <span className="mode-label">{mode.label}</span>
              <span className="mode-description">{mode.description}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
