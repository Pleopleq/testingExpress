const blogsRouter = require('express').Router()
const User = require('../models/users')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')


const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/api/blogs', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  
  response.json(blogs.map(note => note.toJSON()))
})


blogsRouter.post('/api/blogs', async (request, response) => {
  const body = request.body

  const token = getTokenFrom(request)

  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

const user = await User.findById(decodedToken.id)

const blog = new Blog({
  title: body.title,
  author: body.author,
  url: body.url,
  likes: body.likes,
  user: user._id
})

if(blog.likes ===   null || blog.likes === ''){
  blog.likes = 0
} else if  (blog.title === '' && blog.url === ''){
  response.status(400).send({ error: 'Title and url missing' })
} else {
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog).end()
  }
})

blogsRouter.delete('/api/blogs/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

module.exports = blogsRouter