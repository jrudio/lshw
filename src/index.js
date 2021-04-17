const fs = require('fs');
const path = require('path');
const os = require('os');

const {
  getCPUs,
  getMemory,
  getStorageDevices,
  getNetworkInterfaces,
  convertToGhz
} = require('./helpers');

const getMachineDataAndSave = (outputPath = '') => {
  let machineData = [];

  // get relevant info
  let cpus = getCPUs();

  cpus = cpus.map(cpu => ({
    Description: `${cpu.model} @ ${convertToGhz(cpu.speed)}GHz`,
    NumberOfCores: cpu.cores
  }));

  let memory = [];
  let mem = getMemory();

  memory.push({
    InstalledGB: mem.total,
    AvailableGB: mem.available
  });

  getStorageDevices().then(devices => {
    return devices.map(device => ({
      Description: device.name,
      CapacityGB: device.total,
      AvailableGB: device.available,
      Type: device.type,
    }));
  })
  .then(storageDevices => {
    const interfaces = getNetworkInterfaces();

    let formattedInterfaces = [];

    for (let i = 0; i < interfaces.length; i++) {
      let interface = interfaces[i];

      formattedInterfaces.push({
        Description: interface.name,
        IP: interface.ip,
        Netmask: interface.netmask
      });
    }

    machineData.push({
      CPUs: cpus,
      Memory: memory,
      Storage: storageDevices,
      Network: formattedInterfaces
    });

    return machineData;
  })
  .then(allMachineData => {
    // turn into JSON
    let output = null;

    try {
      output = JSON.stringify(allMachineData, null, '\t');
    } catch (err) {
      throw err;
    }

    return output;
  })
  // write to disk as machinedata.json
  .then(allMachineDataStr => fs.writeFileSync(outputPath, allMachineDataStr))
  .catch(err => console.log(`getting machine data and saving failed: ${err}`));
};

const outputPath = path.join('.', 'machinedata.json');

getMachineDataAndSave(outputPath);