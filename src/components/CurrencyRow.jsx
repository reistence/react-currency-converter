import React from 'react'

export default function CurrencyRow(props) {
 const {currencyOptions, selectedCurrency, onChangeCurrency, amount, onChangeAmount} = props;
  return (
    <div className='currency-input'>
        <input className='input' type="number" name="" id=""  value={amount} onChange={onChangeAmount}/> 
        <span className='bar'>|</span>
        <select name="" id="" value={selectedCurrency} onChange={onChangeCurrency}>
            {
            currencyOptions && currencyOptions.map((option, index) => (
                <option key={index} value={option}>{option}</option>
            ))}
        </select>
    </div>
  )
}
