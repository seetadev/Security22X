/* eslint-disable jsx-a11y/accessible-emoji */

import React from "react";
import { useHistory } from "react-router-dom";
import { ContractSteps } from "../components";
import { Row, Col, Button, Form, InputNumber, Divider } from "antd";

export default function SmartContractDetails({setRoute, depositAmount, setDepositAmount, liquidityProtocol}) {
    const history = useHistory();

  return (
      <div style={{border:"1px solid #cccccc", padding:16, width:"80%", margin:"auto", marginTop:64}}>
        <h1>Smart Contract Details</h1>
            <ContractSteps currentStep={2} />
            <div style={{margin: "auto", width: "70%"}}>

            <Row>
                <Col span={24} style={{textAlign:"left"}}>
                    <h2>Coverage Overview</h2>
                    <p>Insurance coverage pays a pre-agreed upon amount directly to your wallet immediatly upon {liquidityProtocol} getting hacked.</p>
                </Col>
            </Row>
            <Row style={{marginTop: "30px"}}> 
                <Col span={12}>
                    <Form
                        style={{textAlign: "left"}}
                        layout="vertical"
                        name="basic"
                      
                        >
                        <Form.Item
                            label="Your Deposit Amount"
                            name="amount"
                        >
                            <InputNumber 
                                min="100" 
                                size="middle"
                                defaultValue={depositAmount}
                                onChange={(val)=>{setDepositAmount(val)}} /> 
                        </Form.Item>
                       
                    </Form>
                        <p>TUSD (Minimum: 100 TUSD)</p>
                        <p>APY depends on selected platform.</p>
                </Col>
            <Col span={12}></Col>
            </Row>
            <Divider />

            <h2>Pay with a Percentage of your Earnings</h2>
            <p>Delayed Payment is required to connect the wallet to the Smart Contract as a Service for improved risk management. </p>
            <p>Subscription is good until cancelled</p>
        </div>
        <Row style={{marginTop: "60px"}}>
            <Col span={8}>
                <Button type="primary" onClick={()=>{setRoute("/registration-success"); history.push('/registration-success')}}>Back</Button>
            </Col>
            <Col span={8} offset={8}>
                <Button type="primary" onClick={()=>{setRoute("/review-and-purchase"); history.push('/review-and-purchase')}}>Next</Button>
            </Col>
        </Row>
      </div>
    
  );
}
