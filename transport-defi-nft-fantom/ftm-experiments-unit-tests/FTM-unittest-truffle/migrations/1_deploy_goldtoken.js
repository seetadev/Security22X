const GoldToken = artifacts.require("GoldToken");
const web3 = require('web3');
const etherToWei = (n) => {
    return web3.utils.toWei(n.toString(), 'ether');
};
const TOTAL_SUPPLY = etherToWei(1000_000);

module.exports = async (deployer) => {
    await deployer.deploy(GoldToken, TOTAL_SUPPLY);
    const goldToken = await GoldToken.deployed();
};