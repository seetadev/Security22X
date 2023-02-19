# Perpetual Conditional Reward

## Major problems it solves

One of the most common problems of DAO's is achieving to have steady involvement of members.
PCR helps to solve this problem proposing a reward to be ditributed upon certain conditions (KPI's) periodically.


UMA Oprimist Oracle [dashboard](https://optimistic-oracle-dapp-5liuk09wg-uma.vercel.app/)
 
 &nbsp;
# Architecure
### Contracts
The three solidity contracts the PCR uses:
- PcrHost.sol. Contrat to create the Perpetual Conditional Reward. When creating a new reward, PcrHost will clone the implementations of the PcrOptimisticOracle.sol and the PcrToken.Sol. [code](https://github.com/donoso-eth/pcr/blob/master/hardhat/contracts/PcrHost.sol)

- PcrOptimisticOracle.sol. Implementation of the the UMA Optimistic Oracle.  [code](https://github.com/donoso-eth/pcr/blob/master/hardhat/contracts/PcrOptimisticOracle.sol)


- PcrToken.Sol. Implementation of the Superfluid Intant Distribuition agreement, implements de ERC777 receiver (PcrOptimisticOracle.sol send tokens) to launch the distribution.  [code](https://github.com/donoso-eth/pcr/blob/master/hardhat/contracts/PcrToken.sol)


### Subgraph
One subgraph is created with data source the "createRewardEvent" in the PCRHost.sol contract.
This subgrap uses the templates for listening to events of the cloned contracts PcrOptimisticOracle.sol and PcrToken.Sol.


### Fronted

The major building blocks in the PCR Angualr Dapp are: Pages/Services and Shared Components

#### Pages:
The frontend has been built with Angular and has 5 main pages.

- Landing Page.[code](https://github.com/donoso-eth/pcr/tree/master/src/app/pages/landing))

- Home Page. Once the wallet is connected, here we will see the list of PCR Created and PCR Memberships (if any)[code](https://github.com/donoso-eth/pcr/tree/master/src/app/pages/home)

- Upcoming page.the next upcoming actions in rewards [code](https://github.com/donoso-eth/pcr/tree/master/src/app/pages/upcoming-page)
  
- Create PRC Page. Settings for the PCR creation [code](https://github.com/donoso-eth/pcr/tree/master/src/app/pages/create-pcr)

- Details PCR(only visible for the PCR creator): Details of the PCR (major properties/charts/balances) and available actions (fund/propose/execute, etc.)  [code](https://github.com/donoso-eth/pcr/tree/master/src/app/pages/details-pcr)

- Details PCR Membership(only visible for members). Details of the awarded membership (major properties/charts/balances) and available actions (claim/approve/propose/execute, etc.) [code](https://github.com/donoso-eth/pcr/tree/master/src/app/pages/details-membership)

#### Services

- Dapp Injector Service. Service providing the blockchain wiring, spinning rpc provider, conencting with wallet (metamask or local), instantiate the pcrhost contract and keep track of the clone implementations of PCrToken and PcrOptiisticOracle [code](https://github.com/donoso-eth/pcr/blob/master/src/app/dapp-injector/dapp-injector.service.ts)

- GraphqlService: Provides "The Graph" data through the subgraph deployed on Kovan. [code](https://github.com/donoso-eth/pcr/blob/master/src/app/dapp-injector/services/graph-ql/graph-ql.service.ts) and main queries [code](https://github.com/donoso-eth/pcr/blob/master/src/app/dapp-injector/services/graph-ql/queryDefinitions.ts)

- SuperFluid Service: Providing an instante of the Framework Object through the sdk-core for querying/approve or claim subscriptions [code](https://github.com/donoso-eth/pcr/blob/master/src/app/dapp-injector/services/super-fluid/super-fluid-service.service.ts)

 
#### Shared Component (main ones) 

- Proposal Detail Component: Proposal flow component, [code](https://github.com/donoso-eth/pcr/tree/master/src/app/shared/components/proposal-detail)

- Charts [code](https://github.com/donoso-eth/pcr/tree/master/src/app/shared/components/charts)
  
- Upcoming Rewards [code](https://github.com/donoso-eth/pcr/tree/master/src/app/shared/components/upcoming-rewards)

- User Balance [code](https://github.com/donoso-eth/pcr/tree/master/src/app/shared/components/user-balance)

## Tech Stack
- Smartcontracts in Solidity
- Development environent and fork with Hardhat
- The graph for queryng data (subgraph created)
- Frontend in Angular Framework



# TestNet Development (KOVAN)
The contracts are deployed on kovan: 
 &nbsp; 

Pcrhost.sol at 0x8806Cdb4b2a77C76C5e62cCd576E3Fd1268C262D [(see on kovan)](https://kovan.etherscan.io/address/0x8806Cdb4b2a77C76C5e62cCd576E3Fd1268C262D) 
  &nbsp; 

 PcrOptimisticOracle.sol (implementation) at 0x64Cd0BA7e51736679e45e2Bc5Ef44d7094f5719c [(see on kovan)](https://kovan.etherscan.io/address/0x64Cd0BA7e51736679e45e2Bc5Ef44d7094f5719c) 
  
PcrToken.sol (implementation) at 0x9c1dCc4DdA69f254846a1EA26e01c80F7d5541a3[(see on kovan)](https://kovan.etherscan.io/address/0x9c1dCc4DdA69f254846a1EA26e01c80F7d5541a3) 
 &nbsp;

Subgraph deployed on [kovan](https://thegraph.com/hosted-service/subgraph/donoso-eth/perpetual-conditional-reward)




# 🏄‍♂️ Local Development

## Kovan Fork

Create a copy of /hardhat/.sample.env and input the deployer key and the kovan_url, the deployer key will only required for deployments on kovan, not to the fork.
Please add in app-module:
- defaulNetwork: 'kovan', 
- DappInjectorModule.forRoot({wallet:'wallet', defaultNetwork:network})


Open the first terminal
```javascript
npm run fork
// spin blockchain fork of kovan
```
Open the Second Terminal
```javascript
npm run deploy
// launch, compile, and deploy in watch mode. To deploy on Polygon Testnet, run

```

```javascript
npm run run-graph-node
// spin with docker compose a graph local node
```
Once the graph node is running.
Open the Third Terminal

```javascript
npm run create-graph-local
// create the subgraph locally
```

```javascript
npm run build-graph
// buld the subgraph 
```
```javascript
npm run deploy-graph-local
// ensure in the subgraph.yml file the address of the contract os the one you just deployed and the network in datasource contract and templates is "localhost" not kovan
```

```javascript
ng serve -o
// build the angular dapp and serve on localhost:4200., 

```

