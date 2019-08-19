var image__loadedImage = new Image();
var image__imageCanvas = document.createElement("canvas");
var image__ctx = image__imageCanvas.getContext("2d");

async function image__load(file) {
  return new Promise(yey => {
    image__loadedImage.onload = () => {
      image__imageCanvas.width = image__loadedImage.width;
      image__imageCanvas.height = image__loadedImage.height;
      image__ctx.drawImage(image__loadedImage, 0, 0);
      yey();
    }
    image__loadedImage.src = file;
  });
}

functions.image = async (canv, rx, ry, rw, rh, del, params) => {
  var ctx = canv.getContext("2d");
  var pxw = canv.width;
  var pxh = canv.height;
  var pixeldata;
  var i = 0;
  await image__load(params);
  for (var x = 0; x < pxw; x++) {
    for (var y = 0; y < pxh; y++) {
      var xp = rx + (x * rw / pxw);
      var yp = ry + rh - (y * rh / pxh);
      pixeldata = image__ctx.getImageData(Math.floor(xp), Math.floor(image__loadedImage.height - yp), 1, 1
      ).data;
      ctx.fillStyle = "rgba(" +
        pixeldata[0].toString() + ", " +
        pixeldata[1].toString() + ", " +
        pixeldata[2].toString() + ", " +
        pixeldata[3].toString() + ")";
      ctx.fillRect(x, y, 1, 1);
      i++
      if (i > del) {
        i -= del;
        await delay(0);
      }
    }
  }
};
