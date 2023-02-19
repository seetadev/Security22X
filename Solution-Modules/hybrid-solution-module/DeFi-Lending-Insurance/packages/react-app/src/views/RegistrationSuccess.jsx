/* eslint-disable jsx-a11y/accessible-emoji */

import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ContractSteps } from "../components";
import { Row, Col, Button, Form, Select } from "antd";

export default function RegistrationSuccess({address, setRoute, liquidityProtocol, setLiquidityProtocol, provider}) {
    const history = useHistory();

    const { Option } = Select;

    const layout = {
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 16,
        },
      };
    
    useEffect(() => {
        if(provider && !provider.validNetwork){ 
            alert("Invalid Network");
            window.location = "/";
            return;
        }
    }, [provider]);
    
      
  return (
      <div style={{border:"1px solid #cccccc", padding:16, width:"80%", margin:"auto",marginTop:64}}>
        <h1>Registration</h1>
        <ContractSteps currentStep={1} />
        <Row style={{marginTop: "60px"}}>
            <Col span={12}>
                <img alt="" src="https://ipfs.io/ipfs/QmPQCR3DxgJytoNRwKdudz6bnJbwhp4hRneXgnTb5dj817" />
            </Col>
            <Col span={12}>
                <h3>Connected Platforms</h3>
                {provider && provider.connection.url !== "unknown:" ? 
                <Form
                    style={{textAlign: "left"}}
                    {...layout}
                    layout="vertical"
                    initialValues={{
                        remember: true,
                    }}
                    >
                    <Form.Item
                        label="Address"                        
                    >

                        {address}
                    </Form.Item>

                    <Form.Item
                        label="Selected Platform"
                    >
                         <Select onChange={(val) => {setLiquidityProtocol(val)}} defaultValue={liquidityProtocol ? liquidityProtocol : "aave" }>
                            <Option value="AAVE">AAVE</Option>
                            <Option value="Mock">Mock Protocol</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Selected Product"
                    >
                         <Select defaultValue="TUSD" disabled>
                            <Option value="TUSD">TUSD</Option>
                        </Select>
                    </Form.Item>
                </Form>
                : (
                    <p>Please connect your wallet using the Connect button before proceeding.</p>
                )}
            </Col>
        </Row>
        <Row style={{marginTop: "60px"}}>
            <Col span={8}>
                <Button type="primary">Back</Button>
            </Col>
            {provider && provider.connection.url !== "unknown:" &&
                <Col span={8} offset={8}>
                    <Button type="primary" onClick={()=>{setRoute("/smart-contract-details"); history.push('/smart-contract-details')}}>Next</Button>
                </Col>
            }
        </Row>
      </div>
    
  );
}
