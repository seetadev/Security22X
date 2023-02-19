/* eslint-disable jsx-a11y/accessible-emoji */

import { Button, Card, Space } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useContractReader } from "../hooks";
import { BigNumber, ethers } from "ethers";
import { formatEther, commify } from "@ethersproject/units";

export default function DebugPanel({writeContracts, tx, tusdAddress, provider, mockPoRPoSAddresses, realPoRPoSAddresses}) {

  const aggregatorAbi = [
    "function latestRoundData() override external view returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound)"
  ];

  const [currentMockTusdReserve, setCurrentMockTusdReserve] = useState(0);
  const [currentTusdReserve, setCurrentTusdReserve] = useState(0);
  const [currentTusdSupply, setCurrentTusdSupply] = useState(0);

  const mockReserve = useContractReader(writeContracts, "LiquidityProtocolMock", "getReserve", [tusdAddress]);
    
  useEffect(() => {
    const fetchData = async () => {
      if(!mockReserve) { return; }
      setCurrentMockTusdReserve(formatEther(mockReserve));
    }
    fetchData();
  }, [mockReserve]);

  useEffect(() => {
    const fetchData = async () => {
    if(!writeContracts) { return; }
      const supplyFeedAddress = await writeContracts.LiquidityProtocolInsurance.getTUSDSupplyFeed();
      const supplyFeed = new ethers.Contract(supplyFeedAddress, aggregatorAbi, provider);
      const supplyData = await supplyFeed.latestRoundData();
      setCurrentTusdSupply(commify(supplyData.answer.div(10**8).toString()));
      const reserveFeedAddress = await writeContracts.LiquidityProtocolInsurance.getTUSDReserveFeed();
      const reserveFeed = new ethers.Contract(reserveFeedAddress, aggregatorAbi, provider);
      const reserveData = await reserveFeed.latestRoundData();
      setCurrentTusdReserve(commify(reserveData.answer.div(10**8).toString()));
    }
    fetchData();
  }, [writeContracts, aggregatorAbi, provider]);



  async function triggerMockReserveHack(){
    const currentReserve = await writeContracts.LiquidityProtocolMock.getReserve(tusdAddress);
    const decreasedTUSDInReserve = currentReserve.sub((currentReserve.mul(75)).div(100));
    tx(writeContracts.LiquidityProtocolMock.setReserve(tusdAddress, decreasedTUSDInReserve));
  }

  async function triggerCheckReserveStatus() {
    tx(writeContracts.LiquidityProtocolInsurance.checkForSignificantReserveDecreaseAndPay());
  }

  async function setReserveContractToMock() {
    tx(writeContracts.LiquidityProtocolInsurance.setTUSDReserveFeed(mockPoRPoSAddresses.reserve));
  }

  async function setSupplyContractToMock() {
    tx(writeContracts.LiquidityProtocolInsurance.setTUSDSupplyFeed(mockPoRPoSAddresses.supply));
  }

  async function triggerTUSDReserveStatus() {
    tx(writeContracts.LiquidityProtocolInsurance.checkForUnstableTUSDPegAndPay());
  }

  async function setUnbalancedReserveValue() {
    tx(writeContracts.MockTUSDReserveFeed.updateAnswer(BigNumber.from('21326049998805076')));
  }

  async function setBalancedReserveValue() {
    tx(writeContracts.MockTUSDReserveFeed.updateAnswer(BigNumber.from('32326049998805076')));
  }

  async function setReserveContractToReal() {
    tx(writeContracts.LiquidityProtocolInsurance.setTUSDReserveFeed(realPoRPoSAddresses.reserve));
  }

  async function setSupplyContractToReal() {
    tx(writeContracts.LiquidityProtocolInsurance.setTUSDSupplyFeed(realPoRPoSAddresses.supply));
  }

  async function distributeDonations() {
    tx(writeContracts.LiquidityProtocolInsurance.distributeDonations());
  }


  return (
      <div style={{border:"1px solid #cccccc", padding:16, width:"80%", margin:"auto",marginTop:64}}>
       <h1>Debug Panel</h1>       
        <Space direction="horizontal">
          <Card title="Contract Debug Panels" style={{ width: 300 }}>
            <p><Link to="/debug/liquidityProtocolInsurance">LiquidityProtocolInsurance</Link></p>
            <p><Link to="/debug/liquidityProtocolMock">LiquidityProtocolMock</Link></p>
            <p><Link to="/debug/reserveTokenMock">Reserve Token Mock</Link></p>      
            <p><Link to="/debug/mockTUSD">TUSD Mock (only local)</Link></p>
          </Card>
          <Card title="Reserve" style={{ width: 300, textAlign: 'left' }}>
            <p>Current Mock TUSD Reserve: <br /> {currentMockTusdReserve} TUSD</p>
            <p><Button type="danger" style={{ width: "238px"}} onClick={async ()=> { triggerMockReserveHack();}}>Trigger Mock Reserve Hack</Button></p>
            <p><Button type="primary" style={{ width: "238px"}} onClick={async ()=> { triggerCheckReserveStatus();}} >Trigger Reserve Status Check</Button></p>
          </Card>
          <Card title="PoS / PoR" style={{ width: 300, textAlign: 'left' }}>
            <p>Current TUSD Supply: <br /> $ {currentTusdSupply} </p>
            <p>Current TUSD Reserve: <br /> $ {currentTusdReserve} </p>
            <p><Button type="danger" style={{ width: "238px"}} onClick={async ()=> { setReserveContractToMock();}} >PoR: Set Mock PoR</Button></p>
            <p><Button type="danger" style={{ width: "238px"}} onClick={async ()=> { setSupplyContractToMock();}} >PoS: Set Mock PoS</Button></p>
            <p><Button type="danger" style={{ width: "238px"}} onClick={async ()=> { setUnbalancedReserveValue();}} >PoR: Set unbalanced value</Button></p>
            <p><Button type="primary" style={{ width: "238px"}} onClick={async ()=> { triggerTUSDReserveStatus();}} >Check PoS/PoR status</Button></p>
            <p><Button type="primary" style={{ width: "238px"}} onClick={async ()=> { setBalancedReserveValue();}} >PoR: Set balanced value</Button></p>
            <p><Button type="primary" style={{ width: "238px"}} onClick={async ()=> { setReserveContractToReal();}} >PoR: Set Real PoR</Button></p>
            <p><Button type="primary" style={{ width: "238px"}} onClick={async ()=> { setSupplyContractToReal();}} >PoS: Set Real PoS</Button></p>
          </Card>

          <Card title="Donations" style={{ width: 300, textAlign: 'left' }}>
            <p><Button type="primary" style={{ width: "238px"}} onClick={async ()=> { distributeDonations();}} >Distribute Donations</Button></p>
          </Card>
        </Space>
      </div>
    
  );
}
