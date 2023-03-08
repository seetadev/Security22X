require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const API_KEY = process.env.API_KEY;
module.exports = {
    networks: {
      development: {
        host: "127.0.0.1",
        port: 9545,
        network_id: "*" // Match any network id
      },
      testnet: {
        provider: () =>
          new HDWalletProvider(
            PRIVATE_KEY,
            `https://rpc.testnet.fantom.network`
          ),
        network_id: 4002,
      },
      mainnet: {
        provider: () =>
          new HDWalletProvider(
            PRIVATE_KEY,
            `https://rpcapi.fantom.network`
          ),
        network_id: 250,
      },
    },
    compilers: {
      solc: {
        version: "0.8.17",
        settings: {          // See the solidity docs for advice about optimization and evmVersion
          optimizer: {
          enabled: false,
          runs: 200
          },
        },
      },
    },
    plugins: [
        'truffle-contract-size',
        'truffle-plugin-verify'
      ],
      api_keys: {
        ftmscan: API_KEY,
        testnet_ftmscan: API_KEY
      }
  };