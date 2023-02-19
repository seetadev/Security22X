# Decentralized First Aid and Ambulance using Chainlink

We are extending and adapting the Chainlink project "Link My Ride" to develop a decentralized first aid and ambulance platform by using Chainlink External Adapter to connect a Tesla Vehicle API to a Chainlink oracle for a peer-to-peer vehicle rental app. We wish to use it for Maruti and Hyundai Vehicle API.

# Description

In the past, Smart Contracts have been integrated with electric vehicles via the use of specialized hardware that plugs directly into the vehicle to obtain real-time data. Not only were these examples restricted to just accessing data, but they also didn't scale well, as each vehicle requires special hardware installed. Tesla electric vehicles have a proper [feature rich API](https://www.teslaapi.io/) that can be leveraged to obtain vehicle data & change the state of the vehicle, which then gives us the ability to create a custom external adapter to connect Smart Contracts to the vehicle via a Chainlink Oracle, giving the Smart Contract full access to the given vehicles data & ability to change its state.

This example demonstrates the design pattern described above, applying it to the use case of the peer to peer sharing economy. In traditional vehicle rental platforms, the vehicle renter relies on the 'brand power' of the company renting the vehicles, and trusts that the bond they submit will be returned if they adhered to the conditions. And as a vehicle owner/provider, going through a trusted centralized platform usually requires sacrificing approximately 30% of revenue earned. But in a peer to peer scenario, both renter and owner are strangers, there is no 'brand power', and there's no guarantee any bond paid will be returned fairly if agreement conditions are met. This is where a Smart contract connected to external data and events can be leveraged to facilitate a digital agreement between a Vehicle Owner & Vehicle Renter in a trust minimized & secure way.

#### Install dependencies

```sh
# install packages. 
npm install

# compile contracts
truffle compile

# migrate contract
# You can update truffle-config to migrate to Kovan, or you can take the Solidity, paste directly into Remix, change the imports to be the remix ones and deploy/run from there

truffle deploy --reset --network kovan

# Once you have deployed your Chainlinked Smart Contract,you need to obtain the contract public address, and put it in the contract.json file located in /src/web-app/src/features/web3/. You also need to fund it with enough LINK to send 1 LINK for each Rental Agreement created.

#  Start the mock server. It runs on port 7777 by default
cd /src/teslamock/src
npm install
npm start
To deploy the mock server to GCP as a serverless function, you implement the 'app' function

#  Start the external adapter. It runs on port 8080 by default
cd /src/tesla-external-adapter/src
npm install
npm start
To deploy the adapter to GCP as a serverless function, you implement the 'gcpservice' function

#  Start the front end application to test the contract
cd /src/web-app
npm install
npm start

# Check the web app's README for more detailed instructions on running it
```

Once the application is running it can be accessed by local URL <a href="http://localhost:3000/">http://localhost:3000/</a>

## If we had more time to take this proof of concept further we would...

- Ensure financial incentive for both vehicle owner and renter are sufficient to promote good behaviour

- Add features to facilitate vehicle fleet management including reporting and analytics

- Expand to other API-enabled vehicles

- Cover all essential insurance

- Improve Security, & add multiple Chainlink Nodes for better decentralization

- Improve UI/UX (Form validation, responding to events emitted from smart contract, use user's timezone [currently all times in the web app are in UTC] and more)

