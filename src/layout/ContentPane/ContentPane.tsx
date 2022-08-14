import { PropsWithChildren } from "react";
import styles from "./ContentPane.module.scss";

export function ContentPane({ children }: PropsWithChildren) {
  return <div className={styles.container}>{children}</div>;
}
