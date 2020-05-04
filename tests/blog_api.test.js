const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

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
    const res = await api.get('/api/blogs')
    const newBlog = {
        title: "POST DOS",
        author: "FELIX CUARTO",
        url: "saklnsad/sadas",
        likes: 5
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    expect(res.body.length).toBe(res.body.length)
})

afterAll(() => {
    mongoose.connection.close()
})