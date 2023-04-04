export{playpauseTrack, nextTrack, prevTrack, muteUnmute, volumeUp, volumeDown, repeatTrack, randomTrack, micOn, randomOn }


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



const Songs_list = [
    {
        img: "images/Hardwind.jpg",
        name: "Hardwind Want Me",
        artist: "Mike Archangelo",
        music : "music/Hardwind.mp3"
    },
    {
        img: 'images/stay.png',
        name : 'Stay',
        artist : ' Justin Bieber',
        music : 'music/stay.mp3'
    },
    {
        img: 'images/sun.jpg',
        name: "Sun Goes Down",
        artist: "Jim Yosef x Roy",
        music : "music/Sun Goes Down.mp3"
    },
    {
        img : 'images/fallingdown.jpg',
        name : 'Falling Down',
        artist : 'Wid Cards',
        music : 'music/fallingdown.mp3'
    },
    {
        img: "images/Anywhere.jpg",
        name: "Ikson Anywhere ",
        artist: "Audio Library",
        music : "music/Ikson Anywhere.mp3"
    },
    {
        img : 'images/faded.png',
        name : 'Faded',
        artist : 'Alan Walker',
        music : 'music/Faded.mp3'
    },
    {
        img: 'images/Jvna.jpg',
        name: "Crazy",
        artist: "Beauz & Jvna",
        music : "music/Beauz & Jvna.mp3"
    },
    {
        img : 'images/ratherbe.jpg',
        name : 'Rather Be',
        artist : 'Clean Bandit',
        music : 'music/Rather Be.mp3'
    },
    {
        img: "images/LostSky.jpg",
        name: "Vision NCS",
        artist: "NCS Release",
        music : "music/Lost Sky.mp3"
    },
    {
        img : 'images/lotus.jpg',
        name : 'Aniyam',
        artist : 'King Lotus',
        music : 'music/Aniyam - King Lotuss.mp3'
    },
    {
        img: "images/HarleyBird.jpg",
        name: "Harley Bird Home",
        artist: "Jordan Schor",
        music : "music/Harley Bird.mp3"
    }
];

loadTrack(musicIndex);

function loadTrack(musicIndex){
    clearInterval(updateTimer);
    reset();

    current_track.src = Songs_list[musicIndex].music;
    current_track.load();

    music_art.style.backgroundImage = "url(" + Songs_list[musicIndex].img + ")";
    music_name.textContent = Songs_list[musicIndex].name;
    music_artist.textContent = Songs_list[musicIndex].artist;
    now_playing.textContent = "Playing music " + (musicIndex + 1) + " of " + Songs_list.length;

    updateTimer = setInterval(setUpdate, 1000);

    current_track.addEventListener('ended', nextTrack);
}


function reset(){
    current_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
    pauseTrack();
    
}

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
function repeatTrack(){
    let current_index = musicIndex;
    loadTrack(current_index);
    playTrack();
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    current_track.play();
    isPlaying = true;
    music_art.classList.add('rotate');
    wave.classList.add('loader');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack(){
    current_track.pause();
    isPlaying = false;
    music_art.classList.remove('rotate');
    wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack(){
    if(musicIndex < Songs_list.length - 1 && isRandom === false){
        musicIndex += 1;
    }else if(musicIndex < Songs_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * Songs_list.length);
        musicIndex = random_index;
    }else{
        musicIndex = 0;
    }
    loadTrack(musicIndex);
    playTrack();
}
function prevTrack(){
    if(musicIndex > 0){
        musicIndex -= 1;
    }else{
        musicIndex = Songs_list.length -1;
    }
    loadTrack(musicIndex);
    playTrack();
}
function seekTo(){
    let seekto = current_track.duration * (seek_slider.value / 100);
    current_track.currentTime = seekto;
}
function setVolume(){
    current_track.volume = volume_slider.value / 100;
}

// ----- volume mute & unmute function starts
volumeIcon.addEventListener('click', muteUnmute)

function muteUnmute(){
    if(volumeMuted === false){
        volumeIcon.innerHTML = `
            <span class="material-symbols-outlined">
                volume_off
            </span>
        `;
        volume_slider.value = 0
        current_track.muted = true
        volumeMuted = true
    }else{
        volumeIcon.innerHTML = `
            <span class="material-symbols-outlined">
                volume_down
            </span>
        `;
        current_track.muted = false
        volume_slider.value = setVolume
        volumeMuted = false
    }
}

// ----- volume mute & unmute function ends


function volumeUp(){
    volume_slider.value += 10;
    current_track.volume = volume_slider.value / 100
}

function volumeDown(){
    volume_slider.value -= 10;
    current_track.volume = volume_slider.value / 100
}


function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(current_track.duration)){
        seekPosition = current_track.currentTime * (100 / current_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(current_track.currentTime / 60);
        let currentSeconds = Math.floor(current_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(current_track.duration / 60);
        let durationSeconds = Math.floor(current_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        current_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
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
            
        //   searchForm.submit();
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
        else if(transcript.toLowerCase().trim()==="next" || transcript.toLowerCase().trim()==="next song") {
            if(micOn == true){
                nextTrack();
                console.log("Voice activated, playing next song");
            }else{
                recognition.start();
                nextTrack();
                console.log("Voice activated, playing next song");
            }
        }
        else if(transcript.toLowerCase().trim()==="back" || transcript.toLowerCase().trim()==="previous song") {
            if(micOn == true){
                prevTrack();
                console.log("Voice activated, playing previous song");
            }else{
                recognition.start();
                prevTrack();
                console.log("Voice activated, playing previous song");
            }
        }
        else if(transcript.toLowerCase().trim()==="mute" || transcript.toLowerCase().trim()==="mute volume") {
            if(micOn == true){
                muteUnmute()
                console.log("Voice activated, volume muted");
            }else{
                recognition.start();
                muteUnmute()
                console.log("Voice activated, volume muted");
            }
        }
        else if(transcript.toLowerCase().trim()==="unmute" || transcript.toLowerCase().trim()==="unmute volume") {
            if(micOn == true){
                muteUnmute()
                console.log("Voice activated, volume unmuted");
            }else{
                recognition.start();
                muteUnmute()
                console.log("Voice activated, volume unmuted");
            }
        }
        else if(transcript.toLowerCase().trim()==="volume up") {
            if(micOn == true){
                volumeUp()
                console.log("Voice activated, increasing the volume");
            }else{
                recognition.start();
                volumeUp()
                console.log("Voice activated, increasing the volume");
            }
        }
        else if(transcript.toLowerCase().trim()==="volume down") {
            if(micOn == true){
                volumeDown()
                console.log("Voice activated, decreacing the volume");
            }else{
                recognition.start();
                volumeDown()
                console.log("Voice activated, decreacing the volume");
            }
        }
        else if(transcript.toLowerCase().trim()==="repeat" || transcript.toLowerCase().trim()==="turn on repeat") {
            if(micOn == true){
                repeatTrack()
                console.log("Voice activated, repeating");
            }else{
                recognition.start();
                repeatTrack()
                console.log("Voice activated, repeating");
            }
        }
        else if(transcript.toLowerCase().trim()==="random" || transcript.toLowerCase().trim()==="turn on random") {
            if(micOn == true){
                randomTrack()
                if(!randomOn){
                    console.log("Voice activated, turned off random");
                    randomOn = false;
                }else{
                    console.log("Voice activated, turned on random");
                }
            }else{
                recognition.start();
                randomTrack()
                if(!randomOn){
                    console.log("Voice activated, turned off random");
                    randomOn = false;
                }else{
                    console.log("Voice activated, turned on random");
                }
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

