import React from "react";

import CurrencyConverter from './components/Converter';
import CurrencyRates from "./components/Rates";

import './App.css'


const App = () => {
  

  return (
    <div className='app'>
      <CurrencyConverter />
      <CurrencyRates />
    </div>
  );
};

export default App;
