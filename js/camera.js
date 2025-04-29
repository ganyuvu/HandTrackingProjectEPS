export const videoElement = document.getElementById('input_video');
export const canvasElement = document.getElementById('output_canvas');
export const canvasCtx = canvasElement.getContext('2d');

// Check if the device is mobile
const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

// Set camera constraints
const constraints = {
  video: isMobile
    ? { facingMode: { ideal: 'environment' } }  // Always use the back camera on mobile
    : true,  // Default camera on desktop
  audio: false,  // Disable audio
};

// Start the camera stream
export function startCamera() {
  navigator.mediaDevices.getUserMedia(constraints)
    .then((stream) => {
      videoElement.srcObject = stream;
      videoElement.onloadedmetadata = () => {
        // Ensure that the canvas dimensions match the video stream's dimensions
        canvasElement.width = videoElement.videoWidth;
        canvasElement.height = videoElement.videoHeight;
        
        // Make the video element visible once the stream starts
        videoElement.style.display = 'block';  
      };
    })
    .catch((error) => {
      console.error('Error accessing camera:', error);
      
      // Display an error message to the user
      const errorMessage = document.createElement('div');
      errorMessage.style.position = 'absolute';
      errorMessage.style.top = '50%';
      errorMessage.style.left = '50%';
      errorMessage.style.transform = 'translate(-50%, -50%)';
      errorMessage.style.color = 'red';
      errorMessage.style.fontSize = '20px';
      errorMessage.innerText = 'Unable to access the camera. Please grant permission or try again later.';
      document.body.appendChild(errorMessage);
    });
}
