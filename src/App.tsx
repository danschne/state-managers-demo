import { Button, Space } from "antd";
import { CheckCircleTwoTone } from "@ant-design/icons";
import styles from "./App.module.scss";

export default function App() {
  return (
    <div className={styles.container}>
      <Space>
        <Button type="primary" shape="round" size="large">
          Let&apos;s go!
        </Button>
        <CheckCircleTwoTone twoToneColor="#52c41a" className={styles.icon} />
      </Space>
    </div>
  );
}
