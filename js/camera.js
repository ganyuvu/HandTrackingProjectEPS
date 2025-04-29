export const videoElement = document.getElementById('input_video');
export const canvasElement = document.getElementById('output_canvas');
export const canvasCtx = canvasElement.getContext('2d');

// Set camera constraints for mobile only (use the back camera)
const constraints = {
  video: {
    facingMode: { exact: 'environment' },  // This ensures we use the back camera
    width: { ideal: 1280 },  // Optional: Set desired width
    height: { ideal: 720 }   // Optional: Set desired height
  },
  audio: false,  // No audio needed
};

// Start the camera stream
export function startCamera() {
  navigator.mediaDevices.getUserMedia(constraints)
    .then((stream) => {
      videoElement.srcObject = stream;
      videoElement.onloadedmetadata = () => {
        // Ensure canvas dimensions match video stream
        canvasElement.width = videoElement.videoWidth;
        canvasElement.height = videoElement.videoHeight;
      };
    })
    .catch((error) => {
      console.error('Error accessing camera:', error);
      alert("Unable to access camera. Please grant permissions.");
    });
}
