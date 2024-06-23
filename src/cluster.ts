import cluster from 'cluster';
import os from 'os';

function runPrimaryProcess() {
  const cpus = os.cpus().length * 2;

  console.log(`Primary ${process.pid} is running`);

  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }
}

function runWorkerProcess() {
  console.log(`Worker ${process.pid} started`);

  require('./main');
}

cluster.isPrimary ? runPrimaryProcess() : runWorkerProcess();
