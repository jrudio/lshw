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

  console.log(memory);
    // // format into expected output
    // .then(data => {
    //   console.log(data);
    //   machineData.push(data)

    //   return machineData;
    // })
    // .then(allMachineData => {
    //   // turn into JSON
    //   let output = null;

    //   try {
    //     output = JSON.stringify(allMachineData, null, '\t');
    //   } catch (err) {
    //     throw err;
    //   }

    //   return output;
    // })
    // // write to disk as machinedata.json
    // .then(allMachineDataStr => fs.writeFileSync(outputPath, allMachineDataStr))
    // .catch(err => console.log(`getting machine data and saving failed: ${err}`));
};

const outputPath = path.join(__dirname, 'machinedata.json');

getMachineDataAndSave(outputPath);