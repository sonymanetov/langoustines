import React, { useState, useEffect } from 'react';
import './App.css';
import shrimp from './assets/shrimpWo4ki.png';

function App() {
    const [exchangeRates, setExchangeRates] = useState([]);
    const [langCost, setLangCost] = useState(0);
    const [langDate, setLangDate] = useState(0);

      useEffect(() => {
        fetch('/exchange_rate').then(res => res.json()).then(data => {
          setExchangeRates(data.items);
          setLangCost(data.cost);
          setLangDate(data.date);
        });
      }, []);

          const listItems = exchangeRates.map((rate) =>
            <tr key = {rate.code}><td className = "ExchangeItem">{rate.name} ({rate.code})</td>
                <td>{rate.value} лангустиновых грамм</td></tr>
          );

     var todayDate = new Date();
     var Year = todayDate.getFullYear();
     var Month = todayDate.getMonth();
     var Day = todayDate.getDate();
     let fMonth = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
     var Hour = todayDate.getHours();
     var Minutes = todayDate.getMinutes();

      return (
        <div className="App">
          <div className="App-head">
            <div className="App-body">
              <img src={shrimp} className="Shrimp ShrimpLocation" alt="shrimp" />
              <table>
                <thead>
                  <tr>
                    <th className = "ExchangeHead HeadDesign">Валюта</th>
                    <th className = "HeadDesign">Лангустиновых грамм за единицу*</th>
                  </tr>
                </thead>
                <tbody>{listItems}</tbody>
              </table>
              <div><p> Данные актуальны на {Hour}:{Minutes} {Day} {fMonth[Month]} {Year} года. Источник: <a href="https://www.cbr.ru">www.cbr.ru </a></p>
              </div>
              <div className="Remark" > <hr/> <p>* Значение рассчитывается по средней статистической оценке <span className = "ValueDate">({langCost} руб/кг на {langDate})</span> рыночной стоимости лангустин категории L1. Средний вес лангустины считать за 100 грамм. Ура креветки! </p> </div>
              <p className="Credits" > Сделал <a href="https://github.com/sonymanetov">Соня Манетов</a> (почти сам) </p>
            </div>
          </div>
        </div>
      );
}
export default App;
