export const videoElement = document.getElementById('input_video');
export const canvasElement = document.getElementById('output_canvas');
export const canvasCtx = canvasElement.getContext('2d');

// Check if the device is mobile (Android or iPhone)
const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

// Adjust constraints based on whether the device is mobile or desktop
const constraints = {
  video: {
    facingMode: isMobile ? { ideal: 'environment' } : 'user',  // 'environment' for mobile, 'user' for front camera on desktop
    width: { ideal: 1280 },  // Set ideal width for better resolution
    height: { ideal: 720 }   // Set ideal height for better resolution
  },
  audio: false,  // Disable audio capture
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
      
      // Handle specific errors
      if (error.name === 'NotReadableError') {
        alert("Camera is already in use by another application. Please close other apps that might be using the camera.");
      } else if (error.name === 'PermissionDeniedError') {
        alert("Permission to access the camera was denied. Please enable camera permissions.");
      } else {
        alert("An unknown error occurred while accessing the camera.");
      }
    });
}
