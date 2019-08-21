const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function draw () {

  ctx.drawImage(video,0,0, canvas.width, canvas.height);
  var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);


  for (var i = 0; i < imgData.data.length; i += 4) {
  imgData.data[i - 150] = imgData.data[i + 0]; // RED
  imgData.data[i + 500] = imgData.data[i + 1]; // GREEN
  imgData.data[i - 550] = imgData.data[i + 2]; // Blue
  }
  ctx.putImageData(imgData, 0, 0);
}


if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
      video.srcObject = stream;
    })
    .catch(function (error) {
      console.log("Something went wrong!");
    });
}


window.setInterval(draw, 10);
