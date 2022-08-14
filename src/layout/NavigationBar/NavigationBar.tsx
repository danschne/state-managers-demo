import { Col, Menu, Row } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import Placeholder from "../Placeholder/Placeholder";
import styles from "./NavigationBar.module.scss";

const LOGO = "🕺💃❤🎓";

interface MenuEntry {
  path: string;
  label: string;
  content: JSX.Element;
}

export const MENU_ENTRIES: MenuEntry[] = [
  {
    path: "/option1",
    label: "Option 1",
    content: <Placeholder text="Content 1" />,
  },
  {
    path: "/option2",
    label: "Option 2",
    content: <Placeholder text="Content 2" />,
  },
  {
    path: "/option3",
    label: "Option 3",
    content: <Placeholder text="Content 3" />,
  },
];

const ITEMS = MENU_ENTRIES.map((entry) => {
  return {
    key: entry.path,
    label: entry.label,
  };
});

export default function NavigationBar() {
  const { pathname } = useLocation();
  const navigateTo = useNavigate();

  return (
    <Row>
      <Col className={styles.logo}>{LOGO}</Col>
      <Col flex="auto">
        <Menu
          items={ITEMS}
          mode="horizontal"
          theme="dark"
          selectedKeys={[pathname]}
          className={styles.menu}
          onSelect={({ key }) => navigateTo(key)}
        />
      </Col>
    </Row>
  );
}
