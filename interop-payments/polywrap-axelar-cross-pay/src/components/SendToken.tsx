import { Button, Form, Input, Select, notification } from "antd";
import { usePolywrapInvoke, usePolywrapQuery } from "@polywrap/react";

import { dataSrc } from "../utils/gateways";
import { fromHex, wrapperUri } from "../utils";
import { useConnectedMetaMask } from "metamask-react";
import { useEffect, useMemo } from "react";

const { Option } = Select;
const { Item } = Form;

const networkOptions = dataSrc.map((chain) => (
  <Option key={chain.key} value={chain.name}>
    {chain.name}
  </Option>
));

const getAssetOptions = (networkName?: string) => {
  if (networkName) {
    const network = dataSrc.find((chain) => chain.name === networkName)!;
    return network.assets.map((asset) => (
      <Option key={asset.name} value={asset.name}>
        {asset.name}
      </Option>
    ));
  }
};

const initialValues = {
  destinationChain: "Polygon Mumbai",
  amount: "1",
};

export default function SendToken() {
  const [form] = Form.useForm();

  const { status, chainId, switchChain, addChain } = useConnectedMetaMask();

  const { execute, loading } = usePolywrapInvoke<{ transactionHash: string }>({
    uri: wrapperUri,
    method: "approveAndSendToken",
  });

  const network = useMemo(() => {
    if (chainId) {
      const supportedNetwork = dataSrc.find(
        (chain) => chain.chainId === chainId
      );
      if (supportedNetwork) return supportedNetwork;
      else {
        notification.error({ message: "Network isn't supported" });
        switchChain(dataSrc[0].chainId);
        return dataSrc[0];
      }
    }
    return dataSrc[0];
  }, [chainId]);

  const onFinish = async (values: any) => {
    const sourceChain = network;
    const asset = sourceChain.assets.find(
      (asset) => asset.name === values.asset
    )!;

    const variables = {
      ...values,
      gatewayAddress: sourceChain.gateway,
      symbol: values.asset,
      amount: (Number(values.amount) * Math.pow(10, asset.decimals)).toString(),
      tokenAddress: asset.address,
      txOverrides: { gasLimit: "100000", gasPrice: null, value: null },
      connection: null,
    };

    const { data, error } = await execute(variables);

    if (error) {
      console.log(error);
      notification.error({
        message: "Error",
        description: error.message,
      });
      return;
    }

    const result = data?.transactionHash;

    if (result) {
      notification.success({
        message: "Success",
        description: `Your transaction hash is: ${result}`,
      });
    }
  };

  const onChangeFormValue = (itemName: string, value: string) => {
    form.setFieldsValue({ [itemName]: value });
  };

  useEffect(() => {
    form.resetFields(["asset"]);
  }, [chainId]);

  const onChangeSourceNetwork = async (networkName: string) => {
    const network = dataSrc.find((chain) => chain.name === networkName)!;

    try {
      await switchChain(network.chainId);
    } catch (e) {
      await addChain({
        chainId: network.chainId,
        rpcUrls: [network.rpcUrl],
        chainName: network.name,
      });
    }
  };

  return (
    <Form
      name="sendToken"
      initialValues={{
        ...initialValues,
        fromChain: network.name,
        asset: network.assets[0].name,
      }}
      form={form}
      onFinish={onFinish}
      autoComplete="off"
    >
      <h2 style={{ width: "fit-content", margin: "10px auto" }}>Send Token</h2>
      <Item name="fromChain" required>
        <Select
          onChange={(value) => {
            onChangeSourceNetwork(value);
            onChangeFormValue("fromChain", value);
          }}
          className="fromChain"
        >
          {networkOptions}
        </Select>
      </Item>
      <Item name="destinationChain" required>
        <Select
          onChange={(value) => {
            onChangeFormValue("destinationChain", value);
          }}
          className="toChain"
        >
          {networkOptions}
        </Select>
      </Item>
      <Item
        name="destinationAddress"
        required
        rules={[
          { required: true, message: "Please input destination address" },
        ]}
      >
        <Input prefix="Destination address" />
      </Item>
      <Item
        name="asset"
        required
        rules={[{ required: true, message: "Please select asset to send" }]}
      >
        <Select className="assetSelect">{getAssetOptions(network.name)}</Select>
      </Item>
      <Item name="amount" required>
        <Input prefix="Amount" />
      </Item>
      <Item>
        <Button
          htmlType="submit"
          type="primary"
          loading={loading}
          disabled={status !== "connected"}
          style={{ width: "100%" }}
        >
          Send Token
        </Button>
      </Item>
    </Form>
  );
}
