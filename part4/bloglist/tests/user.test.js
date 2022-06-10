const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const helper = require('./test_helpers')
const app = require('../app')

const api = supertest(app)

const User = require('../models/user')

beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers) 
})

describe('Create User', () => {
    test('user successfully created', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })
    test('user with username already exists will not be created', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'mluukkai1',
            name: 'Natti Luukkainen',
            password: '1salainen',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('username must be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
    })
    test('user with username less than 3 characters will not be created', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'ml',
            name: 'Natti Luukkainen',
            password: '1salainen',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('The username must be at least 3 characters')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
    })
    test('user with password less than 3 characters will not be created', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'mla',
            name: 'Natti Luukkainen',
            password: '11',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('password must be at least 3 characters')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
    })
})

describe('Fetch Users', () => {
    test('Get all users', async () => {
        const usersAll = await helper.usersInDb()
        expect(usersAll).toHaveLength(helper.initialUsers.length)
    })
    test('Get an user with ID', async () => {
        const users = await helper.usersInDb()
        const result = await api
            .get(`/api/users/${users[0].id}`)
        expect(result.body.name).toEqual(users[0].name)
    })
})

describe('Login', () => {
    test('Log in an existing user', async () => {
        const result = await api
            .post('/api/login')
            .send({
                username: 'mluukkai1',
                password: 'salainen'
            })
        expect(result.body.username).toEqual('mluukkai1')
        expect(result.body.token).toBeDefined()
    })
    test('Log in a non-existing user', async () => {
        const result = await api
            .post('/api/login')
            .send({
                username: '123',
                password: '123'
            })
        expect(result.body.error).toBe('invalid username or password')
    })
})

afterAll(() => {
    mongoose.connection.close()
})