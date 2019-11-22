const server = require('../api/server')
const request = require('supertest')
const db = require('../database/db-config')

const goodDeets = {
    name: "boss",
    username: "bossy",
    email: "boss@example.com",
    password: "12345"
}

const incompleteDeets = {
    email: "boss@example.com",
    password: "12345"
}

const noDeets = {}


describe('user router', () => {
    beforeEach(async done => {
        await db('user').truncate();
        done();
    })

    describe('POST /register', () => {
        it('shows correct status and message with complete details', async () => {
            const res = await request(server)
                .post('/users/register')
                .send(goodDeets);
                expect(res.statusCode).toBe(201)
                expect(res.body.username).toEqual("bossy")
                
        })
        
        it('shows correct status and message when no details', async () => {
            const res = await request(server)
                .post('/users/register')
                .send(noDeets);
                    expect(res.status).toBe(400)
                    expect(res.body).toEqual({message: "Missing user details"})
                
        })

        it('shows correct status and message with incomplete details', async () => {
            const res = await request(server)
                .post('/users/register')
                .send(incompleteDeets);
                    expect(res.status).toBe(400)
                    expect(res.body).toEqual({message: "Incomplete registration data"})
                
        })

    })

    describe('POST /login', () => {
        it('shows correct status and message when user not registered or bad password', async () => {
            await db('user').truncate();
            const res = await request(server)
                .post('/users/login')
                .send(goodDeets);
                    expect(res.status).toBe(401)
                    expect(res.body).toEqual({message: "Invalid credentials"})
                
        })

        // it('shows correct status and message incomplete details', async () => {
        //     const res = await request(server)
        //         .post('/users/register')
        //         .send(incompleteDeets);
        //             expect(res.status).toBe(400)
        //             expect(res.body).toEqual({message: "Incomplete registration data"})
                
        // })

        // it('shows correct status and message incomplete details', async () => {
        //     const res = await request(server)
        //         .post('/users/register')
        //         .send(goodDeets);
        //             expect(res.status).toBe(201)
        //             expect(res.body).toEqual({
        //                 name: 'boss',
        //                 username: 'bossy',
        //                 email: 'boss@example.com',
        //                 id: 1
        //             })
                
        // })
    })
})