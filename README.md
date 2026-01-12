# D&D CONVEYOR

A browser-based assistive web application enabling two-way communication between deaf/mute individuals and non-sign language users through Indian Sign Language (ISL) translation.

## Features

- **Real-time Hand Gesture Recognition**: Uses computer vision to detect and classify ISL hand gestures
- **ISL to Text/Speech**: Translates sign language gestures into readable text and audible speech
- **Text/Voice to ISL**: Converts text input or voice to visual sign language representations
- **Browser-based**: Works entirely in the browser with standard hardware (camera and microphone)
- **No Specialized Hardware**: Accessible on any device with a camera and microphone

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Computer Vision**: MediaPipe Hands, TensorFlow.js
- **Speech**: Web Speech API (SpeechSynthesis, SpeechRecognition)

## Project Structure

```
src/
├── components/          # React UI components
├── core/               # Core business logic
│   ├── camera/         # Camera access and management
│   ├── gesture/        # Gesture recognition and classification
│   ├── speech/         # Text-to-speech and speech-to-text
│   └── visualization/  # Sign language visualization
├── models/             # ML models and data
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will open at `http://localhost:3000`

### Build

```bash
npm run build
```

## Architecture

The application follows a modular architecture:

1. **Camera Module**: Handles camera access, video streaming, and frame capture
2. **Gesture Recognition Module**: Processes hand landmarks and classifies ISL gestures
3. **Speech Module**: Manages text-to-speech and speech-to-text conversion
4. **Visualization Module**: Renders sign language representations
5. **UI Layer**: React components orchestrating the communication flow

## Future Enhancements

- Advanced gesture recognition with sentence-level translation
- 3D sign language avatar visualization
- Offline support with service workers
- Multi-language support
- Custom gesture training
- Mobile app version

## License

MIT
