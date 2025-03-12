import React from "react";
import { IMainLayoutProps } from "./types";
import styles from "./style.module.css";

const MainLayout: React.FC<IMainLayoutProps> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default MainLayout;
