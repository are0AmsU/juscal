import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import Router from './components/Router';
import Header from './components/Header';
import MainLayout from './ui/components/Layouts/MainLayout';
import { IGlobalContext, useGlobalContext } from './ui/contexts/GlobalContext';
import { getNadeStore } from './http/nadeStoreApi';

const App: React.FC = () => {

  const { nadeStore, setNadeStore } = useGlobalContext() as IGlobalContext

  React.useEffect(() => {
    getNadeStore().then(data => setNadeStore(data))
  }, [setNadeStore])

  return (
    <BrowserRouter>
      <MainLayout>
        <Header />
        <Router />
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
