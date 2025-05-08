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

    // Check if the stream is valid
    if (!stream) {
      throw new Error('No stream received');
    }

    videoElement.srcObject = stream;
    videoElement.playsInline = true;
    videoElement.muted = true;
    videoElement.autoplay = true;

    // Ensure the video starts playing
    await videoElement.play();

    // Log to check the video dimensions
    console.log('Video dimensions:', videoElement.videoWidth, videoElement.videoHeight);

    // Wait until video metadata is loaded
    await new Promise((resolve) => {
      videoElement.onloadedmetadata = () => {
        console.log('Video metadata loaded');
        canvasElement.width = videoElement.videoWidth;
        canvasElement.height = videoElement.videoHeight;
        resolve();
      };
    });

    console.log('Camera stream initialized successfully');
  } catch (error) {
    console.error('Error accessing camera:', error);
    alert('Camera access failed. Check permissions and use HTTPS.');
  }
}
