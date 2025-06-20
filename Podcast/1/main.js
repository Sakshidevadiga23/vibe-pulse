let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

let curr_track = document.createElement('audio');

let track_list = [
  {
    name: "The Ranveer Show",
    artist: "Ranveer Allahbadia",
    image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQm_DsHYFWCpvZEV9JzE11bFNR2sHFiHVdNl1zsrdiHPsJi6gaY",
    path: "1.mp3"
  },
  {
    name: "Iman Gadzhi",
    artist: "Iman Gadzhi",
    image: "https://yt3.googleusercontent.com/5Htuzq6VCqJfCZmu_tnwNy5d1Zs_UgN8UjZRlNcXvdfa_vwer5UAuCh3cgBs-QjEIqu2gd4XfQ=s900-c-k-c0x00ffffff-no-rj",
    path: "2.mp3"
  },
  {
    name: "Alex Kime Podcasts",
    artist: "Alex Kime",
    image: "https://i.ytimg.com/vi/3jkNxJ4c9Qc/sddefault.jpg",
    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_Shipping_Lanes.mp3",
  },
  {
    name: "Modern Wisdom",
    artist: "Chris Williamson",
    image: "https://chriswillx.com/wp-content/uploads/2023/07/New_2023_Podcast_Artwork-768x768.jpg",
    path: "4.mp3"
  },
  {
    name: "The Diary of a CEO",
    artist: "Steven Bartletturs",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJrA7bFaYKzo085aKfa21hdXUVJvc8l3uCVw&s",
    path: "5.mp3"
  },
  {
    name: "Luke Belmar",
    artist: "Luke Belmar",
    image: "https://i.scdn.co/image/ab6765630000ba8a3d30f07b005c35c22b84027e",
    path: "6.mp3"
  },
];

function random_bg_color() {
  document.body.style.background = "url('https://images.pexels.com/photos/29101881/pexels-photo-29101881/free-photo-of-vibrant-abstract-gradient-background-art.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')";
}


function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent = "Podcast";

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
  random_bg_color();
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Load the first track in the tracklist
loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}


