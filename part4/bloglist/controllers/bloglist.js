const bloglistRouter = require('express').Router()
const Blog = require('../models/bloglist')

bloglistRouter.get('/', (request, response, next) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        }).catch(error => next(error))
})

bloglistRouter.post('/', (request, response, next) => {
    const body = request.body
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })

    blog.save()
        .then(result => {
            response.status(201).json(result)
        }).catch(error => next(error))
})

module.exports = bloglistRouter