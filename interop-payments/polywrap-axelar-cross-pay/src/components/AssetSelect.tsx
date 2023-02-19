import { Button, Divider, Input, Select, Space, Typography } from "antd";
import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

let index = 0;

export const assets = ["UAUSDC", "UAXL", "ULUNA", "WETH-WEI"];

export default function AssetSelect({
  onChange,
}: {
  onChange: (value: string) => void;
}) {
  const [items, setItems] = useState(assets);
  const [name, setName] = useState("");

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const addItem = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setItems([...items, name || `New item ${index++}`]);
  };

  return (
    <Select
      defaultValue={"uausdc"}
      onChange={onChange}
      className="assetSelect"
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider style={{ margin: "8px 0" }} />
          <Space align="center" style={{ padding: "0 8px 4px" }}>
            <Input
              placeholder="Please enter asset"
              value={name}
              onChange={onNameChange}
            />
            <Button
              disabled={
                !name || name.length < 3 || !!items.find((i) => i === name)
              }
              type="primary"
              onClick={addItem}
              style={{ whiteSpace: "nowrap", height: "100%" }}
            >
              <PlusOutlined /> Add item
            </Button>
          </Space>
        </>
      )}
    >
      {items.map((item) => (
        <Option key={item} value={item.toLowerCase()}>
          {item}
        </Option>
      ))}
    </Select>
  );
}
