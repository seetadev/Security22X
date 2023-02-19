import { useMetaMask } from "metamask-react";
import Axelar from "./Axelar";
import { Header } from "antd/lib/layout/layout";
import { Button, Layout, notification } from "antd";

function App() {
  const { connect, status, account } = useMetaMask();

  const handleConnect = () => {
    if (status !== "connected") {
      connect();
    } else {
      navigator.clipboard.writeText(account);
      notification.success({
        message: "Success",
        duration: 1,
        description: `${account} Copied to Clipboard`,
      });
    }
  };

  return (
    <Layout>
      <Header className="sticky">
        <Button onClick={handleConnect} type="primary">
          {status === "connected" ? account : "Connect"}
        </Button>
      </Header>
      <Axelar />
    </Layout>
  );
}

export default App;
