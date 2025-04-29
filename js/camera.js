export const videoElement = document.getElementById('input_video');
export const canvasElement = document.getElementById('output_canvas');
export const canvasCtx = canvasElement.getContext('2d');
const switchCameraBtn = document.getElementById('switchCameraBtn');

let currentStream;
let videoDevices = [];
let currentDeviceIndex = 0;

// Helper to stop the current stream
function stopStream() {
  if (currentStream) {
    currentStream.getTracks().forEach(track => track.stop());
  }
}

// Get available video input devices
async function getVideoDevices() {
  const devices = await navigator.mediaDevices.enumerateDevices();
  videoDevices = devices.filter(device => device.kind === 'videoinput');
}

// Start camera with a specific deviceId
async function startCamera(deviceId) {
  try {
    stopStream();
    const constraints = {
      video: {
        deviceId: deviceId ? { exact: deviceId } : undefined
      },
      audio: false
    };

    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    currentStream = stream;
    videoElement.srcObject = stream;

    videoElement.onloadedmetadata = () => {
      canvasElement.width = videoElement.videoWidth;
      canvasElement.height = videoElement.videoHeight;
    };
  } catch (error) {
    console.error('Error accessing camera:', error);
    alert(`Camera error: ${error.message}`);
  }
}

// Button click switches camera
switchCameraBtn.addEventListener('click', async () => {
  currentDeviceIndex = (currentDeviceIndex + 1) % videoDevices.length;
  await startCamera(videoDevices[currentDeviceIndex].deviceId);
});

// Init on page load
(async () => {
  await getVideoDevices();
  if (videoDevices.length === 0) {
    alert('No video devices found.');
    return;
  }
  await startCamera(videoDevices[currentDeviceIndex].deviceId);
})();
