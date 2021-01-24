import React, { useState, useEffect } from 'react';
import './App.css';
import shrimp from './assets/shrimpWo4ki.png';

function App() {
    const [exchangeRates, setExchangeRates] = useState([]);

      useEffect(() => {
        fetch('/exchange_rate').then(res => res.json()).then(data => {
          setExchangeRates(data.items);
        });
      }, []);

          const listItems = exchangeRates.map((rate) =>
            <p>{rate.name} ({rate.code}) - {rate.value} грамм</p>
          );

      return (
        <div className="App">
          <header className="App-header">
          <img src={shrimp} className="Shrimp" alt="shrimp" />
                <div>{listItems}</div>
          </header>
        </div>
      );
}

export default App;
