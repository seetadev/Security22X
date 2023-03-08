# FTM+ HW Wallet Contract Deployment

Deploying smart contract on Fantom Opera network
using [Hardhat development tools](https://hardhat.org) 
and a [Ledger](https://www.ledger.com) hardware wallet as the signature provider.

We use Ethereum Ledger application to process signing request on the Ledger device since
the Fantom Network uses the same address space as Ethereum and our RPC API interface 
is Web3 compatible. Please make sure to have your Ledger HW wallet properly configured 
and the [Ethereum application](https://support.ledger.com/hc/en-us/articles/360009576554-Ethereum-ETH-?docs=true)
installed on it before you start.

### Steps to Deploy a Smart Contract
- Create and test your smart contract. We demonstrate it on a simple ERC20 token called `Gold`.
- Configure your Hardhat toolset for deployment.
- Choose proper deployment RPC API node to enable Fantom network node interaction. 
  Please refer to [Fantom Developers documentation](https://docs.fantom.foundation) 
  to get the correct configuration. 
- Connect your Ledger device, unlock it with your PIN and start Ethereum signing app.  
  Please check to the [app documentation](https://support.ledger.com/hc/en-us/articles/360009576554-Ethereum-ETH-?docs=true) for the details. 
- Start deployment to the desired network, i.e. Fantom main network.
- Confirm the deployment transaction(s) on the Ledger device.
- Collect deployment details from the Hardhat report.

> Please make sure to have **Blind Signing** enabled on your Ethereum Ledger app. 
The Blind Signing, formerly known as Contract Data mode, is usually required to sign
transactions involving smart contracts. 
Please refer to this 
[Ledger support article](https://support.ledger.com/hc/en-us/articles/4405481324433-Enable-blind-signing-in-the-Ethereum-ETH-app?docs=true) 
for more details.

> No other client, i.e. *Metamask*, should be connected to your Ledger device during the signing
process. Even a simple status check coming from another client will interrupt communication between Hardhat signer
and the wallet causing the deployment to fail.

### Initialize Project Dependencies

```shell
npm i
```

### Deploy

```shell
npx hardhat run scripts/ledger-deploy.js --network <network_name>
```

> Note: The <network_name> is one of the configured networks in your `hardhat.config.js`
