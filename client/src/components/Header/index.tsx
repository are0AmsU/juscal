import React from "react";
import logoIcon from "./../../assets/logoIcon.svg";
import { Link } from "react-router-dom";
import styles from "./style.module.css";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div>
        <Link to={"/admin"} className={styles.link}>
          admin
        </Link>
        <Link to={"/home"} className={styles.link}>
          home
        </Link>
      </div>
      <Link className={styles.logo} to={"/"}>
        <img src={logoIcon} alt="Logo" />
      </Link>
    </header>
  );
};

export default Header;
