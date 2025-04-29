export const videoElement = document.getElementById('input_video');
export const canvasElement = document.getElementById('output_canvas');
export const canvasCtx = canvasElement.getContext('2d');

// Check if the device is mobile
const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

// Function to get the back camera explicitly
async function getBackCamera() {
  const devices = await navigator.mediaDevices.enumerateDevices();
  const videoDevices = devices.filter(device => device.kind === 'videoinput');
  
  // Try to find the back camera
  const backCamera = videoDevices.find(device => device.label.toLowerCase().includes('environment') || device.deviceId);

  if (backCamera) {
    return { 
      video: { 
        deviceId: backCamera.deviceId 
      }, 
      audio: false 
    };
  } else {
    throw new Error('No back camera found');
  }
}

// Set camera constraints based on device type
async function setCameraConstraints() {
  let constraints;
  if (isMobile) {
    try {
      constraints = await getBackCamera(); // Force the back camera on mobile
    } catch (error) {
      console.error('Error:', error);
      constraints = { video: { facingMode: 'environment' }, audio: false };
    }
  } else {
    constraints = { video: true, audio: false }; // Default for desktop
  }

  startCamera(constraints);
}

// Start the camera stream with given constraints
export function startCamera(constraints) {
  navigator.mediaDevices.getUserMedia(constraints)
    .then((stream) => {
      videoElement.srcObject = stream;
      videoElement.muted = true; // Ensure video is muted
      videoElement.play(); // Ensure video is playing

      // Ensure canvas is updated after video metadata is loaded
      videoElement.onloadedmetadata = () => {
        canvasElement.width = videoElement.videoWidth;
        canvasElement.height = videoElement.videoHeight;
        console.log('Camera initialized and video metadata loaded.');
      };

      // Debugging to ensure stream is being processed
      console.log('Video stream started');
    })
    .catch((error) => {
      console.error('Error accessing camera:', error);
    });
}

// Run the camera setup
setCameraConstraints();
