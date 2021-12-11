import Web3 from "web3";
import tctArtifact from "./contracts/TheCoolestToken.json";
import tctAddress from "./contracts/contract-address.json";

const App = {
  web3: null,
  account: null,
  meta: null,

  start: async function() {
    const { web3 } = this;

    try {
      // get contract instance
      const networkId = await web3.eth.net.getId();
      //const deployedNetwork = tctArtifact.networks[networkId];
      //console.log(deployedNetwork.address);
      this.meta = new web3.eth.Contract(
        tctArtifact.abi,
        tctAddress.Address,
      );

      // get accounts
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];
    } catch (error) {
      console.error("Could not connect to contract or chain.");
    }
  },

  setStatus: function(message) {
    const status = document.getElementById("status");
    status.innerHTML = message;
  },

  createTCT: async function() {
    const { createTCT } = this.meta.methods;
    const name = document.getElementById("TCT Name").value;
    const id = document.getElementById("TCT ID").value;
    await createTCT(name, id).send({from: this.account});
    App.setStatus("New TCT Owner is " + this.account + ".");
  },

  // Implement Task 4 Modify the front end of the DAPP
  lookUp: async function (){
    let { lookUpTCTInfo } = this.meta.methods;
    let tokenID = document.getElementById("lookid").value;
    let nameToken = await lookUpTCTInfo(tokenID).call();
    App.setStatus("The TCT with the the ID " + tokenID + " has the name " + nameToken + ".");
  }

};

window.App = App;

window.addEventListener("load", async function() {
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    await window.ethereum.enable(); // get permission to access accounts
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live",);
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"),);
  }

  App.start();
});