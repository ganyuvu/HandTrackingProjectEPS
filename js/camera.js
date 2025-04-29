export const videoElement = document.getElementById('input_video');
export const canvasElement = document.getElementById('output_canvas');
export const canvasCtx = canvasElement.getContext('2d');

const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

const constraints = {
  video: isMobile
    ? { facingMode: { ideal: 'environment' } }
    : true, // Default camera on desktop
  audio: false
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
