const blogsRouter = require('express').Router()
const mongoose = require('mongoose')

const Blog = require('../models/blog')


blogsRouter.get('/api/blogs', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs.map(blog => blog.toJSON()))
      })
  })
  
blogsRouter.post('/api/blogs', (request, response) => {
const blog = new Blog(request.body)

if(blog.likes === null || blog.likes === ''){
  blog.likes = 0
} 

if (blog.title === '' && blog.url === ''){
  response.status(400).send({ error: 'Title and url missing' })
} else {
  blog
    .save()
    .then(result => {
    response.status(201).json(result)
    })
  }
})

blogsRouter.delete('/api/blogs/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

module.exports = blogsRouter