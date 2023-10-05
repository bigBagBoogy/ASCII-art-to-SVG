# instant push copy paste all below in one go:

git init
git branch -M main
git add .
git commit -m "Added SVG user submit"
git push -u origin main

# todo:⭐️

add logic for switching Metamask's connected network (ethereum/polygon) - [x]

add user input fields to have a user create the Metadata. - [x]
add user SVG submission - [ ]

- later: ASCII snapshot to NFT

# let's:

look into creating ECMAScript modules. 🧩

# end of todo..........................................

The keyboard shortcut to toggle word wrap is Alt+Z
The keyboard shortcut to zoom is Ctrl+ + and/or Ctrl+ - (on the num-pad)

forge test --mt <nameOfTest> -vvv
forge script script/DeployGameProgressAndTopFive.s.sol
forge script script/DeployCheatpay.s.sol

# Importin Anvil localhost into Metamask with 10000 eth:

open metamask
click import account
in cli: `make anvil`
take a private key and paste it into metamask to import account
click ADD NETWORK
copy - paste account from cli (anvil)
symbol: eth
rpc-url: http://127.0.0.1:8545
chainid: 31337

This will deploy all contracts to the "fake" Anvil localhost blockchain (chainId 31337)
Update your constants.js and constantsCheatpay.js with the new contract address.
You'll see it near the top of the hardhat output.

Connect your metamask to your local hardhat blockchain.
`PLEASE USE A METAMASK ACCOUNT THAT ISNT ASSOCIATED WITH ANY REAL MONEY.`

Additionally, add your localhost with chainid 31337 to your metamask.

2. open the frontend and
   Click the “Go Live” button at the bottom-right-hand corner of VSCode to start a server on port 5500. This will also often prompt your browser to open a new window/tab that loads your index.html file.
   If the browser doen't open then go to [a link]http://127.0.0.1:5500/
   !!! You might not be connected to your website (local frontend) with the right account
   --check this in the browser console. You need to be connected to the Anvil account with
   funds in it.

3. You can play around with the website functionality including funding, and withdrawing. The balance is logged into the console, so to see that, press cmd/ctrl + shift + i
   and then press the balance button.

If you quit this and the on a later occasion you want to do this again you will need to first open your metamask,
go to settings, --- advanced, --- and choose RESET WALLET
otherwise you will get this NONCE error in the console and the functions wont work anymore.

````MetaMask - RPC Error:
[ethjs-query] while formatting ouputs from RPC '{"value":{"code":-32603,"data":{"code":-32000,"message":"Nonce too high. Expected nonce to be 2 but got 4. Note that transactions can't be queued when automining."}}}'```

have fun!

````

# other:

The DeployMoodNft.sol script has the a-z for reading in an img file, converting it to base64,
concatenating it, base64 that and then concatenating it woth the metaData to the tokenUri.

1. line 39 read in svg files
2. line 45 upon deploy call: svgToImageURI
3. In MoodNft.sol the ImageURI is concatenated with the metaData

4. source .env

5. forge script script/DeployTrophy.s.sol:DeployTrophy --rpc-url $SEPOLIA_RPC_URL --private-key $PRIVATE_KEY --broadcast --verify --etherscan-api-key $ETHERSCAN_API_KEY -vv

0x0d3F6Baf4639da5120B777E728Fd9eC184C1550f sepolia trophya.sol main

after deploying go to interactions (or minter) and replace contract in function run()

6. forge script script/Mintera.s.sol:Mintera --rpc-url $SEPOLIA_RPC_URL --private-key $PRIVATE_KEY --broadcast --verify --etherscan-api-key $ETHERSCAN_API_KEY -vv

# polygon

7. forge script script/DeployTrophy.s.sol --rpc-url $POLYGON_RPC_URL --private-key $PRIVATE_KEY --broadcast --verify --polygonscan-api-key $POLYGON_API_KEY -vvvv

8. forge script script/Interactions.s.sol:MintMoodNft --rpc-url $POLYGON_RPC_URL --private-key $PRIVATE_KEY --broadcast --verify --polygonscan-api-key $POLYGON_API_KEY -vvvv

polygon trophy gold: 0xB840a9820e4dae24822De98B1d47e4Cc98946E4d --> good contract
to mint on, but not verified!
Use frontend for polygon?  
change: import { abi, contractAddress } from "/constants.js"; //eth
to: import { abi, contractAddress } from "/constants.js"; // polygon

# infura sepolia

9. forge script script/Mintera.s.sol:Mintera --rpc-url $INFURA_SEPOLIA_RPC_URL --private-key $PRIVATE_KEY --broadcast --verify --etherscan-api-key $ETHERSCAN_API_KEY -vvvv

# issues:

Compiler run successful!
2023-08-29T17:34:41.304456Z ERROR sharedbackend: Failed to send/recv `basic` err=GetAccount(0xec5dbfed2e8a5e88de2ac7a9e5884b0bd4f6ca7f,
error sending request for url (https://eth-sepolia.g.alchemy.com/v2/69txysSR3src6m4REhIftFAI2BYyEgcN): connection error: unexpected end of file

Context:

- Error #0: connection error: unexpected end of file
- Error #1: unexpected end of file) address=0xec5dbfed2e8a5e88de2ac7a9e5884b0bd4f6ca7f
  Error:
  Failed to get account for 0xec5dbfed2e8a5e88de2ac7a9e5884b0bd4f6ca7f: 0xec5dbfed2e8a5e88de2ac7a9e5884b0bd4f6ca7f

# above is probably a network issue (italy wifi)

base64.js:18 Error minting NFT:
{code: -32603, message: `[ethjs-query] while formatting outputs from RPC '{"value":{}}'`, stack: '{\n "code": -32603,\n "message": "[ethjs-query] wh…ogaeaoehlefnkodbefgpgknn/background-4.js:12:56730'}
code
??????? seems to be a metamask issue. code was fine, minted succesful later ???????

# issue when MEtamask not connected, or wrong account selected:

Error minting NFT: Error: unknown account #0 (operation="getAddress", code=UNSUPPORTED_OPERATION, version=providers/5.1.2)

# (solved) require not met:

inpage.js:1 MetaMask - RPC Error: Internal JSON-RPC error.
Error minting NFT:
code: -32603, message: 'Internal JSON-RPC error.', \*\*\* message: 'execution reverted'}

Execution reverted is due to contract call failure. The reverton is either by an accident, for example, when overflow occurs, or intentionally, for example, require() condition is not satisfied.

In my case I forgot: `require(open == true, "Minting not allowed yet");`

# depreciated contracts:

0xd3e20C1942828d60310F6ddC4547ff736819Aff9 sepolia gold
0x7a0902f2BB39AC88b275c9Aa044E0E486FA014CF sepolia silver
0x017B5b379415036808C20989fAbBE40834c98a46 sepolia bronze
0x57DCC1f32c1cA7f1F5453668746489f1fDd152C4 sepolia new Trophy.sol
0x1288cd7D89f29350c1D28D4A617557da2b8437B0 sepolia new Trophy.sol -> to Account3 (2266) Z_hand
0x5b24C9A4A3f3b6dA228707C44710208Ae8229839 sepolia trophya.sol
