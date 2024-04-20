import React from "react";
import AdminMap from "../../../modules/AdminMap/AdminMap";
import { AdminMapPageContextProvider } from "../../../ui/contexts/AdminMapPageContext";
import AdminMapForm from "../../../modules/AdminMap/AdminMapForm";
import AdminMapNadeList from "../../../modules/AdminMap/AdminMapNadeList/idnex";
import { AdminMapFormContextProvider } from "../../../ui/contexts/AdminMapFormContext";

const AdminMapPage: React.FC = () => {
  return (
    <AdminMapPageContextProvider>
      <AdminMapFormContextProvider>
        <AdminMapForm />
        <AdminMapNadeList />
      </AdminMapFormContextProvider>
      <AdminMap />
    </AdminMapPageContextProvider>
  );
};

export default AdminMapPage;
