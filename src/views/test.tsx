import { Button, Space } from "antd-mobile";

// type Props = {}; {}: Props

export default function Test() {
  return (
    <div className="App">
      <h1>测试组件</h1>
      <Space wrap>
        <Button shape="default" color="primary">
          Default Button
        </Button>
        <Button block shape="rounded" color="primary">
          Rounded Button
        </Button>
        <Button block shape="rectangular" color="primary">
          Rectangular Button
        </Button>
      </Space>
    </div>
  );
}
