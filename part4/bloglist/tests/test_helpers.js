const Blog = require('../models/bloglist')

const initialBlogs = [
    {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        user: '62a3c04933f62f50a9263269'
    },
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        user: '62a3c04933f62f50a9263269'
    },
    {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        user: '62a3c04933f62f50a9263269'
    },
    {
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
        likes: 10,
        user: '62a3c04933f62f50a9263269'
    },
    {
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        user: '62a3c04933f62f50a9263269'
    }
]

const nonExistingId = async () => {
    const blog = new Blog({
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2
    })
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}



const User = require('../models/user')

const initialUsers = [
    {
        username: 'mluukkai1',
        name: 'Natti Luukkainen',
        passwordHash: '$2b$10$VrqahLe.9dxbzSLdvoqvTueNAa2R6PDin/pSrBAHZv4Mpk6aOexca',
    },
    {
        username: 'mluukkai2',
        name: 'Patti Luukkainen',
        passwordHash: '2salainen',
    },
    {
        username: 'mluukkai3',
        name: 'Qatti Luukkainen',
        passwordHash: '3salainen',
    },
    {
        username: 'root',
        name: 'Superuser',
        passwordHash: 'salainen'
    }
]

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}


const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const getUserToken = async () => {
    const result = await api
        .post('/api/login')
        .send({
            username: 'mluukkai1',
            password: 'salainen'
        })
    return `bearer ${result.body.token}`
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb, initialUsers, usersInDb, getUserToken
}