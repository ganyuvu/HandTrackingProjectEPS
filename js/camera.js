export const videoElement = document.getElementById('input_video');
export const canvasElement = document.getElementById('output_canvas');
export const canvasCtx = canvasElement.getContext('2d');

// Force the back camera for both Android and iOS
async function getBackCamera() {
  const devices = await navigator.mediaDevices.enumerateDevices();
  const backCamera = devices.find(device => device.kind === 'videoinput' && device.label.includes('back'));
  return backCamera ? backCamera.deviceId : null;
}

// Camera constraints, with the back camera enforced for both platforms
const constraints = {
  video: {
    facingMode: 'environment', // "environment" suggests back camera by default
    width: { ideal: 1280 },
    height: { ideal: 720 }
  },
  audio: false, // No audio needed
};

// Start the camera stream
export async function startCamera() {
  const backCameraId = await getBackCamera();
  
  if (backCameraId) {
    constraints.video.deviceId = backCameraId;  // Force the back camera by deviceId
  }

  navigator.mediaDevices.getUserMedia(constraints)
    .then((stream) => {
      videoElement.srcObject = stream;
      videoElement.play().catch((e) => console.warn("Video play blocked:", e)); // Ensures the video starts playing
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
