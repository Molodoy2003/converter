import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()

  const handleSignOut = () => {
    localStorage.removeItem('token')
    navigate('/auth')
  }

  return (
    <div className='bg-gray-700 p-4 shadow-md'>
      <nav className='container mx-auto flex gap-10 justify-center'>
        <Link
          to='/'
          className='text-white text-xl font-semibold hover:text-blue-200'
        >
          Converter
        </Link>
        <Link
          to='/list'
          className='text-white text-xl font-semibold hover:text-blue-200'
        >
          Currency List
        </Link>
        <Link
          onClick={localStorage.getItem('token') ? handleSignOut : null}
          to='/auth'
          className='text-white text-xl font-semibold hover:text-blue-200'
        >
          {localStorage.getItem('token') ? 'Logout' : 'Login'}
        </Link>
      </nav>
    </div>
  )
}

export default Header
