const { expect } = require("chai");

describe("The Coolest Token", async function() {
    let owner;
    let addr1;
    let addr2;
    let TheCoolestToken;
    let deployedTCT;
    let provider;
    // Deploy the contract
    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();
        TheCoolestToken = await ethers.getContractFactory("TheCoolestToken");
        deployedTCT = await TheCoolestToken.deploy();
        provider = waffle.provider;
    });

    it('Can mint a TCT', async() => {
        let firstID = 1
        await deployedTCT.createTCT("First TCT",firstID, {from: owner.address});
        expect(await deployedTCT.lookUpTCTInfo(firstID)).to.equal("First TCT");
    }); 

    it('Can put up TCT for sale', async() => {
        let secondID = 2;
        let tokenPrice = 20000;
        await deployedTCT.createTCT("Second TCT", secondID, {from: owner.address});
        await deployedTCT.putTCTUpForSale(secondID, tokenPrice);
        expect(await deployedTCT.lookUpTCTInfo(secondID)).to.equal("Second TCT");
    });

    it('Can receive the funds after a sale', async() => {
        let thirdID = 3;
        let tokenPrice = 1000000;
        let payment = 1500000;
        
        await deployedTCT.connect(addr1).createTCT("Third TCT", thirdID);
        await deployedTCT.connect(addr1).putTCTUpForSale(thirdID, tokenPrice);
        let balanceBeforeTx = await provider.getBalance(addr1.address)
        await deployedTCT.connect(addr2).buyTCT(thirdID, {value: payment});
        let balanceAfterTx = await provider.getBalance(addr1.address)

        let value1 = Number(balanceBeforeTx) + Number(tokenPrice);
        let value2 = Number(balanceAfterTx);
        expect(value1).to.equal(value2);
    });
    
    it('TCT transfer after purchase is properly done', async() => {
        let fourthID = 4;
        let tokenPrice = 1000000;
        let payment = 1500000;
        
        await deployedTCT.connect(addr1).createTCT("Fourth TCT", fourthID);
        await deployedTCT.connect(addr1).putTCTUpForSale(fourthID, tokenPrice);
        await deployedTCT.connect(addr2).buyTCT(fourthID, {value: payment});
        
        expect(await deployedTCT.ownerOf(fourthID)).to.equal(addr2.address);
    });
    
    it('Gets the price of the TCT discounted after a purchase', async() => {
        let fifthID = 5;
        let tokenPrice = 1000000;
        let payment = 1500000;
        
        await deployedTCT.connect(addr1).createTCT("Fifth TCT", fifthID);
        await deployedTCT.connect(addr1).putTCTUpForSale(fifthID, tokenPrice);
        let balanceBeforeTx = await provider.getBalance(addr2.address)
        await deployedTCT.connect(addr2).buyTCT(fifthID, {value: payment});
        let balanceAfterTx = await provider.getBalance(addr2.address);

        let value1 = Number(balanceBeforeTx) - Number(tokenPrice);
        let value2 = Number(balanceAfterTx);
        expect(value1).to.equal(value2);
    });
    
    it('Can asign the TCT Contract the right name and symbol', async() => {    
        expect(await deployedTCT.name()).to.equal("The Coolest Token");
        expect(await deployedTCT.symbol()).to.equal("TCT");
    });
    
    it('Can transfer a TCT token', async() => {
        let sixthID = 6;
        await deployedTCT.connect(addr1).createTCT("Sixth TCT", sixthID);
        await deployedTCT.connect(addr1).transferTCT(addr2.address, sixthID);
        expect(await deployedTCT.ownerOf(sixthID)).to.equal(addr2.address);
    });
});

