export const videoElement = document.getElementById('input_video');
export const canvasElement = document.getElementById('output_canvas');
export const canvasCtx = canvasElement.getContext('2d');

// Function to get the back camera by its deviceId
async function getBackCameraDeviceId() {
  const devices = await navigator.mediaDevices.enumerateDevices();
  const backCamera = devices.find(device => device.kind === 'videoinput' && device.label.toLowerCase().includes('back'));
  return backCamera ? backCamera.deviceId : null;
}

// Constraints to force the back camera
const constraints = {
  video: {
    facingMode: 'environment', // Default suggestion for back camera
    width: { ideal: 1280 },     // Optional: Ideal width
    height: { ideal: 720 },     // Optional: Ideal height
  },
  audio: false, // No audio needed
};

// Start the camera and ensure back camera is used
export async function startCamera() {
  const backCameraDeviceId = await getBackCameraDeviceId();

  if (backCameraDeviceId) {
    constraints.video.deviceId = backCameraDeviceId;  // Use the back camera explicitly if we found it
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
