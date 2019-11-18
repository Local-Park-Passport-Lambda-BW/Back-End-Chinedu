const server = require('../api/server')
const request = require('supertest')
const db = require('../database/db-config')

beforeEach(() => {
    return db('park').truncate();
})

describe('Router connection test', () => {
    it('returns the correct status', async () => {
        const res = await request(server).get('/api/parks');
        expect(res.status).toBe(200)
    })

    it('returns the correct message', async () => {
        const res = await request(server).get('/api/parks');
        expect(res.type).toBe('application/json');
        expect(res.body).toEqual({message: "Hi"})
    })
})