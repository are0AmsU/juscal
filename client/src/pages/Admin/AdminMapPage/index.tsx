import React from "react";
import AdminMap from "../../../modules/AdminMap/AdminMap";
import AdminMapForm from "../../../modules/AdminMap/AdminMapForm";
import AdminMapNadeList from "../../../modules/AdminMap/AdminMapNadeList/idnex";
import { AdminMapFormContextProvider } from "../../../ui/contexts/AdminMapFormContext";
import styles from "./style.module.css";

const AdminMapPage: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <AdminMapFormContextProvider>
        <AdminMapForm />
        <AdminMapNadeList />
      </AdminMapFormContextProvider>
      <AdminMap />
    </div>
  );
};

export default AdminMapPage;
