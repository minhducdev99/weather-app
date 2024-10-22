import { ReactNode } from "react";
import styles from "./index.module.css";

interface AlertErrorProps {
  children: ReactNode;
}

const AlertError = (props: AlertErrorProps) => {
  const { children } = props;

  return <div className={styles.error}>{children}</div>;
};

export default AlertError;
