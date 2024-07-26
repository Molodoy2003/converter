import { useEffect, useState } from 'react'
import { HiArrowsRightLeft } from 'react-icons/hi2'
import Dropdown from './Dropdown'

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([])
  const [amount, setAmount] = useState(1)
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('EUR')
  const [convertedAmount, setConvertedAmount] = useState(null)
  const [converting, setConverting] = useState(false)
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || ['EUR', 'USD']
  )

  useEffect(() => {
    fetchCurrencies()
  }, [])

  const fetchCurrencies = async () => {
    try {
      const res = await fetch('https://api.frankfurter.app/currencies')
      const data = await res.json()
      setCurrencies(Object.keys(data))
    } catch (error) {
      console.error(error)
    }
  }

  const convertCurrency = async () => {
    if (!amount) return
    setConverting(true)
    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      )
      const data = await res.json()
      setConvertedAmount(data.rates[toCurrency] + ' ' + toCurrency)
    } catch (error) {
      console.error(error)
    } finally {
      setConverting(false)
    }
  }

  const handleFavorite = currency => {
    let updatedFavorites = [...favorites]

    if (favorites.includes(currency)) {
      updatedFavorites = updatedFavorites.filter(fav => fav !== currency)
    } else {
      updatedFavorites.push(currency)
    }

    setFavorites(updatedFavorites)
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
  }

  const swapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  return (
    <div className='max-w-xl mx-auto my-10 p-5 bg-gray-800 rounded-lg shadow-md'>
      <h2 className='mb-5 text-2xl font-semibold text-white'>
        Currency Converter
      </h2>

      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 items-end'>
        <Dropdown
          favorites={favorites}
          currencies={currencies}
          title='From: '
          currency={fromCurrency}
          setCurrency={setFromCurrency}
          handleFavorite={handleFavorite}
        />
        <div className='flex justify-center -mb-5'>
          <button
            onClick={swapCurrencies}
            className='p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300'
          >
            <HiArrowsRightLeft className='text-xl text-gray-700' />
          </button>
        </div>
        <Dropdown
          favorites={favorites}
          currencies={currencies}
          title='To:'
          currency={toCurrency}
          setCurrency={setToCurrency}
          handleFavorite={handleFavorite}
        />
      </div>

      <div className='mt-4 '>
        <label
          htmlFor='amount'
          className='block text-sm font-medium text-white'
        >
          Amount:
        </label>
        <input
          value={amount}
          onChange={e => setAmount(e.target.value)}
          className='w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1'
          type='number'
        />
      </div>

      <div className='flex justify-end mt-6'>
        <button
          onClick={convertCurrency}
          className={`px-5 py-2 mb-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-800 focus:outline-none ${
            converting ? 'animate-pulse' : ''
          }`}
        >
          Convert
        </button>
      </div>

      {convertedAmount && (
        <input
          disabled
          type='text'
          className='w-full p-2 border border-gray-300 rounded-md shadow-sm mt-1 bg-white text-black'
          value={convertedAmount}
        />
      )}
    </div>
  )
}

export default CurrencyConverter
