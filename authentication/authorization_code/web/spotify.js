let now_playing = document.querySelector('.now-playing');
let music_art = document.querySelector('.music_art');
let music_name = document.querySelector('.music-name');
let music_artist = document.querySelector('.music-artist');
let playpause_btn = document.querySelector('.playpause-track');
let previous_btn = document.querySelector('.prev-track');
let next_btn = document.querySelector('.next-track');
let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let current_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave'); 
let randomIcon = document.querySelector('.fa-random');
let current_track = document.createElement('audio');
const volumeIcon = document.querySelector('.volume-icon');
const playButton = document.querySelector('.play-button');


const micIcon = document.querySelector('.mic-icon');
const micButton = document.querySelector('#micBtn');
const randomBtn = document.querySelector('#randomBtn');
const prevBtn = document.querySelector('#prevBtn');
const playPauseBtn = document.querySelector('#playPauseBtn');
const nextBtn = document.querySelector('#nextBtn');
const repeatBtn = document.querySelector('#repeatBtn');

let trackPlaying = false;
let micOn = false;
let randomOn = false;



let musicIndex = 0;
let isRandom = false;
let isPlaying = false;
let updateTimer;
let volumeMuted = false;



function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
    randomOn = true;
}
function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}

function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
var audio = null;

function playTrack(){
  var previewUrl = $('.play-button').data('preview-url');
  audio = new Audio(previewUrl);
  audio.play();
}

function pauseTrack() {
    if (audio) {
      audio.pause();
    }
  }
// --------- voice recognition part starts

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; // if none exists -> undefined


if(SpeechRecognition){
    console.log("Your browser supports speech recognition");
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";
  
    micIcon.addEventListener("click", micBtnClick);

    function micBtnClick() {
      if(!micOn) { // Start Voice Recognition
        recognition.start(); // First time you have to allow access to mic!
        micButton.innerHTML = `
            <span class="material-symbols-outlined">
                mic
            </span>
        `;
        micOn = true;
      }
      else {
        recognition.stop();
        micOn = false;
      }
    }
  
    recognition.addEventListener("start", startSpeechRecognition); // <=> recognition.onstart = function() {...}
    function startSpeechRecognition() {
        micButton.innerHTML = `
            <span class="material-symbols-outlined">
                mic
            </span>
        `;
        micOn = true;
      console.log("Voice activated, SPEAK");
    }
  
    recognition.addEventListener("end", endSpeechRecognition); // <=> recognition.onend = function() {...}
    function endSpeechRecognition() {
        micButton.innerHTML = `
            <span class="material-symbols-outlined">
                mic_off
            </span>
        `;
        recognition.stop();
        micOn = false;

      console.log("Speech recognition service disconnected");
    }

    recognition.addEventListener("result", resultOfSpeechRecognition); // <=> recognition.onresult = function(event) {...} - Fires when you stop talking
    function resultOfSpeechRecognition(event) {
      const current = event.resultIndex;
      const transcript = event.results[current][0].transcript;
      
      if(transcript.toLowerCase().trim()==="Hey musify") {
        if(micOn == true){
            console.log("Voice activated, SPEAK");
        }else{
            recognition.start();
            console.log("Voice activated, SPEAK");
            micButton.innerHTML = `
                <span class="material-symbols-outlined">
                    mic
                </span>
            `;
        }
      }
      else {
        if(transcript.toLowerCase().trim()==="play") {
            if(micOn == true){
                playpauseTrack();
                console.log("Voice activated, playing music");
            }else{
                recognition.start();
                playpauseTrack();
                console.log("Voice activated, playing music");
            }
            
        }
        else if(transcript.toLowerCase().trim()==="pause" || transcript.toLowerCase().trim()==="pause music") {
            if(micOn == true){
                playpauseTrack();
                console.log("Voice activated, music paused");
            }else{
                recognition.start();
                playpauseTrack();
                console.log("Voice activated, music paused");
            }
        }
        else {
            console.log("Invalid Voice Command or Speak Louder, Please try again...");
        }
      }
    }
}else{
    console.log("Your Browser does not support speech Recognition");
    info.textContent = "Your Browser does not support Speech Recognition";
}

// ------- voice recognition part ends
