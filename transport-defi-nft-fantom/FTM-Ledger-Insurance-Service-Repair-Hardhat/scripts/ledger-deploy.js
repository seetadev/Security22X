const { LedgerSigner } = require("@anders-t/ethers-ledger");

// Main task for deployment signed with Ledger HD wallet
async function main() {
    // Establishing comunication with Ledger HW wallet
    // using third party provider https://www.npmjs.com/package/@anders-t/ethers-ledger
    const ledger = new LedgerSigner(hre.ethers.provider);
    console.log("Ledger found.");

    // Proccessing contract code
    // GLDToken is name of contract to deploy
    console.log("Processing contact…");
    const GLDToken = await hre.ethers.getContractFactory("GLDToken");
    let contractFactory = await GLDToken.connect(ledger)

    // Creation of transaction which needs to be signed with Ledger
    console.log("Waiting for the sign…");
    const contract = await contractFactory.deploy('10000000000000000000000');

    // Deployment of the contract
    console.log("Deploying…");
    await contract.deployed();

    // Log of deployed contract address
    console.log({ contractAddress: contract.address });
}

// Task call
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });