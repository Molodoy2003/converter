import { HiOutlineStar, HiStar } from 'react-icons/hi2'

const Dropdown = ({
  currencies,
  currency,
  setCurrency,
  favorites,
  handleFavorite,
  title = '',
}) => {
  const isFavorite = currency => favorites.includes(currency)
  const isAuthenticated = !!localStorage.getItem('token')

  const handleFavoriteClick = () => {
    if (!isAuthenticated) {
      alert('Пожалуйста, авторизуйтесь, чтобы добавлять валюты в избранное')
      navigate('/auth')
      return
    }
    handleFavorite(currency)
  }

  return (
    <div>
      <label htmlFor={title} className='block text-sm font-medium text-white'>
        {title}
      </label>

      <div className='mt-1 relative'>
        <select
          value={currency}
          onChange={e => setCurrency(e.target.value)}
          className='w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'
        >
          {favorites.map((currency, id) => (
            <option className='bg-orange-500' key={id} value={currency}>
              {currency}
            </option>
          ))}
          <hr />
          {currencies
            .filter(c => !favorites.includes(c))
            .map((currency, id) => (
              <option key={id} value={currency}>
                {currency}
              </option>
            ))}
        </select>
        <button
          onClick={handleFavoriteClick}
          className={`absolute inset-y-0 right-0 pr-5 flex items-center text-sm leading-5 ${
            !isAuthenticated ? 'cursor-not-allowed' : ''
          }`}
        >
          {isFavorite(currency) ? <HiStar /> : <HiOutlineStar />}
        </button>
      </div>
    </div>
  )
}

export default Dropdown
