/* eslint-disable jsx-a11y/accessible-emoji */

import React from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Button } from "antd";

export default function Home({setRoute}) {
    const history = useHistory();

  return (
      <>
      <div style={{border:"1px solid #cccccc", padding:16, width:"80%", margin:"auto",marginTop:64}}>
        <Row style={{marginTop: "60px"}}>
            <Col span={12}>
                <img alt="" src="https://ipfs.io/ipfs/QmcEmU5LgyCXiRaaKuNYmbHbrypPEZxWJJm8HoaLT5Bmbu" />
            </Col>
            <Col span={12} style={{textAlign: 'left'}}>
                <h1>Risk Management <br /> Smart Contracts enable one to safely venture through Decentralized Finance.</h1>
                <p>Earn interest on your hard-earned capital while passively managing the inherent risks of DeFi.</p>
                <Button type="primary" shape="round" onClick={()=>{setRoute("/registration-success"); history.push('/registration-success')}}>Sign up</Button>
            </Col>
        </Row>
      </div>
      <div style={{border:"1px solid #cccccc", padding:16, width:"80%", margin:"auto",marginTop:64}}>
      <Row style={{marginTop: "60px"}}>
          <Col span={12} style={{textAlign: 'left'}}>
              <div style={{marginLeft: "50px"}}>
                <h1>Mitigate inherent user risk when <br /> interacting with Decentralized Finance (DeFi)  <br />  protocols.</h1>
                <p>DeFi is an emerging market composed of interoperable protocols.</p>
                <p>DeFi protocols are rapidly expanding their Total Value Locked (TVL).</p>
                <p>Rapid protocol expansion leads to rapid expansion of user risk.</p>
                <Button type="primary" shape="round" onClick={()=>{setRoute("/registration-success"); history.push('/registration-success')}}>Sign up</Button>
              </div>
          </Col>
          <Col span={12}>
            <img alt="" src="https://ipfs.io/ipfs/QmWDiATD2mbMDfyzTW3xMv5cwbvoEvWzoc2ribNBfCnMEi" />
          </Col>
      </Row>
    </div>
    <div style={{border:"1px solid #cccccc", padding:16, width:"80%", margin:"auto",marginTop:64}}>
        <Row style={{marginTop: "60px"}}>
            <Col span={12}>
                <img alt="" src="https://ipfs.io/ipfs/QmW1A1pcFN2QtRdrPAV15j6VZgAFPmzhbyrasZvqxdg1rH" />
            </Col>
            <Col span={12} style={{textAlign: 'left'}}>
                <h4>PARAMETRIC RISK MANAGEMENT</h4>
                <h1>DeFi exposes users to theoretically unlimited risk.</h1>
                <p>User risk is at an all time high. Manage your risk today!</p>
                <Button type="primary" shape="round" onClick={()=>{setRoute("/registration-success"); history.push('/registration-success')}}>Sign up</Button>
            </Col>
        </Row>
      </div>
    </>
  );
}
