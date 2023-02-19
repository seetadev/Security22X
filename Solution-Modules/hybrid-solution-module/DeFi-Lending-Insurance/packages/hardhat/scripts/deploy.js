/* eslint no-use-before-define: "warn" */
const fs = require("fs");
const chalk = require("chalk");
const { config, ethers, tenderly, run } = require("hardhat");
const { utils } = require("ethers");
const R = require("ramda");

const main = async () => {
  let targetNetwork = process.env.HARDHAT_NETWORK || config.defaultNetwork
  console.log("\n\n 📡 Deploying... to "+targetNetwork+"\n");
  const [deployer, client, donee] = await ethers.getSigners();

  if(targetNetwork === "localhost"){
    const tusdMock = await deploy("TUSDMock");
    const reserveTokenMock = await deploy("ReserveTokenMock");
    const tusdReserveMock = await deploy("MockTUSDReserveFeed", [8, '32450358663000000']);
    const tusdSupplyMock = await deploy("MockTUSDSupplyFeed", [8, '32326049998805076']);
    const liquidityProtocolMock = await deploy("LiquidityProtocolMock", [reserveTokenMock.address]);

    //Add To Reserve
    await tusdMock.faucet(liquidityProtocolMock.address, 1000);
    await liquidityProtocolMock.setReserve(tusdMock.address, 1000);
    const liquidityProtocolInsurance = await deploy("LiquidityProtocolInsurance", [
                                                                                    [liquidityProtocolMock.address],
                                                                                    tusdMock.address,
                                                                                    tusdSupplyMock.address,
                                                                                    tusdReserveMock.address,
                                                                                    donee.address
                                                                                  ]); 
  }
  else if(targetNetwork === "kovan"){
    const tusdAddress = "0x016750AC630F711882812f24Dba6c95b9D35856d";
    const tusdSupplyFeedAddress = "0x4A5fd3745AC94026dd05F4F8a7d358c16a87B240";
    const tusdReserveFeedAddress = "0xcFaAc8333598e3809712693E4ed72306416d20CD";
    const aaveAddresses = {
      lendingPool :  "0xE0fBa4Fc209b4948668006B2bE61711b7f465bAe",
      protocolDataProvider : "0x3c73A5E5785cAC854D468F727c606C07488a29D6"
    }

    const tusdReserveMock = await deploy("MockTUSDReserveFeed", [8, '32450358663000000']);
    const tusdSupplyMock = await deploy("MockTUSDSupplyFeed", [8, '32326049998805076']);
    const aaveLiquidityProtocol = await deploy("AaveLiquidityProtocol", [aaveAddresses.protocolDataProvider, aaveAddresses.lendingPool]);
    const reserveTokenMock = await deploy("ReserveTokenMock");
    const liquidityProtocolMock = await deploy("LiquidityProtocolMock", [reserveTokenMock.address]);
    const donee = "0x634977e11C823a436e587C1a1Eca959588C64287" // giveth.io address
    const liquidityProtocolInsurance = await deploy("LiquidityProtocolInsurance", [
                                                                                    [liquidityProtocolMock.address, 
                                                                                    aaveLiquidityProtocol.address],
                                                                                    tusdAddress,
                                                                                    tusdSupplyFeedAddress,
                                                                                    tusdReserveFeedAddress,
                                                                                    donee
                                                                                  ]); 

  }
                                                                                

  //const yourContract = await ethers.getContractAt('YourContract', "0xaAC799eC2d00C013f1F11c37E654e59B0429DF6A") //<-- if you want to instantiate a version of a contract at a specific address!
  //const secondContract = await deploy("SecondContract")

  // const exampleToken = await deploy("ExampleToken")
  // const examplePriceOracle = await deploy("ExamplePriceOracle")
  // const smartContractWallet = await deploy("SmartContractWallet",[exampleToken.address,examplePriceOracle.address])

  /*
  //If you want to send value to an address from the deployer
  const deployerWallet = ethers.provider.getSigner()
  await deployerWallet.sendTransaction({
    to: "0x34aA3F359A9D614239015126635CE7732c18fDF3",
    value: ethers.utils.parseEther("0.001")
  })
  */


  /*
  //If you want to send some ETH to a contract on deploy (make your constructor payable!)
  const yourContract = await deploy("YourContract", [], {
  value: ethers.utils.parseEther("0.05")
  });
  */


  /*
  //If you want to link a library into your contract:
  // reference: https://github.com/austintgriffith/scaffold-eth/blob/using-libraries-example/packages/hardhat/scripts/deploy.js#L19
  const yourContract = await deploy("YourContract", [], {}, {
   LibraryName: **LibraryAddress**
  });
  */


  //If you want to verify your contract on tenderly.co (see setup details in the scaffold-eth README!)
  /*
  await tenderlyVerify(
    {contractName: "YourContract",
     contractAddress: yourContract.address
  })
  */

  // If you want to verify your contract on etherscan
  /*
  console.log(chalk.blue('verifying on etherscan'))
  await run("verify:verify", {
    address: yourContract.address,
    // constructorArguments: args // If your contract has constructor arguments, you can pass them as an array
  })
  */

  console.log(
    " 💾  Artifacts (address, abi, and args) saved to: ",
    chalk.blue("packages/hardhat/artifacts/"),
    "\n\n"
  );
};

