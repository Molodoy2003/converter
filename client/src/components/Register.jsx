import { useState } from 'react'
import { Button, Card, Container, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { register } from '../http/userApi'
import Header from './Header'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signIn = async () => {
    const res = await register(email, password)
    console.log(res)
  }

  return (
    <>
      <Header />
      <Container className='flex justify-center items-center pt-14'>
        <Card className='w-[400px] p-5'>
          <h2 className='text-center mb-2'>Регистрация</h2>
          <Form className='flex flex-col'>
            <Form.Control
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder='Введите email...'
              className='mt-3'
            />
            <Form.Control
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder='Введите пароль...'
              className='mt-3 mb-3'
            />
            <Row className=''>
              <div>
                Есть аккаунт?{' '}
                <Link className='text-blue-500' to='/auth'>
                  Войдите
                </Link>
              </div>
              <Button
                onClick={() => signIn()}
                className='self-end mt-3'
                variant='outline-primary'
              >
                Зарегистрироваться
              </Button>
            </Row>
          </Form>
        </Card>
      </Container>
    </>
  )
}

export default Register
