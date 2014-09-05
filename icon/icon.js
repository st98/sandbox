window.addEventListener('load', function main() {
  var cv, ctx;

  function randint(min, max) {
    if (typeof max === 'undefined') {
      max = min;
      min = 0;
    }

    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function color(r, g, b) {
    return 'rgb(' + [r, g, b].join(', ') + ')';
  }

  function ig(x, d) {
    return x > d ? d : x;
  }

  function render(ctx, n) {
    var cv, width, height, x, y, w, h, mx, my;

    cv = ctx.canvas;

    width = cv.width;
    height = cv.height;

    ctx.fillStyle = color(255, 255, 255);
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = color(0, 0, 0);

    w = width / n;
    h = height / n;

    for (x = 0; x < n; x++) {
      for (y = 0; y < n; y++) {
        mx = 255 * Math.abs(n - x) / n;
        my = 255 * Math.abs(n - y) / n;
        ctx.fillStyle = color(
          randint(ig(mx - 16, 255), ig(mx + 16, 255)),
          randint(ig(my - 16, 255), ig(my + 16, 255)),
          96
        );
        ctx.fillRect(x * w, y * h, w, h);
      }
    }
  }

  cv = document.getElementById('cv');
  ctx = ctx = cv.getContext('2d');

  render(ctx, 32);

  cv.addEventListener('mousemove', render.bind(null, ctx, 32), false);
  cv.addEventListener('click', function () {
    window.open(cv.toDataURL());
  });
}, false);