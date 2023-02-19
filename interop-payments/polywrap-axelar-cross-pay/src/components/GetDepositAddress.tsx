import { Button, Form, Input, Select, notification } from "antd";
import AssetSelect from "./AssetSelect";
import {
  usePolywrapClient,
  usePolywrapInvoke,
  usePolywrapQuery,
} from "@polywrap/react";
import CopyButton from "./CopyButton";
import { chains, fromHex, wrapperUri } from "../utils";
import { useConnectedMetaMask, useMetaMask } from "metamask-react";
const Buffer = require("buffer");

const { Option } = Select;
const { Item } = Form;

const options = chains.map((chain) => (
  <Option key={chain} value={chain.toLowerCase()}>
    {chain}
  </Option>
));

const initialValues = {
  fromChain: "axelar",
  toChain: "avalanche",
  asset: "uausdc",
};

export default function GetDepositAddress() {
  const [form] = Form.useForm();
  const { chainId } = useConnectedMetaMask();
  const { execute, loading } = usePolywrapInvoke<string>({
    uri: wrapperUri,
    method: "getDepositAddress",
  });

  const onFinish = async (values: any) => {
    const { data, error } = await execute({
      ...values,
      options: null,
      connection: null,
    });
    const depositAddress = data;

    if (error) {
      console.log(error);
      notification.error({
        message: "Error",
        description: error.message,
      });
    }

    if (depositAddress) {
      notification.success({
        message: "Success",
        duration: 600000,
        description: (
          <>
            <span>Your deposit address: {depositAddress}</span>
            <br />
            <CopyButton value={depositAddress} />
          </>
        ),
      });
    }
  };

  const onChangeFormValue = (itemName: string, value: string) => {
    form.setFieldsValue({ [itemName]: value });
  };

  return (
    <Form
      name="getDepositAddress"
      initialValues={initialValues}
      onFinish={onFinish}
      autoComplete="off"
      style={{ width: "400px" }}
    >
      <h2 style={{ width: "fit-content", margin: "10px auto" }}>
        Get Deposit Address
      </h2>
      <Item name="fromChain">
        <Select
          onChange={(value) => onChangeFormValue("fromChain", value)}
          className="fromChain"
        >
          {options}
        </Select>
      </Item>
      <Item name="toChain">
        <Select
          onChange={(value) => onChangeFormValue("toChain", value)}
          className="toChain"
        >
          {options}
        </Select>
      </Item>
      <Item
        name="destinationAddress"
        required
        rules={[
          { required: true, message: "Please input destination address" },
        ]}
      >
        <Input prefix={"Destination address"} />
      </Item>
      <Item name="asset">
        <AssetSelect onChange={(value) => onChangeFormValue("asset", value)} />
      </Item>
      <Item>
        <Button
          htmlType="submit"
          type="primary"
          loading={loading}
          style={{ width: "100%" }}
        >
          Get Deposit Address
        </Button>
      </Item>
    </Form>
  );
}
