// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy  
  const [deployer] = await ethers.getSigners();
  console.log("Account balance:", (await deployer.getBalance()).toString());

  console.log("Deploying contracts with the account:", deployer.address);
  const coolestToken = await hre.ethers.getContractFactory("TheCoolestToken");
  const tct = await coolestToken.deploy();

  await tct.deployed();
  saveFrontendFiles(tct)
  console.log("TheCoolestToken deployed to:", tct.address);
}

function saveFrontendFiles(contract) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../app/src/contracts";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + "/contract-address.json",
    JSON.stringify({ Address: contract.address }, undefined, 2)
  );

  const tctArtifact = artifacts.readArtifactSync("TheCoolestToken");

  fs.writeFileSync(
    contractsDir + "/TheCoolestToken.json",
    JSON.stringify(tctArtifact, null, 2)
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
