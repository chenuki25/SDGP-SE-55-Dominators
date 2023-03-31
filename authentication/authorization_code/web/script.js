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
    // random_bg_color();
}


function reset(){
    current_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
    pauseTrack();
    
}

function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
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

if (annyang) {
    // commands.
    const commands = {
      'play': () => { playpauseTrack() },
      'pause music': () => { playpauseTrack()},
      'pause': () => { playpauseTrack() },
      'next': () => { nextTrack() },
      'next song': () => { nextTrack() },
      'back': () => { prevTrack() },
      'previous song': () => { prevTrack() },
      'mute': () => { muteUnmute() },
      'unmute': () => { muteUnmute() },
      'volume up': () => { volumeUp() },
      'increase volume': () => { volumeUp() },
      'volume down': () => { volumeDown() },
      'decreace volume': () => { volumeDown() },

      'play random': () => { playRandom() },
      'trun on random': () => { playRandom() },
      'repeat on': () => { repeatTrack() },
      'repeat': () => { repeatTrack() },
      'turn on repeat': () => { repeatTrack() },
    };
  
    // Add commands to annyang
    annyang.addCommands(commands);
  
    // Start listening.
    annyang.start();
}

// ------- voice recognition part ends

