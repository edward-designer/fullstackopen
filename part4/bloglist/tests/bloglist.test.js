const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helpers')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/bloglist')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs) // use this saves a lot of time
    /*await Promise.all(
        helper.initialBlogs.map(async (blog) => { //forEach cannot be used in async function
            let blogObject = new Blog(blog)
            await blogObject.save()
        })
    )*/
    /* OR
    const blogObjects = helper.initialBlogs.map(note => new Blog(note))
    cont promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
    */
})

describe('retrieving blogs', () => {
    test('get the correct number of notes', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    }, 10000)
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    }, 10000) // to avoid timeout issues
    test('a blog has the title React patterns', async () => {
        const response = await api.get('/api/blogs')
        const titles = response.body.map(r => r.title)
        expect(titles).toContain('React patterns')
    })
})

describe('deleting blogs', () => {
    test('a blog can be deleted', async () => {
        const token = await helper.getUserToken()
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]
        await api.delete(`/api/blogs/${blogToDelete.id}`).set({ Authorization: token }).expect(204)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

        const titles = blogsAtEnd.map(r => r.title)
        expect(titles).not.toContain(blogToDelete.title)
    })
})

describe('updating', () => {
    test('the number of likes can be updated', async () => {
        const token = await helper.getUserToken()
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]
        const like = {
            likes: 0
        }
        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .set('Accept', 'application/json')
            .set({ Authorization: token })
            .send(like)
        const response = await api.get(`/api/blogs/${blogToUpdate.id}`)
        expect(response.body.likes).toEqual(0)
    })
})

describe('adding blogs', () => {
    test('blogs are added successfully and an ID is added', async () => {
        const token = await helper.getUserToken()
        const body = {
            title: 'Testing',
            author: 'Edward',
            url: 'https://example.com',
            likes: 10000
        }
        const response = await api
            .post('/api/blogs')
            .set('Accept', 'application/json')
            .set({ Authorization: token })
            .send(body)

        expect(response.status).toEqual(201)
        expect(response.header['content-type']).toMatch(/application\/json/)
        expect(response.body.id).toBeDefined()

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

        const contents = blogsAtEnd.map(b => b.title)
        expect(contents).toContain('Testing')
    }, 10000)
    test('if likes is missing, default to 0', async () => {
        const token = await helper.getUserToken()
        const body = {
            title: 'Testing',
            author: 'Edward',
            url: 'https://example.com',
        }
        const response = await api
            .post('/api/blogs')
            .set('Accept', 'application/json')
            .set({ Authorization: token })
            .send(body)

        expect(response.status).toEqual(201)
        expect(response.body.likes).toEqual(0)
    }, 10000)
    test('blogs without a title is not added', async () => {
        const token = await helper.getUserToken()
        const body = {
            author: 'Edward',
            url: 'https://example.com',
            likes: 10000
        }
        await api
            .post('/api/blogs')
            .set('Accept', 'application/json')
            .set({ Authorization: token })
            .send(body)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    }, 20000)
    test('blogs without an url is not added', async () => {
        const token = await helper.getUserToken()
        const body = {
            title: 'Testing',
            author: 'Edward',
            likes: 10000
        }
        await api
            .post('/api/blogs')
            .set('Accept', 'application/json')
            .set({ Authorization: token })
            .send(body)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    }, 20000)
})


afterAll(() => {
    mongoose.connection.close()
})