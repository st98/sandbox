window.addEventListener('load', function main() {
  var _slice = [].slice, url, xhr, repo, prop, content, ul, li, link, text;

  function format(str) {
    var args = _slice.call(arguments, 1); // Array.from
    var count = 0;
   
    return str.replace(/{([^}]+)?}/g, function (m, n) {
      if (typeof n === 'undefined') {
        return args[count++];
      } else {
        return args[0][n];
      }
    });
  }

  /**
   * 参考
   * - https://github.com/pazguille/github-card
   * - https://developer.github.com/v3/repos/contents/#get-contents
   */

  ul = document.getElementById('ul');

  url = format('https://api.github.com/repos/{user}/{repo}/contents', {
    user: 'st98',
    repo: 'sandbox'
  });

  xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onreadystatechange = function () {
    if (xhr.readyState !== xhr.DONE) {
      return;
    }

    if (xhr.status !== 200) {
      return;
    }

    repo = JSON.parse(xhr.responseText);

    for (prop in repo) {
      if (!repo.hasOwnProperty(prop)) {
        continue;
      }

      content = repo[prop];

      li = document.createElement('li');
      link = document.createElement('a');
      text = document.createTextNode(content.name + (content.type === 'dir' ? '/' : ''));

      link.href = content.html_url;
      link.title = content.name + (content.type === 'dir' ? '/' : '');

      link.appendChild(text);
      li.appendChild(link);
      ul.appendChild(li);
    }
  };

  xhr.send();
}, false);