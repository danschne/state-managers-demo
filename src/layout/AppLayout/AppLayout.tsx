import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import ContentPane from "../ContentPane/ContentPane";
import NavigationBar from "../NavigationBar/NavigationBar";
import styles from "./AppLayout.module.scss";

const { Header, Content } = Layout;

export default function AppLayout() {
  return (
    <Layout>
      <Header className={styles.header}>
        <NavigationBar />
      </Header>
      <Content>
        <ContentPane>
          <Outlet />
        </ContentPane>
      </Content>
    </Layout>
  );
}
