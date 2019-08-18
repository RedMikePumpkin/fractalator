functions.grid = async (canv, rx, ry, rw, rh, del) => {
  var ctx = canv.getContext("2d");
  var pxw = canv.width;
  var pxh = canv.height;
  var i = 0;
  for (var x = 0; x < pxw; x++) {
    for (var y = 0; y < pxh; y++) {
      var xp = rx + (x * rw / pxw);
      var yp = ry + rh - (y * rh / pxh);
      if (Math.abs((Math.floor(xp) + Math.floor(yp)) % 2) < 1) {
        ctx.fillStyle = "#fff";
      } else {
        ctx.fillStyle = "#7f7f7f";
      }
      ctx.fillRect(x, y, 1, 1);
      i++
      if (i > del) {
        i -= del;
        await delay(0);
      }
    }
  }
};

functions.base = async (canv, rx, ry, rw, rh, del, colf) => {
  var ctx = canv.getContext("2d");
  var pxw = canv.width;
  var pxh = canv.height;
  var i = 0;
  for (var x = 0; x < pxw; x++) {
    for (var y = 0; y < pxh; y++) {
      var xp = rx + (x * rw / pxw);
      var yp = ry + rh - (y * rh / pxh);
      ctx.fillStyle = colf(xp, yp);
      ctx.fillRect(x, y, 1, 1);
      i++
      if (i > del) {
        i -= del;
        await delay(0);
      }
    }
  }
};

functions.gradient = async (canv, rx, ry, rw, rh, del) => {
  return functions.base(canv, rx, ry, rw, rh, del, (x, y) => {
    return "rgba(" +
      ((x / 8 + 0.5) * 256).toString() + ", " +
      ((1 - (y / 4.5 + 0.5)) * 256).toString() + ", " +
      ((1 - (x / 8 + 0.5)) * 256).toString() + ", " +
      "1" + ")";
  });
}
