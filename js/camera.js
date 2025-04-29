document.addEventListener('DOMContentLoaded', async () => {
  const videoElement = document.getElementById('input_video');
  const canvasElement = document.getElementById('output_canvas');
  const canvasCtx = canvasElement.getContext('2d');
  const switchCameraBtn = document.getElementById('switchCameraBtn');

  let currentStream;
  let videoDevices = [];
  let currentDeviceIndex = 0;

  function stopStream() {
    if (currentStream) {
      currentStream.getTracks().forEach(track => track.stop());
    }
  }

  async function getVideoDevices() {
    const devices = await navigator.mediaDevices.enumerateDevices();
    videoDevices = devices.filter(device => device.kind === 'videoinput');
  }

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
        videoElement.play();
        canvasElement.width = videoElement.videoWidth;
        canvasElement.height = videoElement.videoHeight;
      };
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert(`Camera error: ${error.message}`);
    }
  }

  switchCameraBtn.addEventListener('click', async () => {
    if (videoDevices.length > 1) {
      currentDeviceIndex = (currentDeviceIndex + 1) % videoDevices.length;
      await startCamera(videoDevices[currentDeviceIndex].deviceId);
    } else {
      alert("No alternate camera found.");
    }
  });

  await getVideoDevices();
  if (videoDevices.length === 0) {
    alert('No video devices found.');
    return;
  }
  await startCamera(videoDevices[currentDeviceIndex].deviceId);
});
