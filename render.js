function h_id(a) {
  return document.getElementById(a);
}

var functions = {};

var canvases = [];

h_id("generate").onclick = () => {
  var width = parseInt(h_id("x-size").value);
  var height = parseInt(h_id("y-size").value);
  var scale = parseInt(h_id("scale").value);
  var split = parseInt(h_id("split").value);
  var funct = h_id("function").value;
  var delay = parseInt(h_id("delay").value);
  var canvwidth = width / split;
  var canvheight = height / split;
  var camw = parseFloat(h_id("areaw").value);
  var camh = parseFloat(h_id("areah").value);
  var camx = parseFloat(h_id("areax").value);
  var camy = parseFloat(h_id("areay").value);
  var params = h_id("params").value;
  var rangew = (camw/2) / split;
  var rangeh = (camh/2) / split;
  for (var i = 0, imax = canvases.length; i < imax; i++) {
    canvases[i].remove();
  }
  canvases = [];
  canvases.push(document.createElement("canvas"));
  canvases[0].width = width / scale;
  canvases[0].height = height / scale;
  var ctx0 = canvases[0].getContext("2d");
  h_id("canvbox").append(canvases[0]);
  canvases.push(document.createElement("canvas"));
  canvases[1].width = canvwidth;
  canvases[1].height = canvheight;
  var ctx1 = canvases[1].getContext("2d");
  h_id("canvbox").append(canvases[1]);
  canvases.push(document.createElement("canvas"));
  canvases[2].width = canvwidth / scale;
  canvases[2].height = canvheight / scale;
  var ctx2 = canvases[2].getContext("2d");
  h_id("canvbox").append(canvases[2]);
  (async () => {
    console.time("draw");
    for (var x = 0, xmax = split; x < xmax; x++) {
      for (var y = 0, ymax = split; y < ymax; y++) {
        if (functions[funct]) {
          await functions[funct](canvases[1], x * rangew - camw/4 - camx, (y+1) * -rangeh + camh/4 - camy, rangew, rangeh, delay, params);
        }
        ctx2.save();
        ctx2.scale(1 / scale, 1 / scale);
        ctx2.drawImage(canvases[1], 0, 0);
        ctx0.drawImage(canvases[2], x * canvwidth / scale, y * canvheight / scale);
        ctx2.restore();

      }
    }
    h_id("outimg").src = canvases[0].toDataURL();
    console.timeEnd("draw");
  })();
}

async function delay(ms) {
  return new Promise(yey => {
    setTimeout(yey, ms);
  })
}
