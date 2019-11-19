const Park = require('./parkModel')
const db = require('../database/db-config')

describe('park model', () => {
    beforeEach(async () => {
        await db('park').truncate();
    })    

    describe('add a park', () => {
        it('adds a park', async () => {
            const parkDetails = {
                name: 'Pleasure Park',
                city: 'PHC',
                state: 'Rivers',
                country: 'Nigeria',
                description: 'A fun place to be'
            }
            await Park.addPark(parkDetails)
            const parks = await db('park')

            expect(parks.length).toBe(1)
        })
        
        it('returns the added park', async () => {
            const parkDetails = {
                name: 'Pleasure Park',
                city: 'PHC',
                state: 'Rivers',
                country: 'Nigeria',
                description: 'A fun place to be'
            }
            const parkDetails2 = {
                name: 'Pleasure',
                city: 'PHC',
                state: 'Rivers',
                country: 'Nigeria',
                description: 'fun place'
            }
            const newPark = await Park.addPark(parkDetails)
            const newPark2 = await Park.addPark(parkDetails2)

            expect(newPark)
                .toEqual({...parkDetails, id: 1 })
            
            expect(newPark2)
                .toEqual({...parkDetails2, id: 2 })
       })
    })

    describe('find park by name and city', () => {
        it('returns the park', async () => {
            const parkDetails = {
                name: 'Pleasure',
                city: 'PHC',
                state: 'Rivers',
                country: 'Nigeria',
                description: 'A fun place to be'
            }
            const [id] = await db('park').insert(parkDetails);
            const addedPark = await db('park').where({ id }).first();

            const foundPark = await Park.findByNameAndCity('Pleasure', 'PHC')

            expect(foundPark).toEqual(addedPark)
        })
    })

    describe('all parks', () => {
        it('returns all parks', async () => {
            const firstPark = {
                name: 'Pleasure Park',
                city: 'PHC',
                state: 'Rivers',
                country: 'Nigeria',
                description: 'A fun place to be'
            }
            await db('park').insert(firstPark)
            const parks = await Park.findAllParks();

            expect(parks).toContainEqual({ ...firstPark, id: 1 })
            expect(parks).toHaveLength(1)
        })
    })
})