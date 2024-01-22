import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import Router from './components/Router';
import Header from './components/Header';
import styles from './App.module.css'
import { LOCALSTORAGE_KEY } from './consts';
import duneImg from './assets/maps/dunePicture.svg'
import dunePreview from './assets/previewMaps/duneImg.svg'

const App: React.FC = () => {
  
React.useEffect(() => {
}, [])

  return (
    <BrowserRouter>
      <div className={styles.wrapper}>
        <main className={styles.main}>
          <Header />
          <Router />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
