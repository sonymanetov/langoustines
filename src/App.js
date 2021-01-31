import React, { useState, useEffect } from 'react';
import './App.css';
import shrimp from './assets/shrimpWo4ki.png';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

function App() {
    const [exchangeRates, setExchangeRates] = useState([]);
    const [langCost, setLangCost] = useState(0);
    const [langDate, setLangDate] = useState('');
    const [crbDate, setCrbDate] = useState('');
    const [updateDate, setUpdateDate] = useState('');
    const [convertRates, setConvertRates] = useState([]);
    const [currentValute, setCurrentValute] = useState(0);
    const [convertResult, setConvertResult] = useState(0);
    const [inputValue, setInputValue] = useState(1);

    function FormatDate(date_str) {
        let fMonth = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
        let split_str = date_str.split(' ');
        let date = split_str[0].split('/');
        let day = date[0];
        let month = fMonth[parseInt(date[1])-1];
        let year = '20' + date[2];
        let result = day + ' ' + month + ' ' + year;
        if (split_str.length > 1) {
            let time = split_str[1].split(':');
            let hour = time[0];
            let minute = time[1];
            result = hour + ':' + minute + ' ' + result;
        }
            return result;
    }

    function ExtractRates(rawRates) {
        let rates = [];
        rawRates.forEach(function(item, i, arr) {
                    rates.push({ value: item.value, label: item.code })
                  });
        return rates;
    }

     function ValuteChange (e) {
         setCurrentValute(e);

    }

    function ChangeInputValue(e) {
         let t = (parseInt(e.target.value))
         setInputValue(parseInt(e.target.value));

         }

      useEffect(() => {
        fetch('/exchange_rate').then(res => res.json()).then(data => {
          setExchangeRates(data.items);
          setLangCost(data.cost);
          setLangDate(data.date);
          setCrbDate(FormatDate(data.crb_date));
          setUpdateDate(FormatDate(data.update_date));
          setConvertRates(ExtractRates(data.items));
        });
      }, []);

          const listItems = exchangeRates.map((rate) =>
            <tr key = {rate.code}><td className = "ExchangeItem">{rate.name} ({rate.code})</td>
                <td>{rate.value} лангустиновых грамм</td></tr>
          );
      const defaultConvertRates = convertRates[0];

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
               <input type="text" size="10" onChange = {ChangeInputValue}/>

              <Dropdown options={convertRates} onChange={ValuteChange} value={defaultConvertRates} placeholder="Select an option" />
                                                  {inputValue * currentValute.value}
              <div><p> Курс получен {crbDate} года. Данные актуальны на {updateDate} года. Источник: <a href="https://www.cbr.ru">www.cbr.ru </a></p>
              </div>
              <div className="Remark" > <hr/> <p>* Значение рассчитывается по средней статистической оценке <span className = "ValueDate">({langCost} руб/кг на {langDate})</span> рыночной стоимости лангустин категории L1. Средний вес лангустины считать за 100 грамм. Ура креветки! </p> </div>
              <p className="Credits" > Сделал <a href="https://github.com/sonymanetov">Соня Манетов</a> (почти сам) </p>
            </div>
          </div>
        </div>
      );
}
export default App;
