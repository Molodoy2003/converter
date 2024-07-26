import CurrencyConverter from './components/CurrencyConverter'
import Header from './components/Header'

const App = () => {
  return (
    <div className='min-h-screen bg-gray-800 '>
      <Header />
      <div className='container'>
        <CurrencyConverter />
      </div>
    </div>
  )
}

export default App
