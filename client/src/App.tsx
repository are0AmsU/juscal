import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./components/Router";
import Header from "./components/Header";
import MainLayout from "./ui/components/Layouts/MainLayout";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Header />
        <Router />
      </MainLayout>
    </BrowserRouter>
  );
};

export default App;
