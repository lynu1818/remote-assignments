const url =
  "https://ec2-54-64-246-136.ap-northeast-1.compute.amazonaws.com/delay-clock";
const request = require("sync-request");

function requestSync(url) {
  // write code to request url synchronously
  const label = `Request to ${url} at ${Date.now()}`;
  console.time(label);

  try {
    const response = request("GET", url);
    if (response.statusCode !== 200) {
      throw new Error(
        `Request failed with status ${response.statusCode}: ${response.statusMessage}`
      );
    }
    console.timeEnd(label);
    return response.getBody("utf8");
  } catch (error) {
    console.timeEnd(label);
    console.error("Error: ", error);
  }
}
requestSync(url); // would print out the execution time
requestSync(url);
requestSync(url);
