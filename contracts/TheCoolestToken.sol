pragma solidity ^0.8.0;

//Importing openzeppelin-solidity ERC-721 implemented Standard
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


// StarNotary Contract declaration inheritance the ERC721 openzeppelin implementation
contract TheCoolestToken is ERC721('The Coolest Token', 'TCT') {

    // Star data
    struct TCT {
        string name;
    }

    // mapping the TCT with the owner Address
    mapping(uint256 => TCT) public tokenID2Info;
    mapping(uint256 => bool) public tokenMinted;
    // mapping the TokenID and price
    mapping(uint256 => uint256) public tokensForSale;

    
    // Create TCT using the Struct
    function createTCT(string memory _name, uint256 _tokenID) public {
        require(!tokenMinted[_tokenID],"This TCT has already been created");
        TCT memory newTCT = TCT(_name); // Star is an struct so we are creating a new Star
        tokenID2Info[_tokenID] = newTCT; // Creating in memory the Star -> tokenID mapping
        tokenMinted[_tokenID] = true;
        _mint(msg.sender, _tokenID); // _mint assign the the star with _tokenID to the sender address (ownership)
    }

    // Putting an TCT for sale (Adding the TCT tokenID into the mapping tokensForSale, first verify that the sender is the owner)
    function putTCTUpForSale(uint256 _tokenID, uint256 _price) public {
        require(ownerOf(_tokenID) == msg.sender, "You can't sale the TCT you don't own");
        tokensForSale[_tokenID] = _price;
    }


    // Function that allows you to buy a star that is up for sale
    function buyTCT(uint256 _tokenID) public  payable {
        require(tokensForSale[_tokenID] > 0, "The TCT should be up for sale");
        uint256 tokenCost = tokensForSale[_tokenID];
        address ownerAddress = ownerOf(_tokenID);
        require(msg.value >= tokenCost, "You need to have enough money");
        _transfer(ownerAddress, msg.sender, _tokenID);
        address payable ownerAddressPayable = payable(ownerAddress);
        ownerAddressPayable.transfer(tokenCost);
        if(msg.value > tokenCost) {
            payable(msg.sender).transfer(msg.value - tokenCost);
        }
    }

    // Function that returns the name of the TCT token
    function lookUpTCTInfo (uint _tokenID) public view returns (string memory) {
        return tokenID2Info[_tokenID].name;
    }

    // Function that transfer the TCT to a different address
    function transferTCT(address _to1, uint256 _tokenID) public {
        address ownerToken = ownerOf(_tokenID);
        require(msg.sender==ownerToken);
        transferFrom(ownerToken, _to1, _tokenID);
    }

}