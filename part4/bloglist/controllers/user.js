const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs')
    response.json(users)
})

userRouter.get('/:id', async (request, response) => {
    const user = await User.findById(request.params.id)
    response.json(user)
})

userRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body
    if (password.length < 3) {
        return response.status(400).json({
            error: 'password must be at least 3 characters'
        })
    }
    const existingUser = await User.findOne({ username })
    if (existingUser) {
        return response.status(400).json({
            error: 'username must be unique'
        })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })
    const result = await user.save()
    response.status(201).json(result)
})

module.exports = userRouter