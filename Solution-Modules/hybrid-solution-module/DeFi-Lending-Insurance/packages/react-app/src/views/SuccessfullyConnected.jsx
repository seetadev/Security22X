/* eslint-disable jsx-a11y/accessible-emoji */

import React from "react";
import { ContractSteps } from "../components";

export default function SuccessfullyConnected() {
  return (
      <div style={{border:"1px solid #cccccc", padding:16, width:"80%", margin:"auto",marginTop:64}}>
        <h1>Smart Contract Connected</h1>
            <ContractSteps currentStep={4} />
            <img alt="" src="https://ipfs.io/ipfs/QmVFKEynyFEYC5y26ZmLHJkqEX9k33r7jQDdTUhmJcTACN" style={{marginTop: "30px"}} />
            <p style={{marginTop: "30px"}}>Please visit the dashboard to manage your policy.</p>
      </div>
    
  );
}
