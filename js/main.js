import { startCamera, videoElement } from './camera.js';
import { onResults } from './handDetection.js';

// Start the camera first
startCamera();

// Initialize hands
const hands = new Hands({
  locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
});

hands.setOptions({
  maxNumHands: 1,
  modelComplexity: 0,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
});

hands.onResults(onResults);

// Initialize the camera with video element
const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({ image: videoElement });
  },
  width: 640,
  height: 480
});

// Start the camera stream (use startCamera() for constraints)
camera.start();
