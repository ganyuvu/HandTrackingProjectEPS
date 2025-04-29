export const videoElement = document.getElementById('input_video');
export const canvasElement = document.getElementById('output_canvas');
export const canvasCtx = canvasElement.getContext('2d');

export async function startCamera() {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter(device => device.kind === 'videoinput');

    console.log('Available video devices:', videoDevices);

    let backCamera = videoDevices.find(device =>
      /back|rear|environment/i.test(device.label)
    );

    // Fallback to last camera if back one wasn't found
    if (!backCamera && videoDevices.length > 1) {
      backCamera = videoDevices[videoDevices.length - 1];
    }

    const constraints = {
      video: backCamera
        ? { deviceId: { exact: backCamera.deviceId } }
        : { facingMode: { ideal: 'environment' } },
      audio: false
    };

    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    videoElement.srcObject = stream;

    videoElement.onloadedmetadata = () => {
      canvasElement.width = videoElement.videoWidth;
      canvasElement.height = videoElement.videoHeight;
      console.log(`Camera started: ${videoElement.videoWidth}x${videoElement.videoHeight}`);
    };

  } catch (error) {
    console.error('Failed to acquire camera feed:', error);
    alert(`Camera Error: ${error.message}`);
  }
}
