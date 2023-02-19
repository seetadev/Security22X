/* eslint-disable jsx-a11y/accessible-emoji */

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ContractSteps } from "../components";
import { Row, Col, Button, Switch, Divider } from "antd";
import { ethers } from "ethers";
import { parseEther } from "@ethersproject/units";

export default function ReviewAndPurchase({setRoute, depositAmount, liquidityProtocol, writeContracts, tx, liquidityProtocolToAddressMap, tusdAddress, provider, signer}) {
    const history = useHistory();
    
    const [approved, setApproved] = useState(false);
    const [supportsDonations, setSupportsDonations] = useState(false);
    const erc20Abi = [
        "function balanceOf(address owner) view returns (uint256)",
        "function approve(address _spender, uint256 _value) public returns (bool success)",
        "function allowance(address _owner, address _spender) public view returns (uint256 remaining)"
    ];

    useEffect(() => {
        if(provider && !provider.validNetwork){ 
            alert("Invalid Network");
            window.location = "/";
            return;
        }
    }, [provider]);

    return (
      <div style={{border:"1px solid #cccccc", padding:16, width:"80%", margin:"auto",marginTop:64}}>
        <h1>Review and Purchase</h1>
            <ContractSteps currentStep={3} />
            <div style={{margin: "auto", width: "70%"}}>

            <Row>
                <Col span={24} style={{textAlign:"left"}}>
                    <h2>Coverage Type</h2>
                    <p>Insurance coverage pays a pre-agreed upon amount directly to your wallet immediatly upon {liquidityProtocol} getting hacked.</p>
                </Col>
            </Row>
            <Row style={{marginTop: "30px"}}> 
                <Col span={12}>
                <Row>
                    <Col span={12}>
                        <p>Your Deposit Amount</p>
                        <p>{depositAmount} TUSD </p>
                    </Col>
                    <Col span={12}>
                        <p>Selected Platform</p>
                        <p>{liquidityProtocol}</p>
                    </Col>
                </Row>
                    
                   
                </Col>
            <Col span={12}></Col>
            </Row>
            <Divider />

            <h3>Terms and Conditions</h3>
            <p>An Upfront Payment is required to connect the wallet to the Smart Contract as a Service for improved risk management. Withdrawals or cancelations will take up to 48 hours due to limitations with the connected platform's "Available Liquidity." Subscription is good until cancelled.</p>
            <p>Cryptocurrency allows for improved transparency when it comes to charitable donations and organizations. If you are interested in supporting social causes using blockchain, consider making a charitable donation to giveth.io using a portion of your profits. </p>
            <p>Would you like to automatically donate a 1% of your yearly profits to giveth.io? <Switch onChange={(val) => {setSupportsDonations(val)}} /> <a href="https://giveth.io/" target="_blank" rel="noopener noreferrer">Click here to learn more.</a></p>
        </div>
        <Row style={{marginTop: "60px"}}>
            <Col span={8}>
                <Button type="primary" onClick={()=>{setRoute("/smart-contract-details"); history.push('/smart-contract-details')}}>Back</Button>
            </Col>
            <Col span={8} offset={8}>
                <Button disabled={approved} type="danger" onClick={async ()=>{
                    const erc20Contract = new ethers.Contract(tusdAddress, erc20Abi, provider);
                    const result = await tx(erc20Contract.connect(signer).approve(writeContracts.LiquidityProtocolInsurance.address,  parseEther(depositAmount.toString())));
                    if(result){
                        setApproved(true);
                    }
                }}>Pending Approval</Button>
                <Button disabled={!approved} type="primary" onClick={async ()=>{
                    const result = await tx( writeContracts.LiquidityProtocolInsurance.registerInsurancePolicy(
                        parseEther(depositAmount.toString()), 
                        liquidityProtocolToAddressMap[liquidityProtocol],
                        supportsDonations
                        ));  
                    if(result){
                        setRoute("/successfully-connected"); 
                        history.push('/successfully-connected');
                    }
                }}>Next</Button>
            </Col>
        </Row>
      </div>
    
  );
}
