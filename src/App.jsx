import { useState, useEffect, useRef } from 'react';
import './App.css';
import CurrencyRow from './components/CurrencyRow';

//API REQ
const API_URL = "https://api.apilayer.com/exchangerates_data/latest?";
const API_KEY =  "XSQ4soUjFoFAcJ9BQ2tpbOh7gFmaxn1Z"
const myHeaders = new Headers();
myHeaders.append("apikey", API_KEY);

const requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};
function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  const [exchageRate, setExchangeRate] = useState();
  
  // console.log(currencyOptions);
  // console.log(exchageRate);

  let toAmount, fromAmount;
  if (amountInFromCurrency){
    fromAmount = amount;
    toAmount = amount * exchageRate;
  }  else {
     toAmount = amount;
     fromAmount = amount / exchageRate;
  }

  useEffect(()=>{
    fetch(API_URL, requestOptions)
     .then(res => res.json())
     .then(data => {
      const startingCurrency = Object.keys(data.rates)[0];
      setCurrencyOptions([data.base, ...Object.keys(data.rates)])
      setFrom(data.base)
      setTo(startingCurrency)
      setExchangeRate(data.rates[startingCurrency])
     })
  }, [])

  useEffect(()=>{
    if (from != null && to != null) {
      fetch(`${API_URL}symbols=${to}&base=${from}`, requestOptions)
      .then(res => res.json())
      .then(data => setExchangeRate(data.rates[to]))
    }
  }, [from, to])

  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }
  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  const letters = "abcdefghijklmnopqrstuvxywz";
  let interval = null;


const h1 = useRef();
function hackerEffect(e) {
   let iteration = 0;
  
  clearInterval(interval);
  
  interval = setInterval(() => {
    e.target.innerText = e.target.innerText
      .split("")
      .map((letter, index) => {
        if(index < iteration) {
          return e.target.dataset.value[index];
        }
      
        return letters[Math.floor(Math.random() * 26)]
      })
      .join("");
    
    if(iteration >= e.target.dataset.value.length){ 
      clearInterval(interval);
    }
    
    iteration += 1 / 3;
  }, 70);
}


  return (
    <div className="App">
    <h1 onMouseOver={ e => hackerEffect(e)} ref={h1} data-value="Currency Converter">Currency Converter</h1>
    <CurrencyRow 
     currencyOptions={currencyOptions}
     selectedCurrency={from} 
     onChangeCurrency={ e => setFrom(e.target.value)}
     amount={fromAmount}
     onChangeAmount={handleFromAmountChange}
    ></CurrencyRow>
    <CurrencyRow
     currencyOptions={currencyOptions}
     selectedCurrency={to}
     onChangeCurrency={ e => setTo(e.target.value)}
     amount={toAmount}
     onChangeAmount={handleToAmountChange}

    ></CurrencyRow>
    </div>
  )
}

export default App
