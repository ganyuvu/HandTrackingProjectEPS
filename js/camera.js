export const videoElement = document.getElementById('input_video');
export const canvasElement = document.getElementById('output_canvas');
export const canvasCtx = canvasElement.getContext('2d');
const switchCameraBtn = document.getElementById('switchCameraBtn');

let currentFacingMode = 'environment'; // Start with back camera

// Camera constraints
let constraints = {
  video: {
    facingMode: currentFacingMode,
    width: { ideal: 1280 },
    height: { ideal: 720 }
  },
  audio: false  // Disable audio if not needed
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

// Switch between front and back camera when the button is clicked
switchCameraBtn.addEventListener('click', () => {
  // Toggle between front and back camera
  currentFacingMode = currentFacingMode === 'environment' ? 'user' : 'environment';

  // Stop the current stream
  const stream = videoElement.srcObject;
  const tracks = stream.getTracks();
  tracks.forEach(track => track.stop());

  // Update the constraints and start the camera again
  constraints.video.facingMode = currentFacingMode;
  startCamera();
});

// Start the camera when the page loads
startCamera();
