# D&D CONVEYOR - System Architecture

## Overview

D&D CONVEYOR is a modular, browser-based assistive web application designed for two-way communication between deaf/mute individuals and non-sign language users using Indian Sign Language (ISL).

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Presentation Layer                       │
│  (React Components: UI, Camera View, Visualization)         │
└───────────────────────┬─────────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────────┐
│                    Application Layer                         │
│  (App State Management, Mode Selection, Event Handling)     │
└───────────────────────┬─────────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────────┐
│                      Core Services Layer                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Camera     │  │   Gesture    │  │   Speech     │     │
│  │   Manager    │  │  Recognizer  │  │   Manager    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│  ┌──────────────┐  ┌──────────────┐                        │
│  │   Hand       │  │   Sign       │                        │
│  │   Tracker    │  │ Visualizer   │                        │
│  └──────────────┘  └──────────────┘                        │
└───────────────────────┬─────────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────────┐
│                    External APIs Layer                        │
│  (MediaPipe Hands, Web Speech API, TensorFlow.js)            │
└─────────────────────────────────────────────────────────────┘
```

## Core Modules

### 1. Camera Module (`src/core/camera/`)

**CameraManager**
- Handles camera access via MediaDevices API
- Manages video stream lifecycle
- Provides frame capture for processing
- Handles permissions and errors

**Responsibilities:**
- Request camera permissions
- Initialize video stream
- Provide frame-by-frame access
- Clean up resources

### 2. Gesture Recognition Module (`src/core/gesture/`)

**GestureRecognizer**
- Manages ISL gesture dictionary
- Integrates with ML models for classification
- Provides gesture prediction interface
- Handles model loading and initialization

**HandTracker**
- Integrates MediaPipe Hands with gesture recognition
- Processes video frames for hand detection
- Draws hand landmarks on canvas
- Bridges MediaPipe output to gesture recognition

**Responsibilities:**
- Detect hand landmarks using MediaPipe
- Classify gestures using ML models
- Provide confidence scores
- Map gestures to ISL alphabet/words

### 3. Speech Module (`src/core/speech/`)

**SpeechManager**
- Text-to-Speech (TTS) using Web Speech API
- Speech-to-Text (STT) using Web Speech Recognition API
- Manages speech synthesis and recognition state
- Handles language settings (en-IN for Indian English)

**Responsibilities:**
- Convert text to audible speech
- Convert speech to text
- Manage recognition sessions
- Handle errors and availability

### 4. Visualization Module (`src/core/visualization/`)

**SignVisualizer**
- Renders sign language representations
- Animates gesture sequences
- Displays text-to-sign conversions
- Canvas-based rendering

**Responsibilities:**
- Visualize individual gestures
- Animate gesture sequences
- Display sign language for text input
- Support future 3D avatar integration

## Communication Modes

### 1. ISL → Text/Speech
- **Input**: Camera feed with hand gestures
- **Processing**: Hand tracking → Gesture recognition → Text conversion
- **Output**: Text display + Speech synthesis

**Flow:**
```
Camera → MediaPipe Hands → Hand Landmarks → Gesture Classifier → 
Text Display → Speech Synthesis
```

### 2. Text → ISL
- **Input**: Text input field
- **Processing**: Text parsing → Gesture mapping → Visualization
- **Output**: Sign language visualization

**Flow:**
```
Text Input → Character Mapping → Gesture Sequence → Visualization
```

### 3. Voice → ISL
- **Input**: Voice via microphone
- **Processing**: Speech recognition → Text → Gesture mapping → Visualization
- **Output**: Sign language visualization

**Flow:**
```
Microphone → Speech Recognition → Text → Character Mapping → 
Gesture Sequence → Visualization
```

## Data Flow

### Gesture Detection Flow
```
1. Camera captures frame
2. CameraManager provides video element
3. HandTracker processes frame with MediaPipe
4. MediaPipe returns hand landmarks
5. GestureRecognizer classifies landmarks
6. Prediction returned with confidence
7. UI updates with detected gesture
8. SpeechManager speaks the gesture label
```

### Text-to-Sign Flow
```
1. User enters text or speaks
2. Text normalized and split into characters
3. Each character mapped to ISL gesture
4. SignVisualizer animates gesture sequence
5. Canvas displays visual representation
```

## Technology Stack

### Frontend Framework
- **React 18**: Component-based UI
- **TypeScript**: Type safety and better DX
- **Vite**: Fast build tool and dev server

### Computer Vision
- **MediaPipe Hands**: Real-time hand tracking
- **TensorFlow.js**: ML model inference (for gesture classification)

### Speech
- **Web Speech API**: Native browser TTS and STT
  - `SpeechSynthesis`: Text-to-speech
  - `SpeechRecognition`: Speech-to-text

### Styling
- **CSS Modules**: Component-scoped styles
- **Modern CSS**: Flexbox, Grid, CSS Variables

## File Structure

```
src/
├── components/          # React UI components
│   ├── CameraView.tsx   # Camera feed with hand tracking overlay
│   ├── SignVisualizer.tsx # Sign language visualization
│   ├── CommunicationPanel.tsx # Input/output interface
│   └── ModeSelector.tsx # Mode selection UI
├── core/               # Core business logic
│   ├── camera/         # Camera management
│   ├── gesture/        # Gesture recognition
│   ├── speech/         # Speech synthesis/recognition
│   └── visualization/  # Sign language visualization
├── types/              # TypeScript definitions
├── styles/             # Global styles
└── App.tsx             # Main application component
```

## Future Enhancements

### Short-term
1. **ML Model Integration**: Replace placeholder with trained ISL gesture model
2. **Gesture Training**: Allow users to train custom gestures
3. **Sentence-level Translation**: Process multiple gestures as sentences
4. **Performance Optimization**: Optimize frame processing and rendering

### Medium-term
1. **3D Avatar**: Integrate 3D sign language avatar for visualization
2. **Offline Support**: Service workers for offline functionality
3. **Mobile Optimization**: Better mobile camera handling
4. **Gesture History**: Save and replay gesture sequences

### Long-term
1. **Multi-language Support**: Support for other sign languages
2. **Cloud Sync**: Sync settings and custom gestures
3. **Advanced ML**: Real-time sentence-level translation
4. **Accessibility Features**: Screen reader support, keyboard navigation

## Performance Considerations

1. **Frame Processing**: Throttle frame processing to maintain 30fps
2. **Model Loading**: Lazy load ML models to reduce initial load time
3. **Memory Management**: Properly dispose of MediaPipe and camera resources
4. **Canvas Optimization**: Use requestAnimationFrame for smooth rendering

## Security & Privacy

1. **Local Processing**: All processing happens client-side
2. **No Data Storage**: No gestures or conversations stored
3. **Camera Permissions**: Clear permission requests and error handling
4. **HTTPS Required**: Web Speech API requires secure context

## Browser Compatibility

- **Chrome/Edge**: Full support (MediaPipe, Speech API)
- **Firefox**: Partial support (no Speech Recognition API)
- **Safari**: Limited support (no Speech Recognition API)
- **Mobile**: iOS Safari has limitations, Android Chrome works well
