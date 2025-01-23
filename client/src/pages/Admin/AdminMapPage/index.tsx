import React from "react";
import AdminMap from "../../../modules/AdminMap/AdminMap";
import AdminMapForm from "../../../modules/AdminMap/AdminMapForm";
import AdminMapNadeList from "../../../modules/AdminMap/AdminMapNadeList/idnex";
import { AdminMapFormContextProvider } from "../../../ui/contexts/AdminMapFormContext";

const AdminMapPage: React.FC = () => {
  return (
    <>
      <AdminMapFormContextProvider>
        <AdminMapForm />
        <AdminMapNadeList />
      </AdminMapFormContextProvider>
      <AdminMap />
    </>
  );
};

export default AdminMapPage;
