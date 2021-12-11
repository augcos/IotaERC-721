# TheCoolestToken: IOTA ERC-721 Project
## Introduction
The goal of this project is to implement an ERC-721 DApp in the IOTA testnet. A custom ERC-721 token called The Coolest Token (TCT) was implemented and deployed both to the Ethereum Rinkeby testnet and to the EVM on the IOTA Wasp testnet.

## Development
The project vas developed using the following software:
```
Node.js         v14.18.1
npm             v8.1.3
Hardhat         v2.7.0
OpenZeppelin    v4.4.0
Solidity        v0.8.4
Ganache CLI     v6.12.2
Ether.js        v5.5.2
```

## How to install?
Before running this project in your local system, you will need to have Node.js, npm and Ganache CLI preinstalled. After cloning this repository, run the following command to install all the necessary dependencies:
```
npm install
```
You will also need to create a .secret file in your main directory with the passphrase to your Ethereum account. If you intend on deploying the contract to the Rinkeby testnet, you will also need to create a .infuraKey with your infura endpoint.

## Test the project
If you want to modify the testing of the project, you can modify the test.js file in the Test folder. To test the project using a feeless local Hardhat blockchain, run the following commands:
```
npx hardhat test
```

## Deploy the Smart Contract
### Deploy to a local Ganache blockchain
You can deploy the smart contract to a local Ganache blockchain using the Ganache Hardhat plugin. First launch a local Ganache blockchain:
```
ganache-cli
```
Then, open another terminal and deploy it in your Ganache blockchain:
```
npx hardhat run scripts/deploy.js --network ganache
```

### Deploy to the IOTA testnet
You can also deploy the smart contract in the EVM on the IOTA Wasp testnet using the public endpoint on evm.wasp.sc.iota.org. Run the following command:
```
npx hardhat run scripts/deploy.js --network waspRemote
```
You can find an already deployed version of the contract [here](https://explorer.wasp.sc.iota.org/account/0xd4530bbc16b7e95a6bbca4d1208e989e2c610434).

### Deploy to the Rinkeby testnet
You can also deploy the smart contract to the Rinkeby testnet. Don't forget to create an .infuraKey file with your Infura endpoint in the main directory. Once everything is ready, run the following command:
```
npx hardhat run scripts/deploy.js --network rinkeby
```
You can find an already deployed version of the contract [here](https://rinkeby.etherscan.io/tx/0xb0cb89b44757d8676eb3e1dc14a12485c24fda9f985b649aaf6a306cfbd39b48).

## Interact with the deployed Smart Contract
You can run the frontend using the following command:   
```
npm run dev
```
You will need to have metamask connected to the network that you last deployed your smart contract to. You can now interact with the smart contract. You will see that deploying and using the IOTA testnet is complete free! Enjoy your feeless experience.

## Next steps
Deployment to a local Wasp node has been already implemented in the code (waspLocal in the hardhat.config.json), but testing has yet to be perfomed. You can install a Wasp node using the guide from the [IOTA wiki](https://wiki.iota.org/smart-contracts/guide/chains_and_nodes/running-a-node), or install a GoShimmer + Wasp node combination from [this repository](https://github.com/iotaledger/wasp/tree/add_docker_test_net).