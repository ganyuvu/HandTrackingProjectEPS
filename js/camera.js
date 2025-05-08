export const videoElement = document.getElementById('input_video');
export const canvasElement = document.getElementById('output_canvas');
export const canvasCtx = canvasElement.getContext('2d');

export async function startCamera() {
  try {
    const constraints = {
      audio: false,
      video: {
        facingMode: { ideal: 'environment' } // Tries to prefer back camera
      }
    };

    const stream = await navigator.mediaDevices.getUserMedia(constraints);

    videoElement.srcObject = stream;
    videoElement.playsInline = true;
    videoElement.muted = true;
    videoElement.autoplay = true;

    // Ensure the video actually starts playing
    await videoElement.play();

    // Wait until video is ready
    await new Promise((resolve) => {
      videoElement.onloadedmetadata = () => {
        canvasElement.width = videoElement.videoWidth;
        canvasElement.height = videoElement.videoHeight;
        resolve();
      };
    });

  } catch (error) {
    console.error('Error accessing camera:', error);
    alert('Camera access failed. Check permissions and use HTTPS.');
  }
}
