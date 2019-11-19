const server = require('../api/server')
const request = require('supertest')
const db = require('../database/db-config')

beforeEach(() => {
    return db('park').truncate();
})

describe('Park router', () => {

    describe('Router connection test', () => {
        it('returns the correct status of 404 when no parks', async () => {
            const res = await request(server)
                .get('/api/parks');
            expect(res.status).toBe(404)
        })
    
        it('returns the correct message when no parks', async () => {
            const res = await request(server).get('/api/parks');
            expect(res.type).toBe('application/json');
            expect(res.body).toEqual({message: "There are no saved parks"})
        })
    })

    // describe('POST /', () => {

    //     it('returns status of 201', async () => {
    //         const parkDetails = {
    //             name: 'Pleasure Park',
    //             city: 'PHC',
    //             country: 'Nigeria',
    //             description: 'A fun place to be'
    //         }
    //         const res = await request(server)
    //             .post('/api/parks')
    //             .send(parkDetails);
    //         expect(res.status).toBe(201)
    //     })
        
    //     it('returns the new park after adding', async () => {
    //         const parkDetails = {
    //             name: 'Pleasure Park',
    //             city: 'PHC',
    //             country: 'Nigeria',
    //             description: 'A fun place to be'
    //         }
    //         const res = await request(server)
    //         .post('/api/parks')
    //         .send(parkDetails);
    //         expect(res.type).toBe('application/json')
    //         expect(res.body).toEqual({ ...parkDetails, id: 1 })
    //     })
    // })
    
})
