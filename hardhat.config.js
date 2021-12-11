require("@nomiclabs/hardhat-ganache");
require("@nomiclabs/hardhat-waffle");
const { ethers } = require("ethers");
const fs = require('fs');
const infuraKey = fs.readFileSync(".infuraKey").toString().trim();
const mnemonic = fs.readFileSync(".secret").toString().trim();
const privateKey = ethers.Wallet.fromMnemonic(mnemonic).privateKey;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4", 
  networks: {
    hardhat: {
      gasPrice: 0,
      initialBaseFeePerGas: 0,
      baseFeePerGas: 0
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${infuraKey}`,
      accounts: [privateKey]
    },
    waspRemote: {
      url: 'https://evm.wasp.sc.iota.org',
      chainId: 1074,
      accounts: [privateKey]
    },
    waspLocal: {
      url: 'https://localhost:8545',
      accounts: [privateKey]
    }
  }
};
