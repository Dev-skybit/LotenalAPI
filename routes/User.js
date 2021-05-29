const express = require('express')
const router = express.Router()
const { User } = require('../models')
const bcrypt = require('bcrypt')
const { validateToken } = require('../middlewares/AuthMiddleware')
const { sign } = require('jsonwebtoken')

router.post('/', async (req, res) => {
  const { username, email, password } = req.body

  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      username: username,
      email: email,
      password: hash
    })
    res.json("success")
  })
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  let user = await User.findOne({ where: { email: email } })
  if (!user) {
    res.json({ error: "User doesn't exist" })
  }

  const validPassword = await bcrypt.compare(password, user.password)
  if (!validPassword) {
    res.json({ error: "Email or passwaord doesn't match" })
  }

  else {
    const setUser = ({
      id: user.id
    })

    const accessToken = sign({ user: setUser.username }, "importantSecret")

    res.json({
      user: setUser,
      token: accessToken
    })
  }
})

router.get('/validate', validateToken, (req, res) => {
  res.json(req.user)
})


router.get('/profile/:id', async(req, res) => {
  const id = req.params.id

  const info = await User.findByPk(id);

  res.json(info)
})

module.exports = router