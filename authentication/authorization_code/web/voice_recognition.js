//Define the speech recognition object
const recognition = new webkitSpeechRecognition();
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;
let micOn = false;

//Add event listeners for the recognition object
recognition.onresult = function(event) {
  const result = event.results[0][0].transcript.trim().toLowerCase();
  console.log('Speech recognition result:', result);
  switch (result) {
    case 'random':
      randomTrack();
      break;
    case 'previous':
      prevTrack();
      break;
    case 'play':
      playpauseTrack();
      break;
    case 'pause':
      playpauseTrack();
      break;
    case 'next':
      nextTrack();
      break;
    case 'repeat':
      repeatTrack();
      break;
    default:
      console.log('Unknown command: ' + result);
  }
};
recognition.onerror = function(event) {
  console.error('Speech recognition error occurred: ' + event.error);
  if (event.error == 'no-speech') {
    // Display a message to the user
    const message = document.createElement('p');
    message.innerText = 'No speech was detected. Please try again.';
    document.body.appendChild(message);
  }
};

// Add a function to start speech recognition
function startSpeechRecognition() {
  console.log('Starting speech recognition...');
  recognition.start();
  micOn = true;
}

document.addEventListener('keydown', function(event) {
    if(!micOn && event.key === 'r'){
        startSpeechRecognition();
    }else if(micOn && event.key === 'r'){
        micOn = false;
        console.log('Speech recognition stoped...');
        recognition.stop();
    }
});