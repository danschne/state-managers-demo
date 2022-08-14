import { PropsWithChildren } from "react";
import styles from "./ContentPane.module.scss";

export default function ContentPane({ children }: PropsWithChildren) {
  return <div className={styles.container}>{children}</div>;
}
