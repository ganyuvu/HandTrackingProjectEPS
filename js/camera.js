export const videoElement = document.getElementById('input_video');
export const canvasElement = document.getElementById('output_canvas');
export const canvasCtx = canvasElement.getContext('2d');

// Set camera constraints for mobile (force the back camera)
const constraints = {
  video: {
    facingMode: { exact: 'environment' }, // Force the back camera using 'exact'
    width: { ideal: 1280 },  // Optional: Set the desired width
    height: { ideal: 720 }   // Optional: Set the desired height
  },
  audio: false, // No audio needed
};

// Start the camera stream
export function startCamera() {
  navigator.mediaDevices.getUserMedia(constraints)
    .then((stream) => {
      videoElement.srcObject = stream;
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
