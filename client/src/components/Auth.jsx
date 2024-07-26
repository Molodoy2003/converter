import { observer } from 'mobx-react-lite'
import { useContext, useState } from 'react'
import { Button, Card, Container, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../http/userApi'
import { Context } from './../main'
import Header from './Header'

const Auth = observer(() => {
  const { user } = useContext(Context)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const signIn = async () => {
    const res = await login(email, password)
    localStorage.setItem('token', res.token)
    navigate('/')

    user.setUser(user)
    user.setAuth(true)
  }

  return (
    <>
      <Header />
      <Container className='flex justify-center items-center pt-14'>
        <Card className='w-[400px] p-5'>
          <h2 className='text-center mb-2'>Авторизация</h2>
          <Form className='flex flex-col'>
            <Form.Control
              placeholder='Введите email...'
              className='mt-3'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <Form.Control
              placeholder='Введите пароль...'
              className='mt-3 mb-3'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <Row className=''>
              <div>
                Нет аккаунта?{' '}
                <Link className='text-blue-500' to='/register'>
                  Зарегистрируйтесь
                </Link>
              </div>
              <Button
                onClick={() => signIn()}
                className='self-end mt-3'
                variant='outline-primary'
              >
                Войти
              </Button>
            </Row>
          </Form>
        </Card>
      </Container>
    </>
  )
})

export default Auth
