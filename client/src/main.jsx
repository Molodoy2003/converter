import 'bootstrap/dist/css/bootstrap.min.css'
import { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Auth from './components/Auth'
import CurrencyList from './components/CurrencyList'
import Register from './components/Register'
import './index.css'
import UserStore from './store/userStore'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/list',
    element: <CurrencyList />,
  },
  {
    path: '/auth',
    element: <Auth />,
  },
  {
    path: '/register',
    element: <Register />,
  },
])

export const Context = createContext(null)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Context.Provider
    value={{
      user: new UserStore(),
    }}
  >
    <RouterProvider router={router} />
  </Context.Provider>
)