const deploy = async (contractName, _args = [], overrides = {}, libraries = {}) => {
  console.log(` 🛰  Deploying: ${contractName}`);

  const contractArgs = _args || [];
  const contractArtifacts = await ethers.getContractFactory(contractName,{libraries: libraries});
  const deployed = await contractArtifacts.deploy(...contractArgs, overrides);
  const encoded = abiEncodeArgs(deployed, contractArgs);
  fs.writeFileSync(`artifacts/${contractName}.address`, deployed.address);

  let extraGasInfo = ""
  if(deployed&&deployed.deployTransaction){
    const gasUsed = deployed.deployTransaction.gasLimit.mul(deployed.deployTransaction.gasPrice)
    extraGasInfo = `${utils.formatEther(gasUsed)} ETH, tx hash ${deployed.deployTransaction.hash}`
  }

  console.log(
    " 📄",
    chalk.cyan(contractName),
    "deployed to:",
    chalk.magenta(deployed.address)
  );
  console.log(
    " ⛽",
    chalk.grey(extraGasInfo)
  );

  await tenderly.persistArtifacts({
    name: contractName,
    address: deployed.address
  });

  if (!encoded || encoded.length <= 2) return deployed;
  fs.writeFileSync(`artifacts/${contractName}.args`, encoded.slice(2));

  return deployed;
};


// ------ utils -------

// abi encodes contract arguments
// useful when you want to manually verify the contracts
// for example, on Etherscan
const abiEncodeArgs = (deployed, contractArgs) => {
  // not writing abi encoded args if this does not pass
  if (
    !contractArgs ||
    !deployed ||
    !R.hasPath(["interface", "deploy"], deployed)
  ) {
    return "";
  }
  const encoded = utils.defaultAbiCoder.encode(
    deployed.interface.deploy.inputs,
    contractArgs
  );
  return encoded;
};

// checks if it is a Solidity file
const isSolidity = (fileName) =>
  fileName.indexOf(".sol") >= 0 && fileName.indexOf(".swp") < 0 && fileName.indexOf(".swap") < 0;

const readArgsFile = (contractName) => {
  let args = [];
  try {
    const argsFile = `./contracts/${contractName}.args`;
    if (!fs.existsSync(argsFile)) return args;
    args = JSON.parse(fs.readFileSync(argsFile));
  } catch (e) {
    console.log(e);
  }
  return args;
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// If you want to verify on https://tenderly.co/
const tenderlyVerify = async ({contractName, contractAddress}) => {

  let tenderlyNetworks = ["kovan","goerli","mainnet","rinkeby","ropsten","matic","mumbai","xDai","POA"]
  let targetNetwork = process.env.HARDHAT_NETWORK || config.defaultNetwork

  if(tenderlyNetworks.includes(targetNetwork)) {
    console.log(chalk.blue(` 📁 Attempting tenderly verification of ${contractName} on ${targetNetwork}`))

    await tenderly.persistArtifacts({
      name: contractName,
      address: contractAddress
    });

    let verification = await tenderly.verify({
        name: contractName,
        address: contractAddress,
        network: targetNetwork
      })

    return verification
  } else {
      console.log(chalk.grey(` 🧐 Contract verification not supported on ${targetNetwork}`))
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
