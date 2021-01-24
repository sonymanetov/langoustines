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
            <tr key = {rate.code}><td className = "ExchangeItem">{rate.name} ({rate.code})</td>
                <td>{rate.value} креветочных грамм</td></tr>
          );

      return (
        <div className="App">
          <div className="App-header">
          <img src={shrimp} className="Shrimp ShrimpLocation" alt="shrimp" />
                <table><thead><tr><th className = "ExchangeHead HeadDesign">Валюта</th>
                          <th className = "HeadDesign">Креветочных грамм за единицу</th></tr></thead><tbody>{listItems}</tbody></table>
          </div>
        </div>
      );
}

export default App;
