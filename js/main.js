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

async function init() {
  await startCamera();

  function processFrame() {
    if (videoElement.readyState === 4) {
      // Clear the previous frame
      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      
      // Draw the current video frame to the canvas
      canvasCtx.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
      
      // Send the image to the hands model for hand tracking
      hands.send({ image: videoElement });
    }
    requestAnimationFrame(processFrame); // Repeat on every frame
  }

  requestAnimationFrame(processFrame);
}

init();
