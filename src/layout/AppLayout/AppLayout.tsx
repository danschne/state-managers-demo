import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { ContentPane } from "../ContentPane/ContentPane";
import { NavigationBar } from "../NavigationBar/NavigationBar";
import styles from "./AppLayout.module.scss";

const { Header, Content } = Layout;

export function AppLayout() {
  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <NavigationBar />
      </Header>
      <Content className={styles.content}>
        <ContentPane>
          <Outlet />
        </ContentPane>
      </Content>
    </Layout>
  );
}
