//const fetch = require("node-fetch");

async function loadModule() {
  try {
    const module = await import("node-fetch");
    //console.log(module);
  } catch (err) {
    console.error(err);
  }
}

loadModule();

const url =
  "https://ec2-54-64-246-136.ap-northeast-1.compute.amazonaws.com/delay-clock";

function requestCallback(url, callback) {
  // write code to request url asynchronously
  fetch(url)
    .then((res) => res.json())
    .then((body) => callback(body))
    .catch((err) =>
      console.error("There has been a problem with your fetch operation: ", err)
    );
}
function requestPromise(url) {
  // write code to request url asynchronously with Promise
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((body) => resolve(body))
      .catch((err) => reject("Fetch error: " + err.message));
  });
}
async function requestAsyncAwait(url) {
  // write code to request url asynchronously
  // you should call requestPromise here and get the result using async/await.
  try {
    const result = await requestPromise(url);
    console.log(result);
  } catch (error) {
    console.error("Async/Await error: ", error);
  }
}
requestCallback(url, console.log); // would print out the execution time
requestPromise(url).then(console.log);
requestAsyncAwait(url);
