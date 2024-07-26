import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../models/models.js'

class UserController {
  async register(req, res) {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ message: 'Заполните все поля' })
    }
    const isExistingUser = await User.findOne({ where: { email } })
    if (isExistingUser) {
      return res.status(400).json({ message: 'Email занят' })
    }

    const passwordHash = await bcrypt.hash(password, 5)
    const user = await User.create({
      email,
      password: passwordHash,
    })

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      'secret123',
      { expiresIn: '30d' }
    )

    return res.json({ token, message: 'Пользователь зарегистрирован', user })
  }

  async login(req, res) {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return res.status(400).json({ message: 'Неверный логин или пароль' })
    }

    let comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) {
      return res.status(400).json({ message: 'Неверный логин или пароль' })
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      'secret123',
      { expiresIn: '30d' }
    )

    return res.json({ token, message: 'Вход успешно выполнен' })
  }

  async check(req, res, next) {
    const user = req.user

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      'secret123',
      { expiresIn: '30d' }
    )

    return res.json({ token })
  }
}

export const userController = new UserController()
