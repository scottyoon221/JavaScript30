var buttons = document.querySelectorAll(`.timer__button`);
var timeLeft = document.querySelector(`h1`);
var endTime = document.querySelector(`p`);
var input = document.querySelector(`input`);
var title = document.querySelector(`title`);
var interval;

function setTimer() {
  var second = parseInt(this.dataset.time)
  countTime(second);
  beBackAt(second);
}

function submitTimer (e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    countTime(parseInt(this.value)*60)
    beBackAt(parseInt(this.value)*60);
  }
}

function countTime(second) {
  clearInterval(interval);
  displayTime(second);
  second--;
  interval = setInterval(function(){
    if (second < 0) {
      clearInterval(interval);
      return
    }
    displayTime(second);
    second--;
  }, 1000);
}

function beBackAt(second) {
  var today = new Date();
  var min = parseInt(today.getMinutes()) + Math.floor(second/60);
  if (min > 59) {
    min -= 60;
    hour = today.getHours()+1;
    if (min < 10) {
      min = "0" + min;
    }
  } else {
    hour = today.getHours();
  }
  endTime.textContent = `Be Back At ${hour%12 === 0? 12 :  hour%12}:${min}`;
}
function displayTime(second) {
  textContent = `${Math.floor(second/60)}:${second%60 < 10 ? '0' + second%60 : second%60}`;

  timeLeft.textContent = textContent;
  title.textContent = textContent;
}

buttons.forEach(button => button.addEventListener('click', setTimer))
input.addEventListener('keypress', submitTimer);
