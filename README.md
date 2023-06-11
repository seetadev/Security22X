# Transport Intel

Effective design, engineering, delivery of Ethereum, Mantle, Chainlink, IPFS and Web3 tools aided solution for vehicles and citizens to make roads safer and better for everyone using predictive analytics and automation.

Transport Intel is an analytics and incident management platform for citizens, police officers, drivers to report and manage incidents, detect and prevent accidents on web, mobile in a secure and simplified manner using Ethereum, IPFS, Mantle, Chainlink and Web3 tools aided solution.  Features:

360 degrees access: Command and control centers can manage the complete lifecycle of incident reporting, overall status, enable early stage prevention of accidents and road safety counseling, management of workforce at the incident site.

Incident Dashboard: Manage and track your incidents as a citizen along with sharing reviews and comments. Incident reporting, severity analytics and sentiment analysis using social media data for early stage detection and prevention of incidents.

Real Time Alerts and Live Streaming: Real time alerts and live streaming for incident verification and quick action.

Real Time Analytics: Analytics of the incidents with sentiment analysis, live incident reporting. road safety eco-system. Health summary of the police staff, scheduling the staff. Reducing misinformation.

Demo: https://drive.google.com/drive/u/1/folders/1PhwZ5JzHvmDZA8h9j-FIVmOAVCTV_TP9


# Beneficiaries

Ministry of Road and Transportation: Endeavor to change the car accident scenario by use of car technology to make driving safer and monitored for drivers, authorities, as well as other 3rd parties. With a mix of hardware and software, we provide intelligent feedback about drive quality and help analyze past incidents, as well as predict future incidents.

Citizens and Cab aggregators: Reduction in the number of road accidents.

Insurance Companies: Aggregated/ anonymized driving data, incident data will be helpful to car insurance companies.

OEMs and Dealerships: Vehicle diagnostics and in-car service consumption will be helpful for OEMs and Dealerships.

Smart Cities Policy Makers/ Government: Real time traffic flow, incident alert, parking data will be enable safer roads.

Advertisers: Customers/driver demographics are available.

Fleet customers: fleet performance.


# How it works:

Camera Management: Add/edit/delete cameras with integration to Urbit for webrtc solution for video conferencing and communication at the incident spot and IPFS for snapshots of road incidents.

Object Detection using OSS AI library based solution.

Video analytics configuration using IPFS, security and data retrieval.

Video conferencing using webrtc integration on Urbit and Live streaming with Object Detection Video Analytics, IPFS for snapshots. 

Alarm storage using Ethereum. Save/delete alarm metadata and image to/from IPFS. Store the hash returned from IPFS to Ethereum test network using IPFS. Provide links to alarms and blockchain transaction details.

Alarm Viewer: Add alarms with a single touch. Open the Alarm Settings menu from the home page. Add an alarm, set the wallpaper or choose an alarm tone. You can also delete an existing alarm. 


# Web3 eco-system tooling:

1a.  Mantle: We are using Mantle to develop a platform where users can issue, manage and transfer credits of ratings earned for vehicle owners and their respective vehicles via pollution checks,  green fuel adoption in vehicles:
- User creation procedure; User identification with NFC tags; 
- Create credits of ratings earned via pollution checks, green fuel  assets; 
- Issue green credits for vehicles via pollution checks; 
- List your green credits per vehicle; 
- Handle multiple vehicles.
 
 Please visit https://github.com/seetadev/Security22X/tree/main/Solution-Modules/vehicle-credits-pollution-check
 
 
- Mantle Public Goods Track: We are using Mantle to develop a platform where government authorities linked with Transport department like Pollution check control department, Municipality portal can issue, manage and transfer credits of ratings earned by vehicle owners and their respective vehicles via pollution checks, green fuel adoption in vehicles. 

This is especially useful for fleet management vehicles managed by the government for public goods delivery (Example: GeM portal goods in India) where co-incentives can be provided to contract organizations for good performance in pollution checks, green fuel adoption (switching away from diesel fuel to CNG). The workflow is as follows:

Fleet role creation procedure; Fleet vehicles identification with NFC tags;
Create credits of ratings earned via pollution checks, green fuel assets;
Issue green credits for fleet vehicles via pollution checks by Transport department like Pollution check control;
List green credits per fleet vehicle;
Handle multiple vehicles.


