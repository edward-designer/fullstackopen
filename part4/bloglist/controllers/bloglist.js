const bloglistRouter = require('express').Router()
const Blog = require('../models/bloglist')
// by using express-async-errors, try...catch is not required


bloglistRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

bloglistRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    response.json(blog)
})

bloglistRouter.post('/', async (request, response) => {
    const body = request.body
    const user = request.user
    if(user){
        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,
            user: user.id
        })
        const result = await blog.save()
        user.blogs = user.blogs.concat(result.id)
        await user.save()
        response.status(201).json(result)
    }else{
        response.status(401).json({ error: 'no authorization token' })
    }
})

bloglistRouter.delete('/:id', async (request, response) => {
    const owner = await Blog.findById(request.params.id)
    if(owner.user.toString() === request.user.id.toString()) {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    }else{
        response.status(401).json({ error: 'blog can only be deleted by creator' })
    }
})

bloglistRouter.put('/:id', async (request, response) => {
    await Blog.findByIdAndUpdate(request.params.id,{ likes: request.body.likes })
    response.status(201).end()
})

/*comments*/
bloglistRouter.post('/:id/comments', async (request, response) => {
    await Blog.findByIdAndUpdate(request.params.id,{ $push: { comments: request.body.comments } },{ upsert: true, new : true })
    response.status(201).end()
})

module.exports = bloglistRouter