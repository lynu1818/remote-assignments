const url =
  "https://ec2-54-64-246-136.ap-northeast_1.compute.amazonaws.com/delay-clock";
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function requestSync(url) {
  // write code to request url synchronously
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, false); // 第三個參數 `false` 使得請求為同步
  xhr.send();

  if (xhr.status !== 200) {
    throw new Error(
      `Request failed with status ${xhr.status}: ${xhr.statusText}`
    );
  }

  return xhr.responseText;
}
requestSync(url); // would print out the execution time
requestSync(url);
requestSync(url);
