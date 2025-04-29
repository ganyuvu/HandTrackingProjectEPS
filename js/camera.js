export const videoElement = document.getElementById('input_video');
export const canvasElement = document.getElementById('output_canvas');
export const canvasCtx = canvasElement.getContext('2d');

// Check if the device is mobile
const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

// Set camera constraints, always use the back camera for mobile
const constraints = {
  video: isMobile ? { facingMode: { ideal: 'environment' } } : true,  // Use back camera on mobile, default on desktop
  audio: false, // No audio is needed
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
      // Handle error gracefully and inform the user
      alert("Unable to access camera. Please grant permissions.");
    });
}
