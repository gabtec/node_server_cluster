const http = require('http');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const api = require('./app');

const PORT = 8000;

if (cluster.isMaster) {
  console.log('Master process is running');
  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // if a node goes down, we restart a new child
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`);
    console.log('Starting a new worker');
    cluster.fork();
  });

} else {
  http.createServer(api).listen(PORT);

  console.log(`Listening on port ${PORT}`);
}
