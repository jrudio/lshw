const fs = require('fs');
const path = require('path');
const os = require('os');

// credit for the scope values from: https://stackoverflow.com/a/11632964
const getScope = (n = 0) => {
  switch (n) {
    case 0:
      return 'Host';
    case 2:
      return 'Link';
    case 4:
      return 'Link';
    default:
      return 'Unknown';
  }
};

const updateIpv6 = (inputPath, outputPath = '') => {
  // read and parse input file
  const inputFile = fs.readFileSync(inputPath);

  let machineData = null;

  try {
    machineData = JSON.parse(inputFile);
  } catch (err) {
    throw 'failed to parse json file';
  }

  // get list of current network interfaces
  const currentInterfaces = os.networkInterfaces();

  // update network contents to append ipv6
  for (let i = 0; i < machineData.length; i++) {
    let machine = machineData[i];

    for (let j = 0; j < machine.Network.length; j++) {
      let interface = machine.Network[j];

      for (let interfaceName in currentInterfaces) {
        let currentInterface = currentInterfaces[interfaceName];

        for (let k = 0; k < currentInterface.length; k++) {
          let currentInterfaceElement = currentInterface[k];

          if (interface.Description === interfaceName && currentInterfaceElement.family === 'IPv6') {
            let prefixLen = currentInterfaceElement.cidr.split('/');

            // console.log(`name: ${interface.Description}, ${currentInterfaceElement.scopeid}`);

            prefixLen = prefixLen[prefixLen.length - 1];

            machineData[i].Network[j] = {
              ...interface,
              IPv6: {
                Address: currentInterfaceElement.address,
                PrefixLen: parseInt(prefixLen),
                ScopeId: {
                  Value: currentInterfaceElement.scopeid,
                  Description: getScope(currentInterfaceElement.scopeid)
                }
              }
            };
          }
        }
      }
    }
  }

  // write to output path

  try {
    machineData = JSON.stringify(machineData, null, '\t');

    fs.writeFileSync(outputPath, machineData);
  } catch (err) {
    console.log(`writing to ${outputPath} failed: ${err}`);

    return;
  }

  console.log(`wrote updated machine data to ${outputPath}`);
};

const inputPath = path.join(__dirname, 'machinedata.json');
const outputPath = path.join(__dirname, 'machinedata-2.json');

updateIpv6(inputPath, outputPath);