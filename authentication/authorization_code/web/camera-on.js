const cameraToggle = document.querySelector('#camera-on');

let stream = null;

cameraToggle.addEventListener('change', async () => {
  if (cameraToggle.checked) {
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // access to camera stream
    } catch (error) {
      console.error('Failed to get camera stream', error);
      // handle error
    }
  } else {
    // stop camera stream
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      stream = null;
    }
  }
});
