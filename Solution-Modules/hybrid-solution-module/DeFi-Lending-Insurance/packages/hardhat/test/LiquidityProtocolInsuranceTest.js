const { ethers } = require("hardhat");
const { use, expect } = require("chai");
const { solidity } = require("ethereum-waffle");
const { addDays } = require('../utils');

use(solidity);

describe("Liquidity Protocol Insurance App", () => {
  let mainInsuranceContract, mainInsuranceContractUnstableReserve;
  let liquidityProtocolMock, tusdMock, reserveTokenMock;
  let tusdReserveMock, tusdSupplyMock, tusdReserveUnstableMock;
  let owner, addr1, donationAddress;

  let validCoverageData;

  beforeEach(async () => {
    [owner, addr1, donee] = await ethers.getSigners();

    const TUSDMock = await ethers.getContractFactory("TUSDMock");
    const ReserveTokenMock = await ethers.getContractFactory("ReserveTokenMock");
    const TUSDReserveFeedMock = await ethers.getContractFactory("MockTUSDReserveFeed");
    const TUSDSupplyFeedMock = await ethers.getContractFactory("MockTUSDSupplyFeed");

    tusdMock = await TUSDMock.deploy();
    reserveTokenMock = await ReserveTokenMock.deploy();
    tusdReserveMock = await TUSDReserveFeedMock.deploy(8, '32450358663000000');
    tusdSupplyMock = await TUSDSupplyFeedMock.deploy(8,   '32326049998805076');
    tusdReserveUnstableMock = await TUSDReserveFeedMock.deploy(8, '21326049998805076');

    const LiquidityProtocolMock = await ethers.getContractFactory("LiquidityProtocolMock");
    const LiquidityProtocolInsurance = await ethers.getContractFactory("LiquidityProtocolInsurance");
    liquidityProtocolMock = await LiquidityProtocolMock.deploy(reserveTokenMock.address);
    const liquidityProtocolImplementations = [liquidityProtocolMock.address];
    mainInsuranceContract = await LiquidityProtocolInsurance.deploy(liquidityProtocolImplementations,
                                                                tusdMock.address,
                                                                tusdSupplyMock.address,
                                                                tusdReserveMock.address,
                                                                donee.address);
    mainInsuranceContractUnstableReserve = await LiquidityProtocolInsurance.deploy(liquidityProtocolImplementations,
                                                                  tusdMock.address,
                                                                  tusdSupplyMock.address,
                                                                  tusdReserveUnstableMock.address,
                                                                  donee.address);
    //Fund main insurance contracts with Mock TUSDs
    tusdMock.faucet(mainInsuranceContract.address, 10000);
    tusdMock.faucet(mainInsuranceContractUnstableReserve.address, 10000);
    
    
    validCoverageData = {
      amountInsured: 2000,
      liquidityProtocol: liquidityProtocolMock.address,
    };
    await tusdMock.faucet(addr1.address, 2000);
    await tusdMock.connect(addr1).approve(mainInsuranceContract.address, 2000);
    
    await mainInsuranceContract.connect(addr1).registerInsurancePolicy(
      validCoverageData.amountInsured, 
      validCoverageData.liquidityProtocol,
      false);


  })

  describe("Register insurance policy", () => {

    it("Should NOT create insurance policy if the liquidity protocol is not whitelisted", async () => {
          
      const invalidCoverageData = {
        amountInsured: 2000,
        liquidityProtocol: owner.address
      };

      await expect(mainInsuranceContract.connect(addr1).registerInsurancePolicy(
                                                                            invalidCoverageData.amountInsured, 
                                                                            invalidCoverageData.liquidityProtocol,
                                                                            false))
        .to.be.revertedWith("Liquidity Protocol address not found in the whitelist");
    });

    it("Should create and register an insurance policy", async () => {
      const amountInsured = 2000;
      const expectedReserveTokensToHaveInContract = amountInsured * 0.95;
      const expectedReserveTokensToKeepInMainContract = amountInsured * 0.05;
    
      const insuranceContractAddress = await mainInsuranceContract.insuranceContractOwnerships(addr1.address, 0);
      const contract = await ethers.getContractAt("InsuranceContract", insuranceContractAddress);
      expect(await contract.beneficiary()).to.be.equal(addr1.address);
      expect(await reserveTokenMock.balanceOf(insuranceContractAddress)).to.be.equal(expectedReserveTokensToHaveInContract);
      expect(await reserveTokenMock.balanceOf(mainInsuranceContract.address)).to.be.equal(expectedReserveTokensToKeepInMainContract);
    });

    it("Should get insurance policies by user", async () => {
      const insurancePolicies = await mainInsuranceContract.connect(addr1).getInsurancePolicyAddresses();
      expect(insurancePolicies.length).to.be.equal(1);
    });

    it("Should allow a user to withdraw their funds", async () => {

      const insuranceContractAddress = await mainInsuranceContract.insuranceContractOwnerships(addr1.address, 0);
      await mainInsuranceContract.connect(addr1).withdraw(insuranceContractAddress);
      expect(await tusdMock.balanceOf(addr1.address)).to.be.equal(validCoverageData.amountInsured - (validCoverageData.amountInsured  * 0.05)); 

    });

    it("Should NOT allow a user to withdraw other user's funds", async () => {
      const insuranceContractAddress = await mainInsuranceContract.insuranceContractOwnerships(addr1.address, 0);
      await expect(mainInsuranceContract.withdraw(insuranceContractAddress)).to.be.revertedWith("only a beneficiary can trigger a withdrawal");

    });

  });

 describe("Payouts - Liquidity Protocol Reserve (Parameter One)" , () => {

    it("Should NOT call pay function if not admin", async () => {
      await expect(mainInsuranceContract.connect(addr1).checkForSignificantReserveDecreaseAndPay())
        .to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("Should NOT pay out if there is NOT a significant decrease of the liquidity pool (reserve)", async () => {
      const insuranceContractAddress = await mainInsuranceContract.insuranceContractOwnerships(addr1.address, 0);

      const insuranceContractTUSDBalanceBefore = await tusdMock.balanceOf(insuranceContractAddress);
      expect(insuranceContractTUSDBalanceBefore).to.be.equal(0);
      await mainInsuranceContract.checkForSignificantReserveDecreaseAndPay();
      const insuranceContractTUSDBalanceAfter = await tusdMock.balanceOf(insuranceContractAddress);
      expect(insuranceContractTUSDBalanceBefore).to.be.equal(insuranceContractTUSDBalanceAfter);
    });

    it("Should pay out if there is a significant decrease of the liquidity pool (reserve)", async () => {
      expect(await tusdMock.balanceOf(addr1.address)).to.be.equal(0); 
      const insuranceContractAddress = await mainInsuranceContract.insuranceContractOwnerships(addr1.address, 0);
      
      const currentTUSDInLiquidityProtocolMockReserve = await liquidityProtocolMock.getReserve(tusdMock.address);
      const decreasedTUSDInReserve = Math.floor(currentTUSDInLiquidityProtocolMockReserve - (currentTUSDInLiquidityProtocolMockReserve * 0.75));
      await liquidityProtocolMock.setReserve(tusdMock.address, decreasedTUSDInReserve);

      await mainInsuranceContract.checkForSignificantReserveDecreaseAndPay();
      expect(await tusdMock.balanceOf(insuranceContractAddress)).to.be.equal(0); 
      
      expect(await tusdMock.balanceOf(addr1.address)).to.be.equal(validCoverageData.amountInsured); 

    });

  });

  describe("Payouts - Proof of Reserve (Parameter Two)", () => {
    it("Should NOT pay out if PoR / PoS is STABLE", async () => {
      const insuranceContractAddress = await mainInsuranceContract.insuranceContractOwnerships(addr1.address, 0);

      expect(await mainInsuranceContract.checkStatusForUnstableTUSDPeg()).to.be.false;
      const insuranceContractTUSDBalanceBefore = await tusdMock.balanceOf(insuranceContractAddress);
      expect(insuranceContractTUSDBalanceBefore).to.be.equal(0);
      await mainInsuranceContract.checkForUnstableTUSDPegAndPay();
      const insuranceContractTUSDBalanceAfter = await tusdMock.balanceOf(insuranceContractAddress);
      expect(insuranceContractTUSDBalanceBefore).to.be.equal(insuranceContractTUSDBalanceAfter);
    });

    it("Should pay out if PoR / PoS is UNSTABLE", async () => {
      await tusdMock.faucet(addr1.address, 2000);
      await tusdMock.connect(addr1).approve(mainInsuranceContractUnstableReserve.address, 2000);
      await mainInsuranceContractUnstableReserve.connect(addr1).registerInsurancePolicy(
      validCoverageData.amountInsured, 
      validCoverageData.liquidityProtocol,
      false);

      const insuranceContractAddress = await mainInsuranceContractUnstableReserve.insuranceContractOwnerships(addr1.address, 0);
      expect(await mainInsuranceContractUnstableReserve.checkStatusForUnstableTUSDPeg()).to.be.true;      
      await mainInsuranceContractUnstableReserve.checkForUnstableTUSDPegAndPay();         
      expect(await tusdMock.balanceOf(insuranceContractAddress)).to.be.equal(0); 
      expect(await tusdMock.balanceOf(addr1.address)).to.be.equal(validCoverageData.amountInsured);              
    });

  });

  describe("Chainlink Keepers", () => {
    it("Shouldn't execute upkeep function for STABLE PoS/PoR", async () => {
      const insuranceContractAddress = await mainInsuranceContract.insuranceContractOwnerships(addr1.address, 0);
      expect(await mainInsuranceContract.checkStatusForUnstableTUSDPeg()).to.be.false;
      const insuranceContractTUSDBalanceBefore = await tusdMock.balanceOf(insuranceContractAddress);
      expect(insuranceContractTUSDBalanceBefore).to.be.equal(0);
      
      const fooCheckData = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("foo"));
      const { upkeepNeeded } = await mainInsuranceContract.callStatic.checkUpkeep(fooCheckData);
      
      expect(upkeepNeeded).to.be.false;
      const insuranceContractTUSDBalanceAfter = await tusdMock.balanceOf(insuranceContractAddress);
      expect(insuranceContractTUSDBalanceBefore).to.be.equal(insuranceContractTUSDBalanceAfter);

    });

    it("Should execute upkeep function for UNSTABLE PoS/PoR", async () => {
      await tusdMock.faucet(addr1.address, 2000);
      await tusdMock.connect(addr1).approve(mainInsuranceContractUnstableReserve.address, 2000);
      await mainInsuranceContractUnstableReserve.connect(addr1).registerInsurancePolicy(
      validCoverageData.amountInsured, 
      validCoverageData.liquidityProtocol,
      false);
      const insuranceContractAddress = await mainInsuranceContractUnstableReserve.insuranceContractOwnerships(addr1.address, 0);

      const fooCheckData = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("foo"));
      const { upkeepNeeded, performData } = await mainInsuranceContractUnstableReserve.callStatic.checkUpkeep(fooCheckData);
      await mainInsuranceContractUnstableReserve.performUpkeep(performData);
      
      expect(upkeepNeeded).to.be.true;
      expect(await tusdMock.balanceOf(insuranceContractAddress)).to.be.equal(0); 
      expect(await tusdMock.balanceOf(addr1.address)).to.be.equal(validCoverageData.amountInsured);
    });

    it("Shoudn't execute upkeep function for NORMAL liquidity protocol", async () => {
        const insuranceContractAddress = await mainInsuranceContract.insuranceContractOwnerships(addr1.address, 0);

        const insuranceContractTUSDBalanceBefore = await tusdMock.balanceOf(insuranceContractAddress);
        expect(insuranceContractTUSDBalanceBefore).to.be.equal(0);

        const fooCheckData = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("foo"));
        const { upkeepNeeded } = await mainInsuranceContract.callStatic.checkUpkeep(fooCheckData);

        expect(upkeepNeeded).to.be.false;
        const insuranceContractTUSDBalanceAfter = await tusdMock.balanceOf(insuranceContractAddress);
        expect(insuranceContractTUSDBalanceBefore).to.be.equal(insuranceContractTUSDBalanceAfter);
    });

    it("Should execute upkeep function for DRAINED liquidity protocol", async () => {
        expect(await tusdMock.balanceOf(addr1.address)).to.be.equal(0); 
        const insuranceContractAddress = await mainInsuranceContract.insuranceContractOwnerships(addr1.address, 0);
        
        const currentTUSDInLiquidityProtocolMockReserve = await liquidityProtocolMock.getReserve(tusdMock.address);
        const decreasedTUSDInReserve = Math.floor(currentTUSDInLiquidityProtocolMockReserve - (currentTUSDInLiquidityProtocolMockReserve * 0.75));
        await liquidityProtocolMock.setReserve(tusdMock.address, decreasedTUSDInReserve);
  
        const fooCheckData = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("foo"));
        const { upkeepNeeded, performData } = await mainInsuranceContract.callStatic.checkUpkeep(fooCheckData);
        await mainInsuranceContract.performUpkeep(performData);
        
        expect(upkeepNeeded).to.be.true;
        expect(await tusdMock.balanceOf(insuranceContractAddress)).to.be.equal(0); 
        expect(await tusdMock.balanceOf(addr1.address)).to.be.equal(validCoverageData.amountInsured); 
    });

  });

  describe("Donations" , () => {
    it("Should pay to donee 1% if contract supports donations", async () => {
      await tusdMock.faucet(addr1.address, 2000);
      await tusdMock.connect(addr1).approve(mainInsuranceContract.address, 2000);

      await mainInsuranceContract.connect(addr1).registerInsurancePolicy(
        validCoverageData.amountInsured, 
        validCoverageData.liquidityProtocol,
        true);

      const insuranceContractAddress = await mainInsuranceContract.insuranceContractOwnerships(addr1.address, 1);
      
      await reserveTokenMock.faucet(insuranceContractAddress, 2200);
      await tusdMock.faucet(liquidityProtocolMock.address, 2200);
      await mainInsuranceContract.distributeDonations();
      expect(await tusdMock.balanceOf(donee.address)).to.be.equal(21);
    });
  })

});