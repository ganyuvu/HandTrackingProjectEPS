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

  // Wait for the video to start playing
  videoElement.onplaying = () => {
    function processFrame() {
      hands.send({ image: videoElement });
      requestAnimationFrame(processFrame); // Continue to process the next frame
    }

    // Start processing frames once the video is playing
    processFrame();
  };
}

init();