- Mantle Developer Tooling: We are developing tools and plugins for the green credits platform along with an alarm viewer dapp (please visit https://github.com/seetadev/Security22X/tree/main/Storage-incidents-alarm/mobile-alarm-clock/palm-alarm-clock ). The alarm viewer can be used in case a vehicles' quarterly pollution check is due or has not been completed one week before the penalty set by the government authorities. This alarm viewer can be further extended by the developers to build community tools, analytics and visualization tooling by adding features like pollution check performance ratings and raising alarms and notifications when the registry of a vehicle to operate in a region expires (example: 15 years for petrol vehicles and 10 years for diesel vehicles in Delhi). The alarm viewer application can also be extended for the use case where the pollution testing equipment does not give optimal results, which is very much true when a vehicle has traveled more than 45,000 kms.

1b. IPFS/Filecoin:  We are utilizing FVM to develop and use composable blocks and ensure effective design, engineering and delivery of a decentralized solution for road safety, monitoring and incident management using Ethereum & Filecoin eco-system tools:

- Decentralized NFT-based voting system for contract work for service & maintenance providers and companies and Ministry of Transportation. DAOs can issue NFTs to wallets based on service and maintenance performance and work completed, and the holders of these NFTs can create proposals and vote on other proposals whilst they have the NFTs of that contract work. Votes are uploaded to IPFS with the most recent vote linking to one before. Please visit https://github.com/seetadev/Security22X/tree/main/roadincidentmanagement/dao-fvm

- Creating a Transport NFT on the FVM for NFC tags of vehicle service and repair providers & vehicles to improve road incident management, decentralized NFT-based voting system for contract work by service providers, Votes are uploaded to IPFS with the most recent vote linking to one before. Please visit https://github.com/seetadev/Security22X/tree/main/roadincidentmanagement/nft-gen-fvm

Demo at https://drive.google.com/drive/u/3/folders/1hOsc9nE3OEyn-NiS1m1X0__p0ibg_l93

1c. Chainlink: E-Challan (Transport Receipt) Bill Generation: We are utilizing Chainlink Mix to work with Chainlink smart contracts. The bill script will deploy a smart contract to goerli and get a Random number via Chainlink VRF, which can used to identify a unique transaction/order number for the receipt or bill. We are also extending and adapting the Chainlink project "Link My Ride" to develop a decentralized first aid and ambulance platform by using Chainlink External Adapter to connect a Tesla Vehicle API to a Chainlink oracle for a peer-to-peer vehicle rental app. We wish to use it for Maruti Vehicle API and Hyundai Vehicle API too. Please visit: https://github.com/seetadev/Security22X/tree/main/Solution-Modules/hybrid-solution-module/decentralized-ambulance and https://github.com/seetadev/Security22X/tree/main/Solution-Modules/hybrid-solution-module/billing-tool-invoice-generator

- Parametric Insurance Solution in public transportation especially for project finance. We are utilizing an existing example at chainlink to develop an insurance solution for public transportation and better manage road monitoring and incident management. Both offchain and on-chain data are utilized by TPAs. Please visit https://github.com/seetadev/Security22X/tree/main/Solution-Modules/hybrid-solution-module/DeFi-Lending-Insurance


2. SuperFluid + UMA: We are using Superfluid as a token streaming protocol that lets vehicle users and consumers create streams of tokens fluidly between addresses. This will enable effective incentivization, management and communication setup for service/repair organizations utilized in Operations and Maintenance. We are extending Superfluid’s streaming tokens with UMA’s KPI Options: Perpetual Conditional Rewards (PCR) tokens that combine Superfluid’s programmable cashflows with UMA’s KPI option concepts. Service Users and administrators would receive immediate benefits and feedback based on how that KPI was doing. Immediate feedback like this would be highly motivating. Please visit https://github.com/seetadev/Security22X/tree/main/roadincidentmanagement/streaming-superfluid-token-uma/pcr-superfluid-uma

3. Polywrap with Axelar: We are using Polywrap with Axelar for communication between Polygon blockchain and Fantom destination chain: 
- Government organizations can send aUSDC from Polygon source-chain to Fantom destination-chain and distribute it equally among all accounts specified for subsidy or reimbursement using call contract with token.
- Cross chain lending platform: We can supply collateral and borrow tokens from a satellite chain to a fork of Ethereum's mainnet using existing Compound Protocol.
- Cross chain dapp development: We are extending the starter kit to develop cross chain dapps using Polywrap, Axelar.

Please visit: https://github.com/seetadev/Security22X/tree/main/interop-payments/polywrap-axelar-cross-pay. We are extending the example for Avalanche and Polygon cross chain communication using Axelar with Polywrap: https://github.com/ConsiderItDone/axelar-demo-app


4. Fantom: We are extending and developing a solution on Fantom web3 wallet (PWA) and information explorer to provide a decentralize platform for making post-dated insurance, service and repair cryptocurrency payments for vehicles. We are further utilizing a data analytics OSS tool powered by SocialCalc for managing information and payments to emergency service providers, maintenance and repair servicemen and also insurance and cab aggregator providers for availing their services.
We are also developing a rental and subscription marketplace using Fantom's NFT marketplace for enabling sharing of government assets like toll prepaid card, car details information for interstate travel, driving license management and quarterly pollution check and analytics/visualization powered by Ethercalc (SocialCalc) for better coordination and immediate action. Please visit https://github.com/seetadev/Security22X/tree/main/transport-defi-nft-fantom

We wish to enable tabulation, data organization and management, in an easy-to-use analysis tool that summarises core data and features of a Token or NFT such as chains used, origin, issuer, energy consumption, and minting method. We also wish to enable private payments for vehicle repair.


5. Polygon: We are utilizing ZoraModuleManager, and ZoraProtocolFeeSettings in our our dapp and deploying it on Polygon after registering the Zora market module. We are developing a crowdsourcing marketplace using Zora's auction house template for enabling sharing of government assets like prepaid card, meter details information, meter license management and quarterly pollution check and control. We are using the zora starter kit to access ZORA API, Creator Toolkit, and Marketplace Hyperstructure. Zora's Auction House template is being utilized for NFT marketplace of alarm clock wallpapers and background ringtones purchase and auction. Please visit https://github.com/seetadev/Security22X/tree/main/alarm-viewer and video at https://drive.google.com/drive/u/3/folders/1hOsc9nE3OEyn-NiS1m1X0__p0ibg_l93


6. Livepeer: We are using Livepeer with Aptos as the key infrastructure provider for online video streaming of critical road incidents. We are using Livepeer with Aptos at: Live streaming with Object Detection Video Analytics using Livepeer for streaming; Camera Management: Add/edit/delete cameras with integration with Livepeer.
Functions: Live streaming with Object Detection Video Analytics using Livepeer for streaming; Camera Management: Add/edit/delete cameras with integration with Livepeer.
We are using Livepeer ondemand service to enable effective management and communication setup for transport services utilized in Operations and Maintenance across multiple regions.  Please visit Livepeer integration with Aptos and also minting Livepeer Video NFT at Aptos.

Please visit: https://github.com/seetadev/Security22X/tree/main/Solution-Modules/video-stream-social-platform/social-data-framework-apt-livepeer


7. Consensys's Infura and Metamask tools with Optimism NFT marketplace and Scalability of Decentralized Public Goods, Mobility Network Enablement: Optimism NFT marketplace for vehicle's spare parts and also for early-stage detection and prevention of incidents using Infura; NFC tags of vehicles for enabling sharing of government assets and service/repair of vital assets. Improving Data Transparency in Incident Management Using Ethereum Blockchain, Infura, Metamask and Optimism NFT marketplace. Optimism NFT marketplace for NFC tags of vehicles for enabling sharing of government assets and service/repair of vital assets. We are also using Optimism to enable scaling of the decentralized public goods mobility network and effective management and communication setup for services utilized in Operations and Maintenance across multiple regions. Please visit https://github.com/seetadev/Security22X/tree/main/nft-marketplace/vehicle-spare-parts-nft-optimism-marketplace and video at https://drive.google.com/drive/u/3/folders/1hOsc9nE3OEyn-NiS1m1X0__p0ibg_l93

 
8. Arcana: We are extending the Arcana demo app for utilizing the user security and authentication, storage methods with capabilities pluggable and extendable to 5 different personas: Driver, Police, Citizen, Dispatcher, Admin. Arcana enables 360 degrees access of the incidents to the action/ administration team. They can manage the complete lifecycle of incident reporting, overall status, traffic monitoring, managing police teams. They can also use the solution for effective user security of staff members and provide road safety counselling. Please visit: https://github.com/seetadev/Security22X/tree/main/Solution-Modules/authentication-user-security and video at https://drive.google.com/drive/u/3/folders/1hOsc9nE3OEyn-NiS1m1X0__p0ibg_l93 
 
 
10. Connext: We are utilizing Connext for developing the feature of splitting road management expenses and get support from government, private and civil society bodies. Connext enables us to develop the communication across the chains. Using xDonation.sol allows anyone to donate funds, regardless of what chain they are on. Donors send funds to the contract, and at any point an approved sweeper can call sweep which will swap into the donation asset and send the funds to the specified address and chain. We wish to utilize Connext with L2 layer for developing smart contract for setting parameters at deployment and handling payments from every listed user, connext for communication across chains; Balancing and simplifying settlements among members; Chainlink oracles for price feeds; Exchanging tokens. Please visit https://github.com/seetadev/Security22X/tree/main/Solution-Modules/crosschain/split-expenses-get-donations 

We are utilizing Zodiac Modules and Modifiers for developing the following use-case using Connext: Decentralized NFT-based voting system for RFPs and donations on Metis (L2) and communication using Connext. Quotation, Bidding, voting and token management for contract work undertaken by transport organizations can be managed with the following workflow -
-DAOs or Organisations create a RFP on the app.
-Users can join a RFP by minting an NFT of that RFP
- Users that have a certain RFP's NFT are eligible to create proposals and vote on them.
- Voting is gasless and the vote is stored on IPFS
This also enables sharing of government assets like traffic routes, government vehicle's details information for geolocation and travel routes, license management and quarterly maintenance check and control.
Please visit https://github.com/seetadev/Security22X/tree/main/Solution-Modules/crosschain/zodiac-module-connext




# Experiments: Pre-hackathon developments at the github repository
Urbit Integration

1. Integration of webrtc protocol to Urbit for video conferencing and communication at the incident spot: We are extending the WebRTC integration for Urbit for just in time video communication about the incidents reported by citizens and coordinated by police officer, dispatcher, admin and government officials at the command and control center. Please visit: https://github.com/seetadev/Security22X/tree/main/roadincidentmanagement/urbit-webrtc

2. Urbit Incident Survey Chatbot: We are using Urbit chatbot framework (poll example) within our solution so that the incident surveys could be integrated within the chat application specific to discussions on road incidents where there is dispute on its cause or impact. Please visit: https://github.com/seetadev/Security22X/tree/main/roadincidentmanagement/urbit-incident-survey

3. Urbit Incident Notes: We are using Urbit based integration of TodoMVC example for implementing incident and monitoring notes maintained by transport administrators. Please visit: https://github.com/seetadev/Security22X/tree/main/roadincidentmanagement/urbit-monitoring-notes

IPFS: We are using IPFS for storing a variety of offchain data like incident snapshots, alarm metadata and object types at the time of incident. Please find the demo video at  (demo_screen capture.mov under demo directory at https://drive.google.com/drive/u/3/folders/1wPLgUHDg1C4-TT8tPtQeVw_UyXeVA_Hc and source code link at https://github.com/seetadev/Security22X/tree/main/Storage-incidents-alarm). We are storing Alarm metadata using IPFS. Also, Saving/deleting alarm metadata and image to/from IPFS. We are also storing the hash returned from IPFS to Ethereum test network. Further we are using IPFS for: Video analytics configuration using IPFS; Camera Management: Add/edit/delete cameras with integration with oss streaming, IPFS; Live streaming with Object Detection Video Analytics, and IPFS for snapshots.

Our IPFS powered solution will enable better coordination, enable road safety ecosystem to be more effective, proactive, help in early prediction and prevention of incidents. Please find the pitch deck and demo at https://drive.google.com/drive/u/3/folders/1wPLgUHDg1C4-TT8tPtQeVw_UyXeVA_Hc






