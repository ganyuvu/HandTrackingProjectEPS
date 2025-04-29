import { startCamera, videoElement } from './camera.js';
import { onResults } from './handDetection.js';

// Initialize hands tracking
const hands = new Hands({
  locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
});

hands.setOptions({
  maxNumHands: 1,
  modelComplexity: 0,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5,
});

// Set the onResults callback for hand tracking
hands.onResults(onResults);

async function init() {
  await startCamera();

  // Ensure the camera is ready before processing
  function processFrame() {
    if (videoElement.readyState === 4 && videoElement.srcObject) {
      // Send the video frame to MediaPipe Hands for processing
      hands.send({ image: videoElement });
    }
    requestAnimationFrame(processFrame); // Loop through frames
  }

  requestAnimationFrame(processFrame);
}

init();
