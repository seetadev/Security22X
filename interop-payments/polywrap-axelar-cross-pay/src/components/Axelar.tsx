import GetDepositAddress from "./GetDepositAddress";
import SendToken from "./SendToken";
import { Content } from "antd/lib/layout/layout";
import logo from "../images/logo.png";
import Lines from "./Lines";
import { PolywrapProvider } from "@polywrap/react";
import { fromHex, getPluginsConfig } from "../utils";
import { useConnectedMetaMask, useMetaMask } from "metamask-react";

export default function Axelar() {
  const { account, ethereum, chainId, status } = useMetaMask();

  return (
    <Content>
      <div
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          maxWidth: "1080px",
          gap: "170px",
          margin: "100px auto 0",
        }}
      >
        <h1>
          Polywrap
          <br />
          <span className="blue">Axelar</span>
          <br />
          Integration
        </h1>
        <img src={logo} />
      </div>
      <Lines />
      <div
        style={{
          display: "flex",
          gap: "48px",
          margin: "60px auto ",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        {status === "connected" && chainId && account && (
          <PolywrapProvider
            //@ts-ignore
            plugins={getPluginsConfig(
              fromHex(chainId).toString(),
              ethereum,
              account
            )}
          >
            <GetDepositAddress />
            <SendToken />
          </PolywrapProvider>
        )}
      </div>
    </Content>
  );
}
