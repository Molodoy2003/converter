import { $host } from './index'

export const register = async (email, password) => {
  const { data } = await $host.post('/api/register', { email, password })
  return data
}

export const login = async (email, password) => {
  const { data } = await $host.post('/api/login', { email, password })
  return data
}

export const check = async () => {
  const res = await $host.get('/api/auth')
  return res
}
