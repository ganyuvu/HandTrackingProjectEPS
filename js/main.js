import { startCamera, videoElement } from './camera.js';
import { onResults } from './handDetection.js';

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

// Use requestAnimationFrame manually instead of Mediapipe's Camera class
startCamera().then(() => {
  function processFrame() {
    hands.send({ image: videoElement });
    requestAnimationFrame(processFrame);
  }
  requestAnimationFrame(processFrame);
});
