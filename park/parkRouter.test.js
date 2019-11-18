const server = require('../api/server')
const request = require('supertest')
const db = require('../database/db-config')

beforeEach(() => {
    return db('park').truncate();
})

describe('Park router', () => {

    describe('Router connection test', () => {
        it('returns the correct status of 200', async () => {
            const res = await request(server)
                .get('/api/parks');
            expect(res.status).toBe(200)
        })
    
        it('returns the correct message', async () => {
            const res = await request(server).get('/api/parks');
            expect(res.type).toBe('application/json');
            expect(res.body).toEqual({message: "Hi"})
        })
    })

    describe('POST /', () => {

        it('returns status of 201', async () => {
            const parkDetails = {
                name: 'Pleasure Park',
                city: 'PHC',
                state: 'Rivers',
                country: 'Nigeria',
                description: 'A fun place to be'
            }
            const res = await request(server)
                .post('/api/parks')
                .send(parkDetails);
            expect(res.status).toBe(201)
        })
        
        it('returns the new park after adding', async () => {
            const parkDetails = {
                name: 'Pleasure Park',
                city: 'PHC',
                state: 'Rivers',
                country: 'Nigeria',
                description: 'A fun place to be'
            }
            const res = await request(server)
            .post('/api/parks')
            .send(parkDetails);
            expect(res.type).toBe('application/json')
            expect(res.body).toEqual(parkDetails)
        })
        
        it('returns status of 500 when adding a park 2nd time', async () => {
            const parkDetails = {
                name: 'Pleasure Park',
                city: 'PHC',
                state: 'Rivers',
                country: 'Nigeria',
                description: 'A fun place to be'
            }
            const res = await request(server)
            .post('/api/parks')
            .send(parkDetails);
            const res2 = await request(server)
            .post('/api/parks')
            .send(parkDetails);
            expect(res2.status).toBe(500)
        })

        it('returns error message when adding a park 2nd time', async () => {
            const parkDetails = {
                name: 'Pleasure Park',
                city: 'PHC',
                state: 'Rivers',
                country: 'Nigeria',
                description: 'A fun place to be'
            }
            const res = await request(server)
                .post('/api/parks')
                .send(parkDetails);
            
            const res2 = await request(server)
                .post('/api/parks')
                .send(parkDetails);
            
            expect(res2.type).toBe('application/json')
            expect(res2.body.message).toBe('Failure to add park')
        })
    })
    
})
