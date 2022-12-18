import { useState } from 'react';
import Header from './components/layout/Header';
import Providers from './Providers';
import './App.css';

function App() {
  return (
    <Providers>
      <Header />
    </Providers>
  );
}

export default App;
