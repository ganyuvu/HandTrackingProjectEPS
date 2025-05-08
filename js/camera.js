export const videoElement = document.getElementById('input_video');
export const canvasElement = document.getElementById('output_canvas');
export const canvasCtx = canvasElement.getContext('2d');

export async function startCamera() {
  const constraints = {
    video: {
      facingMode: { exact: 'environment' }, // strictly use the back camera
      width: { ideal: 1280 },
      height: { ideal: 720 }
    },
    audio: false
  };

  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    videoElement.srcObject = stream;

    return new Promise((resolve) => {
      videoElement.onloadedmetadata = () => {
        videoElement.play(); // ensure playback starts

        // Set canvas and video dimensions correctly
        canvasElement.width = videoElement.videoWidth;
        canvasElement.height = videoElement.videoHeight;

        videoElement.style.width = `${videoElement.videoWidth}px`;
        videoElement.style.height = `${videoElement.videoHeight}px`;

        canvasElement.style.width = `${videoElement.videoWidth}px`;
        canvasElement.style.height = `${videoElement.videoHeight}px`;

        resolve();
      };
    });
  } catch (error) {
    console.error('Error accessing back camera:', error);

    // Show an error message if the back camera is not available
    alert("Unable to access the back camera. Please check your device's settings.");
  }
}
