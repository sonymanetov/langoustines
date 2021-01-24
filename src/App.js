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
            <tr><td class = "ExchangeItem">{rate.name} ({rate.code})</td>
                <td>{rate.value} грамм</td></tr>
          );

      return (
        <div className="App">
          <header className="App-header">
          <img src={shrimp} className="Shrimp" alt="shrimp" />
                <table><tr><th class = "ExchangeHead HeadDesign">Валюта</th>
                          <th class = "HeadDesign">Креветочных грамм за единицу</th></tr>{listItems}</table>
          </header>
        </div>
      );
}

export default App;
