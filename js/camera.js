export const videoElement = document.getElementById('input_video');
export const canvasElement = document.getElementById('output_canvas');
export const canvasCtx = canvasElement.getContext('2d');

// Camera constraints (loosened for better compatibility)
const constraints = {
  video: {
    facingMode: { ideal: 'environment' }, // Loosened from 'exact' to 'ideal'
    width: { ideal: 1280 },
    height: { ideal: 720 }
  },
  audio: false, // No audio needed
};

// Start the camera stream with Mediapipe Camera handling it
export function startCamera() {
  navigator.mediaDevices.getUserMedia(constraints)
    .then((stream) => {
      videoElement.srcObject = stream;
      videoElement.play().catch((e) => console.warn("Video play blocked:", e)); // Ensures the video starts playing
      videoElement.onloadedmetadata = () => {
        // Ensure canvas dimensions match the video stream
        canvasElement.width = videoElement.videoWidth;
        canvasElement.height = videoElement.videoHeight;
      };
    })
    .catch((error) => {
      console.error('Error accessing camera:', error);
      alert("Unable to access camera. Please grant permissions.");
    });
}