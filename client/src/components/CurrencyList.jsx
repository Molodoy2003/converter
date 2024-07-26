import React, { useEffect, useState } from 'react'
import Header from './Header'

const CurrencyList = () => {
  const [currencies, setCurrencies] = useState([])

  useEffect(() => {
    fetch('https://api.frankfurter.app/2020-01-01')
      .then(response => response.json())
      .then(data => {
        const currencyArray = Object.entries(data.rates).map(
          ([currency, rate]) => ({
            currency,
            rate,
          })
        )
        setCurrencies(currencyArray)
      })
      .catch(error => console.log(error))
  }, [])

  return (
    <div className=''>
      <Header />
      <div className='bg-gray-800 p-6 min-h-screen'>
        <div className='container mx-auto'>
          <h1 className='text-white text-3xl font-bold mb-4'>Currency List</h1>
          <ul className='bg-gray-800 text-white shadow-md rounded-lg p-6'>
            {currencies.map(({ currency, rate }) => (
              <li
                key={currency}
                className='flex justify-between items-center border-b py-2'
              >
                <span className='font-medium'>{currency}</span>
                <span className='text-white'>{rate}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CurrencyList
