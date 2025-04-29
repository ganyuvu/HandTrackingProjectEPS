export const videoElement = document.getElementById('input_video');
export const canvasElement = document.getElementById('output_canvas');
export const canvasCtx = canvasElement.getContext('2d');

// Function to get the back camera by its deviceId
async function getBackCameraDeviceId() {
  const devices = await navigator.mediaDevices.enumerateDevices();
  
  // Try to find the back camera
  const backCamera = devices.find(device => device.kind === 'videoinput' && device.label.toLowerCase().includes('back'));
  
  if (backCamera) {
    return backCamera.deviceId;
  }

  // If no back camera is found (fallback), try to force the environment-facing camera
  const environmentCamera = devices.find(device => device.kind === 'videoinput' && device.facing === 'environment');
  return environmentCamera ? environmentCamera.deviceId : null;
}

// Camera constraints
const constraints = {
  video: {
    facingMode: { exact: 'environment' },  // Prefer back camera (Android/iOS fallback)
    width: { ideal: 1280 },  // Optional: Set the desired width
    height: { ideal: 720 },  // Optional: Set the desired height
  },
  audio: false, // No audio needed
};

// Start the camera and ensure back camera is used
export async function startCamera() {
  const backCameraDeviceId = await getBackCameraDeviceId();

  if (backCameraDeviceId) {
    constraints.video.deviceId = backCameraDeviceId;  // Explicitly set the back camera deviceId
  }

  navigator.mediaDevices.getUserMedia(constraints)
    .then((stream) => {
      videoElement.srcObject = stream;
      videoElement.play().catch((e) => console.warn("Video play blocked:", e));  // Ensures the video starts playing
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
