//BLOCKNATIVE ID FOR Notify.js:
export const BLOCKNATIVE_DAPPID = "db183622-7acf-4919-9ff7-caea2585dc30"


// EXTERNAL CONTRACTS
export const NETWORK = (chainId)=>{
  for(let n in NETWORKS){
    if(NETWORKS[n].chainId === chainId){
      return NETWORKS[n]
    }
  }
}

export const NETWORKS = {
    31337: {
        name: "localhost",
        color: '#666666',
        chainId: 31337,
        blockExplorer: '',
        rpcUrl: "http://" + window.location.hostname + ":8545",
        valid: true
    },
    /*
    1: {
        name: "mainnet",
        color: '#ff8b9e',
        chainId: 1,
        blockExplorer: "https://etherscan.io/",
    },
    */
    42: {
        name: "kovan",
        color: '#7003DD',
        chainId: 42,
        blockExplorer: "https://kovan.etherscan.io/",
        faucet: "https://gitter.im/kovan-testnet/faucet",//https://faucet.kovan.network/
    },
    /*
    4: {
        name: "rinkeby",
        color: '#e0d068',
        chainId: 4,
        faucet: "https://faucet.rinkeby.io/",
        blockExplorer: "https://rinkeby.etherscan.io/",
    },
    3: {
        name: "ropsten",
        color: '#F60D09',
        chainId: 3,
        faucet: "https://faucet.ropsten.be/",
        blockExplorer: "https://ropsten.etherscan.io/",
    },
    5: {
        name: "goerli",
        color: '#0975F6',
        chainId: 5,
        faucet: "https://goerli-faucet.slock.it/",
        blockExplorer: "https://goerli.etherscan.io/",
    },
    100: {
        name: "xdai",
        color: '#48a9a6',
        chainId: 100,
        price: 1,
        gasPrice:1000000000,
        rpcUrl: "https://dai.poa.network",
        faucet: "https://xdai-faucet.top/",
        blockExplorer: "https://blockscout.com/poa/xdai/",
    },
    137: {
        name: "matic",
        color: '#2bbdf7',
        chainId: 137,
        price: 1,
        gasPrice:1000000000,
        rpcUrl: "https://rpc-mainnet.maticvigil.com",
        faucet: "https://faucet.matic.network/",
        blockExplorer: "https://explorer-mainnet.maticvigil.com//",
    },
    80001: {
        name: "mumbai",
        color: '#92D9FA',
        chainId: 80001,
        price: 1,
        gasPrice:1000000000,
        rpcUrl: "https://rpc-mumbai.maticvigil.com",
        faucet: "https://faucet.matic.network/",
        blockExplorer: "https://mumbai-explorer.matic.today/",
    }*/
}
