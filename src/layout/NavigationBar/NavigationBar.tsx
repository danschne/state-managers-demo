import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./NavigationBar.module.scss";

interface MenuEntry {
  path: string;
  label: string;
  content: JSX.Element;
}

export const MENU_ENTRIES: MenuEntry[] = [
  {
    path: "/option1",
    label: "Option 1",
    content: <>Content 1</>,
  },
  {
    path: "/option2",
    label: "Option 2",
    content: <>Content 2</>,
  },
  {
    path: "/option3",
    label: "Option 3",
    content: <>Content 3</>,
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
    <Menu
      items={ITEMS}
      mode="horizontal"
      theme="dark"
      selectedKeys={[pathname]}
      className={styles.menu}
      onSelect={({ key }) => navigateTo(key)}
    />
  );
}
