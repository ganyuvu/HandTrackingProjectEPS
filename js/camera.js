export const videoElement = document.getElementById('input_video');
export const canvasElement = document.getElementById('output_canvas');
export const canvasCtx = canvasElement.getContext('2d');

// Check if the device is mobile
const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

// Set camera constraints
const constraints = {
  video: isMobile
    ? { facingMode: 'environment' } // Only use the back camera on mobile
    : true,  // Default camera on desktop (no preference)
  audio: false, // Disable audio
};

// Start the camera stream
export function startCamera() {
  navigator.mediaDevices.getUserMedia(constraints)
    .then((stream) => {
      videoElement.srcObject = stream;
      videoElement.onloadedmetadata = () => {
        canvasElement.width = videoElement.videoWidth;
        canvasElement.height = videoElement.videoHeight;
      };
    })
    .catch((error) => {
      console.error('Error accessing camera:', error);
    });
}
