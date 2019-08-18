//play video
var progress = document.querySelector(`.progress`);
var progressFilled = document.querySelector(`.progress__filled`);
var playButton = document.querySelector(`button[class="player__button toggle"]`);
var volumeSlider = document.querySelector(`input[name="volume"]`);
var playbackSlider = document.querySelector(`input[name="playbackRate"]`);
var backButton = document.querySelector(`button[data-skip="-10"]`);
var forwardButton = document.querySelector(`button[data-skip="25"]`);
var video = document.querySelector(`video`);
var toggleVideo = false
var progressWidth = 0;
var isMouseDown = false;

var updateProgressBar = function (progressWidth) {
  progressFilled.style.flexBasis = progressWidth.toString() + "%";
}

var scrub = function (e) {
  if (isMouseDown) {
    video.currentTime = video.duration * e.offsetX / width;
    progressWidth = 100 * e.offsetX / width;
    updateProgressBar(progressWidth);
  }
}

var handleProgress = function () {
  if(toggleVideo) {
    progressWidth += 100 * 1 / video.duration;
    updateProgressBar(progressWidth);
    console.log(video.ended, playButton.textContent);
    if(video.ended) {
      toggleVideo = !toggleVideo;
      video.pause();
      playButton.textContent = "►";
    }
  }
}

var togglePlay = function (e) {
  toggleVideo = !toggleVideo;
  if(toggleVideo) {
    if (video.ended) {
      progressWidth = 0;
      updateProgressBar(progressWidth);
    }
    e.target.textContent = "❚ ❚"
    video.play()
  } else {
    e.target.textContent = "►"
    video.pause();
  }
}

var slideVolume = function (e) {
   video.volume = e.target.value;
}

var slidePlayback = function (e) {
  video.playbackRate = e.target.value;
}

var skip = function(e) {
  progressWidth = 100 *(video.currentTime + parseInt(e.target.dataset.skip)) /video.duration;
  video.currentTime += parseInt(e.target.dataset.skip);
  updateProgressBar(progressWidth);
}

window.setInterval(handleProgress, 1000);
var width;
addEventListener("load", () => {
  width = progress.offsetWidth;
})
progress.addEventListener("mousemove", scrub);
progress.addEventListener("mousedown", (() => isMouseDown = true));

window.addEventListener("mouseup" , ((e) => {scrub(e); isMouseDown = false}));
playButton.addEventListener("click", togglePlay);
volumeSlider.addEventListener("input", slideVolume);
playbackSlider.addEventListener("input", slidePlayback);
backButton.addEventListener("click", skip);
forwardButton.addEventListener("click", skip);
