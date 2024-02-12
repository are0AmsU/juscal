import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import Router from './components/Router';
import Header from './components/Header';
import MainLayout from './ui/components/Layouts/MainLayout';
import { GlobalContextProvider } from './ui/contexts/GlobalContext';

const App: React.FC = () => {

  return (
    <BrowserRouter>
      <GlobalContextProvider>
        <MainLayout>
          <Header />
          <Router />
        </MainLayout>
      </GlobalContextProvider>
    </BrowserRouter>
  );
}

export default App;
