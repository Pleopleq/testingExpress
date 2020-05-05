const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')


const api = supertest(app)


const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

test('blogs are returned as json', async () => {
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('verify that the unique id propety is named "id"', async () => {
    const res = await api.get('/api/blogs')

    expect(res.body[0].id).toBeDefined()
})

test('verify that a new post is added', async () => {

    const newBlog = {
        title: "Poop",
        author: "Felix hola",
        url: "23234/12121",
        likes: "5"
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const allItems = await blogsInDb()

    expect(allItems.length).toBe(allItems.length)
})

test('verifies likes property set to 0 if the request miss the likes property', async () => {
    const newBlog = 
    {
    title: "Post 245454513",
    author: "Felix quinto",
    url: "23234",
    likes: ""
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

    const lastBlog = await blogsInDb()
    const lastItem = lastBlog.pop();
    expect(lastItem.likes).toBe(0)
})

test('return status 400 if title and url are missing', async () => {
    const newBlog = 
    {
    title: "",
    author: "Felix quinto",
    url: "",
    likes: "2"
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

afterAll(() => {
    mongoose.connection.close()

})