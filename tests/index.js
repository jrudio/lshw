const {
  getCPUs,
  getMemory,
  getStorageDevices,
  getNetworkInterfaces,
  convertToGhz
} = require('../src/helpers');

const testGetCPUs = () => {
  const cpus = getCPUs();

  console.assert(cpus.length > 0, 'getCPUs() should return at least one cpu');

  console.assert(!!cpus[0].model, 'getCPUs() should have a model field');
  console.assert(!!cpus[0].speed, 'getCPUs() should have a speed field');
  console.assert(!!cpus[0].cores, 'getCPUs() should have a cores field');
  console.assert(typeof cpus[0].model === 'string', 'getCPUs() should have a model field of type string');
  console.assert(typeof cpus[0].speed === 'number', 'getCPUs() should have a speed field of type integer');
  console.assert(typeof cpus[0].cores === 'number', 'getCPUs() should have a cores field of type integer');
};

testGetCPUs();

const testGetStorageDevices = () => {
  getStorageDevices()
    .then(devices => {
      console.assert(devices.length > 0, 'getStorageDevices() should return at least one device');

      console.assert(!!devices[0].name, 'getStorageDevices() should have a name field');
      console.assert(!!devices[0].total, 'getStorageDevices() should have a total field');
      console.assert(devices[0].available !== undefined, 'getStorageDevices() should have an available field');
      console.assert(!!devices[0].type, 'getStorageDevices() should have a type field');
      console.assert(typeof devices[0].name === 'string', 'getStorageDevices() should have a name field of type string');
      console.assert(typeof devices[0].total === 'number', 'getStorageDevices() should have a total field of type integer');
      console.assert(typeof devices[0].available === 'number', 'getStorageDevices() should have a available field of type integer');
      console.assert(typeof devices[0].type === 'string', 'getStorageDevices() should have a type field of type string');
    })
    .catch(err => console.log(`could not get storage devices: ${err}`));
};

testGetStorageDevices();

const testGetMemory = () => {
  const memory = getMemory();

  console.assert(memory.total !== undefined, 'getMemory() should have a total field');
  console.assert(memory.available !== undefined, 'getMemory() should have an available field');
  console.assert(typeof memory.total === 'number', 'getMemory() should have a total field of type integer');
  console.assert(typeof memory.available === 'number', 'getMemory() should have a available field of type integer');
};

testGetMemory();

const testGetNetworkInterfaces = () => {
  const interfaces = getNetworkInterfaces();

  console.assert(interfaces.length > 0, 'getNetworkInterfaces() should return at least one interface');
  console.assert(interfaces[0].name !== undefined, 'getNetworkInterfaces() should have a name field');
  console.assert(interfaces[0].ip !== undefined, 'getNetworkInterfaces() should have a ip field');
  console.assert(interfaces[0].netmask !== undefined, 'getNetworkInterfaces() should have a netmask field');
  console.assert(typeof interfaces[0].name === 'string', 'getNetworkInterfaces() should have a name field of type string');
  console.assert(typeof interfaces[0].ip === 'string', 'getNetworkInterfaces() should have a ip field of type string');
  console.assert(typeof interfaces[0].netmask === 'string', 'getNetworkInterfaces() should have a netmask field of type string');
};

testGetNetworkInterfaces();