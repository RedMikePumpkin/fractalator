functions.mandelbrot = async (canv, rx, ry, rw, rh, del) => {
  return functions.base(canv, rx, ry, rw, rh, del, (x, y) => {
    var px = x;
    var py = y;
    var npx;
    for (var i = 0, imax = 200; i < imax; i++) {
      // quicc algebra
      // (a + bi)^2
      // (a + bi) * (a + bi)
      // a^2 + 2abi - b^2
      if ((px*px+py*py) > 4) {
        return "rgb(0, 0, " + Math.max(Math.pow(i / imax, 0.333), 0.125) * 256 + ")";
      }
      npx = px * px - py * py + x;
      py = 2 * px * py + y;
      px = npx;
    }
    return "#000";
  });
}


functions.mandelbrotfast = async (canv, rx, ry, rw, rh, del) => {
  var ctx = canv.getContext("2d");
  var pxw = canv.width;
  var pxh = canv.height;
  var i = 0;
  for (var x = 0; x < pxw; x++) {
    for (var y = 0; y < pxh; y++) {
      var xp = rx + (x * rw / pxw);
      var yp = ry + rh - (y * rh / pxh);
      var mth_px = xp;
      var mth_py = yp;
      var mth_npx;
      ctx.fillStyle = "#000";
      for (var mth_i = 0, mth_imax = 200; mth_i < mth_imax; mth_i++) {
        // quicc algebra
        // (a + bi)^2
        // (a + bi) * (a + bi)
        // a^2 + 2abi - b^2
        if ((mth_px*mth_px+mth_py*mth_py) > 4) {
          ctx.fillStyle = "rgb(0, 0, " + Math.max(Math.pow((mth_i / 200) % 1, 0.333), 0.125) * 256 + ")";
          break;
        }
        mth_npx = mth_px * mth_px - mth_py * mth_py + xp;
        mth_py = 2 * mth_px * mth_py + yp;
        mth_px = mth_npx;
      }
      ctx.fillRect(x, y, 1, 1);
      i++
      if (i > del) {
        i -= del;
        await delay(0);
      }
    }
  }
}
