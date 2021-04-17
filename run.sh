# check if node exists
if ! command -V node &> /dev/null
then
  echo "node could not be found"
  exit
fi

# npm should exist but let's check
if ! command -V npm &> /dev/null
then
  echo "npm could not be found"
  exit
fi

# check if at least certain version
NODE_VERSION=$(node --version)

echo "using node $NODE_VERSION"

# install dependencies
npm i

# run part 1
npm run save-info

# run part 2
npm run update-ipv6

# exit with message
echo "exiting script"