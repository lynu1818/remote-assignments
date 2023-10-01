const url = "https://ec2-54-64-246-136.ap-northeast-1.compute.amazonaws.com/delay-clock";
function requestCallback(url, callback) {
 // write code to request url asynchronously
}
function requestPromise(url) {
 // write code to request url asynchronously with Promise
}
async function requestAsyncAwait(url) {
 // write code to request url asynchronously
 // you should call requestPromise here and get the result using
async/await.
}
requestCallback(url, console.log); // would print out the execution time
requestPromise(url).then(console.log);
requestAsyncAwait(url);