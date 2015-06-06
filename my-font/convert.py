import json
import os
from PIL import Image
a = []
w, h = 8, 8
for x in range(0, 0x80):
  p = 'images/' + chr(x) + '.png'
  if not (0x20 <= x < 0x7f and os.path.exists(p)):
    a.append([0] * w)
    continue
  im = Image.open(p)
  t = []
  for y in range(h):
    n = 0
    for x in range(w):
      if im.getpixel((x, y)) == 0:
        n |= 1 << x
    t.append(n)
  a.append(t)
print(json.dumps(a))