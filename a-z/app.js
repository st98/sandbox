(() => {

  const string = 'eval.name.constructor'; // String
  const number = '(typeof(this)).length.constructor'; // Number
  const array = `${string}().split().constructor`; // Array

  // 0-9
  let digitTable = {
    '0': `${number}(false)`,
    '1': `${number}(true)`
  };
  for (let i = 2; i < 10; i++) {
    digitTable[i] = `${string}()` + `.concat(${string}(${digitTable['1']}))`.repeat(i) + '.length';
  }

  // Cadefhmor,.()
  let charTable = {
    'f': `${string}(false).split(${string}()).reverse().pop()`,
    'r': `${string}(true).split(${string}()).slice(${digitTable['1']}).reverse().pop()`,
    'o': `(typeof(${string})).split(${string}()).reverse().slice(${digitTable['1']}).reverse().pop()`,
    'm': `(typeof(${digitTable['1']})).split(${string}()).slice(${digitTable['1']}).slice(${digitTable['1']}).reverse().pop()`,
    'C': `crypto.constructor.name.split(${string}()).reverse().pop()`, // Node.js: `console.constructor.name.split(${string}()).reverse().pop()`
    'h': `(typeof(true)).match.name.split(${string}()).pop()`,
    'a': `${string}(false).split(${string}()).slice(${digitTable['1']}).reverse().pop()`,
    'd': `(typeof(void(true))).split(${string}()).pop()`,
    'e': `${string}(false).split(${string}()).pop()`,
    ',': `${array}(${string}()).concat(${string}()).join()`
  };
  charTable['.'] = `${string}(eval(${string}(${digitTable['1']}).concat(${digitTable['1']}).concat(${charTable['e']}).concat(${digitTable['3']}).concat(${digitTable['0']}))).split(${string}()).slice(${digitTable['1']}).reverse().pop()`; // https://github.com/aemkei/jsfuck/blob/5be71932198e7a1bba545e4edea2bc308359b37b/jsfuck.js#L95

  const fromCharCode = `${string}().concat(` + 'fromCharCode'.split('').map(c => charTable[c]).join(').concat(') + ')';
  const stringFromCharCode = `${string}.name.concat(${charTable['.']}).concat(${fromCharCode})`;

  charTable['('] = `eval(${stringFromCharCode})(${string}(${digitTable['4']}).concat(${digitTable['0']}))`;
  charTable[')'] = `eval(${stringFromCharCode})(${string}(${digitTable['4']}).concat(${digitTable['1']}))`;

  const encodeNumber = (num) => {
    return `${string}().concat(` + (num + '').split('').map(c => digitTable[c]).join(').concat(') + ')';
  };

  const encodeString = (str) => {
    const charCodes = `${string}().concat(` + str.split('').map(c => encodeNumber(c.charCodeAt(0))).join(`).concat(${charTable[',']}).concat(`) + ')';
    return `eval(${stringFromCharCode}.concat(${charTable['(']}).concat(${charCodes}).concat(${charTable[')']}))`;
  };

  window.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('input');
    const output = document.getElementById('output');
    const length = document.getElementById('length');

    input.addEventListener('keyup', () => {
      const result = input.value === '' ? '' : `eval(${encodeString(input.value)})`;
      output.value = result;
      length.textContent = `Length: ${result.length}`;
    }, false);

    document.getElementById('copy').addEventListener('click', () => {
      navigator.clipboard.writeText(output.value).then(() => {
        console.log('copied');
      }).catch(() => {
        console.error('failed');
      });
    }, false);

    document.getElementById('save').addEventListener('click', () => {
      const blob = new Blob([output.value], {'type': 'application/javascript'});
      const link = document.createElement('a');
      link.download = 'result.js';
      link.href = URL.createObjectURL(blob);
      link.click();
    }, false);

    document.getElementById('eval').addEventListener('click', () => {
      eval(output.value);
    }, false);
  }, false);

})();