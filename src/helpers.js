const os = require('os');
const systemInfo = require('systeminformation');

// credit to stackoverflow for this conversion :D
// https://stackoverflow.com/a/33837719
const convertToGB = (n = 0) => {
  let gb = n / Math.pow(1024, 3);

  if (gb === 0) {
    return gb;
  }

  if (gb < 1) {
    return parseFloat(gb.toString().slice(0, 4));
  }

  return Math.trunc(n / Math.pow(1024, 3));
};

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
  return systemInfo.diskLayout().then(diskLayoutDevices => {
    const storageDevices = [];

    for (let i = 0; i < diskLayoutDevices.length; i++) {
      let d = diskLayoutDevices[i];

      storageDevices.push(
        {
          name: d.name,
          total: convertToGB(parseInt(d.size)),
          available: 0, // couldn't figure out how to get??
          type: d.type
        }
      );
    }

    return storageDevices;
  });
};

module.exports.getNetworkInterfaces = () => {
  let interfaces = os.networkInterfaces();

  let formattedInterfaces = [];

  for (let interface in interfaces) {
    for (let i = 0; i < interfaces[interface].length; i++) {
      let element = interfaces[interface][i];

      if (element.family === 'IPv4') {
        formattedInterfaces.push({
          name: interface,
          ip: element.address,
          netmask: element.netmask
        });
      }
    }
  }

  return formattedInterfaces;
};

module.exports.getMemory = () => {
  const total = os.totalmem();
  const available = os.freemem();

  return {
    total: convertToGB(total),
    available: convertToGB(available)
  };
};