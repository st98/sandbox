if (!(String.prototype.startsWith)) {
  String.prototype.startsWith = function (s) {
    return this.slice(0, s.length) === s;
  };
}
function output(url) {
  var out = document.getElementById('output');
  var img = new Image();
  img.src = url;
  img.addEventListener('load', function () {
    out.appendChild(img);
  }, false)
}
function processBlob(blob) {
  var reader = new FileReader();
  reader.addEventListener('load', function (ev) {
    output(ev.target.result);
  }, false);
  reader.readAsDataURL(blob);
}
function handler(ev) {
  var items = ev.clipboardData.items;
  Array.prototype.forEach.call(items, function (item) {
    if (!item.type.startsWith('image/')) {
      return;
    }
    var blob = item.getAsFile();
    processBlob(blob);
  });
}
document.addEventListener('paste', handler, false);
