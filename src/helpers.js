const os = require('os');

module.exports.getCPUs = () => {
  let cpus = [];

  let store = {};

  os.cpus().forEach(cpu => {
    if (store[cpu.model] !== undefined) {
      store[cpu.model].cores++;

      return;
    }

    store[cpu.model] = {
      cores: 1,
      speed: cpu.speed
    };

  });

  for (let model in store) {
    let cpu = store[model];

    cpus.push({
      cores: cpu.cores, // let's assume multithreading is enabled and just get the physical cores
      // cores: cpu.cores / 2, // let's assume multithreading is enabled and just get the physical cores
      speed: cpu.speed,
      model
    });
  }

  return cpus;
};

module.exports.convertToGhz = (n = 0) => {
  n = n.toString();

  n = n.slice(0, 3);

  return `${n[0]}.${n[1]}${n[2]}`;
};

module.exports.getStorageDevices = () => {

};

module.exports.getNetworkInterfaces = () => {

};

module.exports.getMemory = () => {

};