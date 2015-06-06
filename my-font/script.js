function Font(o) {
  if (!(this instanceof Font)) {
    return new Font(o);
  }
  this.ctx = o.ctx;
  this.font = o.font;
  this.width = o.width;
  this.height = o.height;
  this.map = [];
  var cs = o.colors || [[255, 255, 255]];
  for (var i = 0; i < cs.length; i++) {
    this.createMap(cs[i]);
  }
}
Font.prototype.createMap = function (c) {
  var cv = document.createElement('canvas');
  var w = this.width * this.font.length;
  var h = this.height;
  cv.width = w;
  cv.height = this.height;
  var ctx = cv.getContext('2d');
  var imd = ctx.getImageData(0, 0, w, h);
  var d = imd.data;
  var i;
  for (i = 0; i < this.font.length; i++) {
    var ix = i * this.width;
    for (var y = 0; y < this.height; y++) {
      for (var x = 0; x < this.width; x++) {
        var b = this.font[i][y] & (1 << x);
        d[(y * w + ix + x) * 4] = b ? c[0] : 0;
        d[(y * w + ix + x) * 4 + 1] = b ? c[1] : 0;
        d[(y * w + ix + x) * 4 + 2] = b ? c[2] : 0;
        d[(y * w + ix + x) * 4 + 3] = b ? 255 : 0;
      }
    }
  }
  ctx.putImageData(imd, 0, 0);
  this.map.push(cv);
};
Font.prototype.draw = function (text, x, y, w, h, color) {
  w = w || this.width;
  h = h || this.width;
  color = typeof color === 'undefined' ? 15 : color;
  for (var i = 0; i < text.length; i++) {
    var c = text.charCodeAt(i);
    this.ctx.drawImage(this.map[color], c * this.width, 0, this.width, this.height, x + i * w, y, w, h);
  }
};
function init() {
  var cv = document.getElementById('cv');
  var ctx = cv.getContext('2d');
  ctx.imageSmoothingEnabled = false;

  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.fillRect(0, 0, cv.width, cv.height);

  var xhr = new XMLHttpRequest();
  function xhrHandler() {
    if (xhr.status !== 200) {
      console.error('xhr.status !== 200');
      return;
    }
    initFont(JSON.parse(xhr.responseText));
  }
  xhr.addEventListener('load', xhrHandler);
  xhr.open('GET', 'font.json');
  xhr.send(null);

  function initFont(arr) {
    var cs = [
      [0,0,0],[192,0,0],[0,192,0],[192,192,0],[0,0,192],[192,0,192],[0,192,192],[192,192,192],
      [0,0,0],[255,0,0],[0,255,0],[255,255,0],[0,0,255],[255,0,255],[0,255,255],[255,255,255]
    ];
    var font = new Font({
      ctx: ctx,
      font: arr,
      width: 8,
      height: 8,
      colors: cs
    });
    var a = [];
    for (var x = 0; x < 32; x++) {
      for (var y = 0; y < 32; y++) {
        a.push([x, y]);
      }
    }
    function randint(n) {
      return Math.random() * n | 0;
    }
    function shuffle(a) {
      var i = a.length;
      while (i > 1) {
        var j = randint(i);
        var t = a[--i];
        a[i] = a[j];
        a[j] = t;
      }
    }
    shuffle(a);
    var i = 0;
    function loop() {
      if (i === a.length) {
        return;
      }
      var c = randint(cs.length);
      var s = 0x41 + randint(26);
      font.draw(String.fromCharCode(s), a[i][0] * 8, a[i][1] * 8, 8, 8, c);
      i++;
      setTimeout(loop, 1000 / 15);
    }
    setTimeout(loop, 1000 / 15);
  }
}
window.addEventListener('load', init);
