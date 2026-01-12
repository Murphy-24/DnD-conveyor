# Quick Start Guide - D&D CONVEYOR

## Prerequisites

- **Node.js** 18.0 or higher
- **npm** or **yarn** package manager
- **Modern web browser** (Chrome/Edge recommended for full feature support)
- **Camera** and **Microphone** access

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   - The app will automatically open at `http://localhost:3000`
   - Or manually navigate to the URL shown in terminal

## First Run

### Grant Permissions

When you first open the app:

1. **Camera Permission**: Click "Allow" when prompted for camera access
2. **Microphone Permission**: Click "Allow" when prompted for microphone access (for voice input mode)

### Using the Application

#### Mode 1: ISL → Text/Speech
1. Select "ISL → Text/Speech" mode
2. Position your hands in front of the camera
3. Make ISL gestures
4. Detected gestures will appear as text and be spoken aloud

#### Mode 2: Text → ISL
1. Select "Text → ISL" mode
2. Type text in the input field
3. Click "Speak" to hear the text
4. Sign language visualization will appear below

#### Mode 3: Voice → ISL
1. Select "Voice → ISL" mode
2. Click "Start Voice Input" button
3. Speak into your microphone
4. Your speech will be converted to text and displayed as sign language

## Troubleshooting

### Camera Not Working
- **Check permissions**: Ensure camera permission is granted in browser settings
- **Check other apps**: Close other applications using the camera
- **Try different browser**: Chrome/Edge have best support

### Speech Recognition Not Working
- **HTTPS required**: Speech Recognition API requires HTTPS (localhost works)
- **Browser support**: Only Chrome/Edge support Speech Recognition
- **Microphone permission**: Ensure microphone permission is granted

### Gestures Not Detected
- **Lighting**: Ensure good lighting for hand detection
- **Distance**: Keep hands 1-2 feet from camera
- **Background**: Use a contrasting background
- **Hand visibility**: Ensure full hand is visible in frame

### Performance Issues
- **Close other tabs**: Free up browser resources
- **Lower camera resolution**: Modify camera constraints in code
- **Update browser**: Use latest browser version

## Development

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Project Structure
- `src/components/` - React UI components
- `src/core/` - Core business logic modules
- `src/types/` - TypeScript type definitions
- `src/utils/` - Utility functions

## Next Steps

1. **Train ML Model**: Replace placeholder gesture recognition with trained ISL model
2. **Add More Gestures**: Extend gesture dictionary with more ISL signs
3. **Improve Visualization**: Add 3D avatar or better animations
4. **Optimize Performance**: Fine-tune frame processing and rendering

## Support

For issues or questions, refer to:
- `README.md` - Project overview
- `ARCHITECTURE.md` - System architecture details
