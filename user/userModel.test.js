const User = require('./userModel')
const db = require('../database/db-config')

describe('user model', () => {
    beforeEach(async () => {
        await db('user').truncate();
    })

    describe('add user', () => {
        it('adds a user', async () => {
            const userDetails = {
                name: 'mike',
                username: 'mikey',
                email: 'mike@example.com',
                password: '1234'
            }
            await User.addUser(userDetails)
            const users = await db('user')

            expect(users.length).toBe(1);
            expect(users[0].username).toBe('mikey')
        })

        it('resolves to the new user', async () => {
            const userDetails = {
                name: 'mike',
                username: 'mikey',
                email: 'mike@example.com',
                password: '1234'
            }
            const newUser = await User.addUser(userDetails)

            expect(newUser)
                .toEqual({
                name: 'mike',
                username: 'mikey',
                email: 'mike@example.com',
                id: 1
            })
        })
    })

    describe('search using username', () => {
        it('returns a user using the username or email', async () => {
            const userDetails = {
                name: 'mike',
                username: 'mikey',
                email: 'mike@example.com',
                password: '1234'
            }
            const [id] = await db('user').insert(userDetails);
            const newUser = await db('user').where({ id }).first();
            const foundUser1 = await User.findByUsernameOrEmail(newUser.username)
            const foundUser2 = await User.findByUsernameOrEmail(newUser.email)

            expect(foundUser1).toEqual(foundUser2)
        })
    })
})