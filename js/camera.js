export const videoElement = document.getElementById('input_video');
export const canvasElement = document.getElementById('output_canvas');
export const canvasCtx = canvasElement.getContext('2d');

// Initial constraints (default to front camera)
let currentFacingMode = 'user';  // Start with front camera

// Check if the device is mobile (Android or iPhone)
const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

// Adjust constraints based on whether the device is mobile or desktop
const constraints = {
  video: {
    facingMode: currentFacingMode,  // Use the initial facing mode (user/front)
    width: { ideal: 1280 },  // Set ideal width for better resolution
    height: { ideal: 720 },  // Set ideal height for better resolution
  },
  audio: false,  // Disable audio capture
};

// Function to start camera
export function startCamera() {
  navigator.mediaDevices.getUserMedia(constraints)
    .then((stream) => {
      videoElement.srcObject = stream;
      videoElement.onloadedmetadata = () => {
        // Match the canvas size with video dimensions
        canvasElement.width = videoElement.videoWidth;
        canvasElement.height = videoElement.videoHeight;
      };
    })
    .catch((error) => {
      console.error('Error accessing camera:', error);
      alert("Unable to access camera. Please grant permissions.");
    });
}

// Function to stop the current camera stream
function stopCameraStream() {
  const stream = videoElement.srcObject;
  const tracks = stream.getTracks();
  tracks.forEach(track => track.stop());  // Stop all tracks
  videoElement.srcObject = null;
}

// Function to toggle the camera
function toggleCamera() {
  // Switch the facing mode (front <-> back)
  currentFacingMode = currentFacingMode === 'user' ? 'environment' : 'user';

  // Stop the current stream
  stopCameraStream();

  // Update the constraints with the new facing mode
  constraints.video.facingMode = currentFacingMode;

  // Start the camera again with the new facing mode
  startCamera();
}

// Add event listener to the toggle button
document.getElementById('toggle_camera_button').addEventListener('click', toggleCamera);

// Start the camera when the page loads
startCamera();
