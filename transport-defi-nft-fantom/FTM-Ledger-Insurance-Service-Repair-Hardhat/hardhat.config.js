require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

module.exports = {
  solidity: "0.8.17",
  networks: {
    fantom: {
      url: process.env.RPC_URL,
    },
    localhost: {
      url: "http://127.0.0.1:8545"
    },
  }
};