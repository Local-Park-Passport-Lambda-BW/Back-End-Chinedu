const server = require('../api/server')
const request = require('supertest')
const db = require('../database/db-config')

let token

const userDeets = {
    name: 'boss',
    username: 'bossy',
    email: 'boss@example.com',
    password: "12345"
}

const loginDeets = {
    email: 'boss@example.com',
    password: '12345'
}

beforeEach(async done => {
    await db('park').truncate();
    done();
})

beforeAll( async done => {
    await db('user').truncate();
    await request(server).post('/users/register').send(userDeets)
    const response = await request(server).post('/users/login').send(loginDeets)
    token = response.body.token
    done();
})

describe('Park router', () => {

    describe('Router connection test', () => {
        it('returns the correct status of 404 when no parks', async () => {
            const res = await request(server)
                .get('/parks');
            expect(res.status).toBe(404)
        })
    
        it('returns the correct message when no parks', async () => {
            const res = await request(server).get('/parks');
            expect(res.type).toBe('application/json');
            expect(res.body).toEqual({message: "There are no saved parks"})
        })

        it('status of 200 when there are parks', async () => {
            await db.seed.run();
            const res = await request(server).get('/parks');
            expect(res.status).toBe(200)
            expect(res.type).toBe('application/json');
            expect(res.body).toHaveLength(3)
        })
    })

    describe('POST /', () => {

        it('returns status of 400 when no token', async () => {
            const parkDetails = {
                name: 'Pleasure Park',
                city: 'PHC',
                country: 'Nigeria',
                description: 'A fun place to be'
            }
            const res = await request(server)
                .post('/parks')
                .send(parkDetails);
            expect(res.status).toBe(400)
        })
        
        it('returns correct message when no token', async () => {
            const parkDetails = {
                name: 'Pleasure Park',
                city: 'PHC',
                country: 'Nigeria',
                description: 'A fun place to be'
            }
            const res = await request(server)
            .post('/parks')
            .send(parkDetails);
            expect(res.type).toBe('application/json')
            expect(res.body).toEqual({ message: "No credentials provided" })
        })
    })

    describe('POST /', () => {

        it('returns correct status and result with good token', async () => {
            
            const parkDetails = {
                name: 'Pleasure Park',
                city: 'PHC',
                country: 'Nigeria',
                description: 'A fun place to be'
            }
            const res = await request(server)
                .post('/parks')
                .send(parkDetails)
                .set('Authorization', token);
            
            expect(res.status).toBe(201)
            expect(res.body).toEqual({...parkDetails, id: 1 })
        })
        
        it('returns correct status and message with bad token', async () => {
            const parkDetails = {
                name: 'Pleasure Park',
                city: 'PHC',
                country: 'Nigeria',
                description: 'A fun place to be'
            }
            const res = await request(server)
                .post('/parks')
                .send(parkDetails)
                .set('Authorization', "mimi");
            
            expect(res.status).toBe(401)
            expect(res.type).toBe('application/json')
            expect(res.body.message).toEqual("shall not pass!" )
        })
    })
    
})
