import { Menu } from "antd";
import { ItemType } from "antd/lib/menu/hooks/useItems";
import styles from "./NavigationBar.module.scss";

const items: ItemType[] = [
  { key: "item1", label: "Item 1" },
  { key: "item2", label: "Item 2" },
  { key: "item3", label: "Item 3" },
];

export default function NavigationBar() {
  return (
    <Menu
      items={items}
      mode="horizontal"
      theme="dark"
      defaultSelectedKeys={["item1"]}
      className={styles.menu}
    />
  );
}
