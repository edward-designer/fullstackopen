const bloglistRouter = require('express').Router()
const Blog = require('../models/bloglist')
// by using express-async-errors, try...catch is not required

bloglistRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

bloglistRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    response.json(blog)
})

bloglistRouter.post('/', async (request, response) => {
    const body = request.body
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })
    const result = await blog.save()
    response.status(201).json(result)
})

bloglistRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

bloglistRouter.put('/:id', async (request, response) => {
    await Blog.findByIdAndUpdate(request.params.id,{ likes: request.body.likes })
    response.status(201).end()
})
module.exports = bloglistRouter