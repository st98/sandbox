window.addEventListener('load', function main() {
  var plaintext, ciphertext, range;

  function crypt(str, n) {
    var i, c, result = '';

    for (i = 0; i < str.length; i++) {
      c = str.charCodeAt(i);
      result += String.fromCharCode(
        c >= 0x41 & c < 0x41 + 26 ? (c - 0x41 + n) % 26 + 0x41 :
        c >= 0x61 & c < 0x61 + 26 ? (c - 0x61 + n) % 26 + 0x61 :
        c
      );
    }

    return result;
  }

  plaintext = document.getElementById('plaintext');
  ciphertext = document.getElementById('ciphertext');
  range = document.getElementById('range');

  function update() {
    ciphertext.value = crypt(plaintext.value, parseInt(range.value, 10));
  }

  plaintext.addEventListener('keyup', update);
  range.addEventListener('mousemove', update);
}, false);