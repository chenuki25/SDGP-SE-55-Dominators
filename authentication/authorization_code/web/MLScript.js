window.onload = async () => {
  const cameraToggle = document.querySelector('#camera-on');
  let stream = null;
  let model = null;
  let predictInterval;

  cameraToggle.addEventListener('change', async () => {
    if (cameraToggle.checked) {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        // access to camera stream
        console.log('Camera stream started');

        // Load the machine learning model
        model = await tf.loadLayersModel('./Ml_Model/model.json');
        console.log('Model loaded');

        // Get the video element from the HTML
        const videoElement = document.getElementById('video');

        // Attach the camera stream to the video element
        videoElement.srcObject = stream;

        // Wait for the video to load metadata
        await videoElement.play();
        console.log('Video started');

        // Set up the gesture recognition loop
        while (cameraToggle.checked) {
          // Get the image data from the video element
          const image = videoElement;

          // Perform prediction every 2 seconds
          if (!predictInterval) {
            predictInterval = setInterval(async () => {
              const gesture = await predictGesture(model, image);
              console.log('Recognized gesture:', gesture);
            }, 5000);
          }

          await tf.nextFrame();
        }
      } catch (error) {
        console.error('Failed to get camera stream or load model', error);
        // handle error
      }
    } else {
      // stop camera stream
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        stream = null;
        console.log('Camera stream stopped');
      }
      clearInterval(predictInterval);
    }
  });
};

// Predict the hand gesture from an input image
async function predictGesture(model, image) {
  // Convert the image to a tensor
  const tensor = tf.browser.fromPixels(image)
    .resizeNearestNeighbor([120, 320])
    .mean(2)
    .expandDims(2)
    .expandDims()
    .toFloat()
    .div(tf.scalar(255.0));

  // Make a prediction using the model
  const prediction = await model.predict(tensor).data();

  // Get the index of the maximum value in the prediction array
  const index = prediction.indexOf(Math.max(...prediction));

  // Return the predicted hand gesture as a string
  if (index === 1) {
    return 'ok';
  } else if (index === 2) {
    return 'I';
  } else if (index === 3) {
    return 'palm-Moved';
  } else if (index === 4) {
    return 'index';
  } else if (index === 5) {
    return 'down';
  } else if (index === 6) {
    return 'thumb';
  } else if (index === 7) {
    return 'fist';
  } else if (index === 8) {
    return 'c';
  } else if (index === 9) {
    return 'fist-Moved';
  } else if (index === 0) {
    return 'palm';
  }
}
