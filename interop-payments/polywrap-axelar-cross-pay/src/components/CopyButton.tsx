import { Button } from "antd";
import { useState } from "react";

const CopyButton = ({ value }: { value: string }) => {
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
  };

  return <Button type="primary" style={{width:'100%', padding:'10px !important', height:'40px', marginTop:'10px'}} onClick={onCopy}>{copied ? "Copied" : "Copy"}</Button>;
};

export default CopyButton;
