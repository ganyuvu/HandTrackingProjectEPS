export const videoElement = document.getElementById('input_video');
export const canvasElement = document.getElementById('output_canvas');
export const canvasCtx = canvasElement.getContext('2d');

// Start the camera stream with back camera preference
export async function startCamera() {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter(device => device.kind === 'videoinput');

    // Try to find a back-facing camera by label
    const backCamera = videoDevices.find(device =>
      device.label.toLowerCase().includes('back') ||
      device.label.toLowerCase().includes('rear')
    );

    const constraints = {
      video: backCamera
        ? { deviceId: { exact: backCamera.deviceId } }
        : { facingMode: { exact: 'environment' } }, // Fallback
      audio: false
    };

    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    videoElement.srcObject = stream;

    await new Promise((resolve) => {
      videoElement.onloadedmetadata = () => {
        canvasElement.width = videoElement.videoWidth;
        canvasElement.height = videoElement.videoHeight;
        resolve();
      };
    });
  } catch (error) {
    console.error('Error accessing back camera:', error);
    alert('Unable to access back camera. Please check permissions or device support.');
  }
}
