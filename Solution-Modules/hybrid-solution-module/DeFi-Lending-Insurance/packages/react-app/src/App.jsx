import React, { useCallback, useEffect, useState } from "react";
import { HashRouter, Switch, Route, Link } from "react-router-dom";
import "antd/dist/antd.css";
import {  Web3Provider } from "@ethersproject/providers";
import "./App.css";
import { Menu, Layout } from "antd";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useUserAddress } from "eth-hooks";
import { useGasPrice, useContractLoader } from "./hooks";
import { Header, Account, Contract, ThemeSwitch } from "./components";
import { Transactor } from "./helpers";
import { Dashboard, DebugPanel, RegistrationSuccess, ReviewAndPurchase, SmartContractDetails, SuccessfullyConnected, Home } from "./views"
import {  NETWORKS } from "./constants";
const { Footer } = Layout;

// 😬 Sorry for all the console logging
const DEBUG = true

function App() {

  const [injectedProvider, setInjectedProvider] = useState(null);
  const [network, setNetwork] = useState(null);
  const [blockExplorer, setBlockExplorer] = useState(null);
  
  /* 💵 This hook will get the price of ETH from 🦄 Uniswap: */
  //const price = useExchangePrice(targetNetwork,mainnetProvider);
  
  /* 🔥 This hook will get the price of Gas from ⛽️ EtherGasStation */
  const gasPrice = useGasPrice({},"fast");
  // Use your injected provider from 🦊 Metamask 
  const address = useUserAddress(injectedProvider);
  if(DEBUG) console.log("👩‍💼 selected address:",address)

  // For more hooks, check out 🔗eth-hooks at: https://www.npmjs.com/package/eth-hooks

  // The transactor wraps transactions and provides notificiations
  const tx = Transactor(injectedProvider, gasPrice)

  // If you want to make 🔐 write transactions to your contracts, use the userProvider:
  const writeContracts = useContractLoader(injectedProvider)
  if(DEBUG) console.log("🔐 writeContracts",writeContracts)

  const loadWeb3Modal = useCallback(async () => {
    const provider = await web3Modal.connect();
    const web3Provider = new Web3Provider(provider);
    const networkFromProvider = await web3Provider.getNetwork();
    if(DEBUG) console.log("Network: ", networkFromProvider);
    const network = NETWORKS[networkFromProvider.chainId];
    if(network) {
      setNetwork(NETWORKS[networkFromProvider.chainId]);
      setBlockExplorer(NETWORKS[networkFromProvider.chainId].blockExplorer);
      web3Provider.validNetwork = true;
    }
    else {
      web3Provider.validNetwork = false;
    }
    setInjectedProvider(web3Provider);
  }, [setInjectedProvider]);

  useEffect(() => {
    const initProvider = async () => {
      if(injectedProvider){
                
        window.ethereum.on("chainChanged", chainId => {
          web3Modal.cachedProvider &&
            setTimeout(() => {
              window.location.reload();
            }, 1);
        });

        window.ethereum.on("accountsChanged", accounts => {
          web3Modal.cachedProvider &&
            setTimeout(() => {
              window.location.reload();
            }, 1);
        });
      }
    }
    initProvider();      
  }, [injectedProvider])

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      loadWeb3Modal();
    }
  }, [loadWeb3Modal]);
  
  const [route, setRoute] = useState();

  useEffect(() => {
    const slashIndex = window.location.hash.indexOf('/');
    const location = window.location.hash.substr(slashIndex);
    setRoute(location);
  }, [setRoute]);

  /* APPLICATION SPECIFIC STATES START HERE */
  const [liquidityProtocolToAddressMap, setLiquidityProtocolToAddressMap] = useState({});
  const [ mockPoRPoSAddresses, setMockPoRPoSAddresses ] = useState({});
  const [ realPoRPoSAddresses, setRealPoRPoSAddresses ] = useState({});
  
  const [tusdAddress, setTusdAddress] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    if(!writeContracts) { return; }
    if(!network) { return; }
    //TODO: How can we make this better?
    if(network.name === "localhost"){
      setLiquidityProtocolToAddressMap({
        "AAVE":  writeContracts.LiquidityProtocolMock.address,
        "Mock" : writeContracts.LiquidityProtocolMock.address,
      });
      setMockPoRPoSAddresses({
        "reserve" : writeContracts.MockTUSDReserveFeed.address,
        "supply" : writeContracts.MockTUSDSupplyFeed.address
      });
      setRealPoRPoSAddresses({
        "reserve" : writeContracts.MockTUSDReserveFeed.address,
        "supply" : writeContracts.MockTUSDSupplyFeed.address
      });
      setTusdAddress(writeContracts.TUSDMock.address);
    }
    else if(network.name === "kovan"){
      setLiquidityProtocolToAddressMap({
        "AAVE":  "0x5571f2E8EB85a807e839eDeDb4c680A66A1B68f8", 
        "Mock" : "0xeb6326060ea5210bd87ffaDF5CcA8959B2e9E2B6",
      });
      setMockPoRPoSAddresses({
        "reserve" : "0x93a5b221F7cA577A747dd76CEE206019dBA0AA93",
        "supply" : "0xe1587EeceA8Dd8D579dAE20E385c2F6d1a84F19d"
      });
      setRealPoRPoSAddresses({
        "reserve" : "0xdD6Dbd1861971455C20d5bd00DeA4DDE704f3554",
        "supply" : "0xC3749f644c988Dc9AA9461D6Cb1d8A5E1d452D99"
      });
      setTusdAddress("0x016750AC630F711882812f24Dba6c95b9D35856d");
    }
  }, [writeContracts, network]);

  useEffect(() => {
    if(!writeContracts) { return; }
    if(!injectedProvider || !injectedProvider.validNetwork) { return; }
    const detectAdmin = async () => {
        const admin = await writeContracts.LiquidityProtocolInsurance.owner();    
        if(address === admin){
          setIsAdmin(true);
        }
    }
    detectAdmin();
  }, [writeContracts, address, injectedProvider]);
   
  const [ depositAmount, setDepositAmount ] = useState(100);
  const [ liquidityProtocol, setLiquidityProtocol ] = useState("AAVE");
  /* APPLICATION SPECIFIC STATES END HERE */
  return (
    <div className="App">
      <Layout>
        {/* ✏️ Edit the header and change the title to your project name */}
        <Header networkName={network && network.name} networks={NETWORKS} />
        <HashRouter>

          <Menu style={{ textAlign:"center" }} selectedKeys={[route]} mode="horizontal">
            <Menu.Item key="/">
              <Link onClick={()=>{setRoute("/")}} to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="/github">
              <a href="https://github.com/chainlink-hackathon2021-insurance" target="_blank" rel="noopener noreferrer">GitHub</a>
            </Menu.Item>
            <Menu.Item key="/devpost">
              <a href="https://devpost.com/software/parametric-digital-asset-risk-management" target="_blank" rel="noopener noreferrer">Devpost</a>
            </Menu.Item>
            <Menu.Item key="/registration-success">
              <Link onClick={()=>{setRoute("/registration-success")}} to="/registration-success">Start Now</Link>
            </Menu.Item>
            {injectedProvider && 
              <Menu.Item key="/dashboard">
                <Link onClick={()=>{setRoute("/dashboard")}} to="/dashboard">Dashboard</Link>
              </Menu.Item>
            }
          </Menu>

          <Switch>
            <Route exact path="/">
              <Home 
                setRoute={setRoute}
              />
            </Route>

            <Route path="/registration-success">
              <RegistrationSuccess 
                provider={injectedProvider}
                address={address} 
                setRoute={setRoute}
                liquidityProtocol={liquidityProtocol}
                setLiquidityProtocol={setLiquidityProtocol}
                />
            </Route>
            {injectedProvider && 
            <>
            <Route exact path="/debug">
              <DebugPanel
                tx={tx}
                writeContracts={writeContracts}
                tusdAddress={tusdAddress}
                provider={injectedProvider}
                mockPoRPoSAddresses={mockPoRPoSAddresses}
                realPoRPoSAddresses={realPoRPoSAddresses}
              />
            </Route>
            <Route exact path="/debug/liquidityProtocolInsurance">
              <Contract
                name="LiquidityProtocolInsurance"
                signer={injectedProvider.getSigner()}
                provider={injectedProvider}
                address={address}
                blockExplorer={blockExplorer}
              />
            </Route>
            <Route path="/debug/mockTUSD">
              <Contract
                  name="TUSDMock"
                  signer={injectedProvider.getSigner()}
                  provider={injectedProvider}
                  address={address}
                  blockExplorer={blockExplorer}
                />  
            </Route>
            <Route path="/debug/liquidityProtocolMock">
              <Contract
                  name="LiquidityProtocolMock"
                  signer={injectedProvider.getSigner()}
                  provider={injectedProvider}
                  address={address}
                  blockExplorer={blockExplorer}
                />  
            </Route>
            <Route path="/debug/ReserveTokenMock">
              <Contract
                  name="ReserveTokenMock"
                  signer={injectedProvider.getSigner()}
                  provider={injectedProvider}
                  address={address}
                  blockExplorer={blockExplorer}
                />  
            </Route>
            <Route path="/smart-contract-details">
              <SmartContractDetails 
                depositAmount={depositAmount}
                liquidityProtocol={liquidityProtocol}
                setDepositAmount={setDepositAmount}
                setRoute={setRoute} />
            </Route>
            <Route path="/review-and-purchase">
              <ReviewAndPurchase
                liquidityProtocol={liquidityProtocol}
                depositAmount={depositAmount}
                liquidityProtocolToAddressMap={liquidityProtocolToAddressMap}
                writeContracts={writeContracts}
                tx={tx}
                tusdAddress={tusdAddress}
                setRoute={setRoute}
                signer={injectedProvider.getSigner()}
                provider={injectedProvider}
                />
            </Route>
            <Route path="/successfully-connected">
              <SuccessfullyConnected />
            </Route>

            <Route path="/dashboard">
              <Dashboard
                writeContracts={writeContracts}
                provider={injectedProvider}
                signer={injectedProvider.getSigner()}
                address={address}
                tx={tx}
              />
            </Route>
            </>
            }
          </Switch>
       

        <ThemeSwitch />


        {/* 👨‍💼 Your account is in the top right with a wallet at connect options */}
        <div style={{ position: "absolute", textAlign: "right", right: 0, top: 0, padding: 10 }}>
          <Account
            address={address}
            provider={injectedProvider}
            web3Modal={web3Modal}
            loadWeb3Modal={loadWeb3Modal}
            logoutOfWeb3Modal={logoutOfWeb3Modal}
            blockExplorer={blockExplorer}
          />
        </div>
      
      <Footer style={{ textAlign: 'center' }}>
        {isAdmin &&    
          <Link to="/debug">Debug Panel</Link>
        }
            
      </Footer>
      </HashRouter>
    </Layout>
    </div>
  );
}


/*
  Web3 modal helps us "connect" external wallets:
*/
const web3Modal = new Web3Modal({
  // network: "mainnet", // optional
  cacheProvider: true, // optional
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider // required
    },
  },
});

const logoutOfWeb3Modal = async () => {
  await web3Modal.clearCachedProvider();
  setTimeout(() => {
    window.location.reload();
  }, 1);
};



export default App;
