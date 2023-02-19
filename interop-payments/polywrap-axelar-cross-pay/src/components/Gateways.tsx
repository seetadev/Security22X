import { Table } from "antd";
import { columns, dataSrc } from "../utils/gateways";

type Props = {};

export default function Gateways({}: Props) {
  return <Table columns={columns} dataSource={dataSrc} pagination={false} />;
}
