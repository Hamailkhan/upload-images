const PQueue = require("p-queue").default;

const uploadQueue = new PQueue({
  concurrency: 5,
  interval: 1000,
  intervalCap: 5,
});

module.exports = uploadQueue;
