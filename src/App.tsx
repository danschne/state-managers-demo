import { Layout } from "antd";
import ContentPane from "./layout/ContentPane/ContentPane";
import NavigationBar from "./layout/NavigationBar/NavigationBar";
import styles from "./App.module.scss";

const { Header, Content } = Layout;

export default function App() {
  return (
    <Layout>
      <Header className={styles.header}>
        <NavigationBar />
      </Header>
      <Content>
        <ContentPane />
      </Content>
    </Layout>
  );
}
