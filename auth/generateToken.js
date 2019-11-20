const jwt = require('jsonwebtoken')

module.exports = (user) => {
    const payload = {
        subject: user.id,
        username: user.username
    }
    const options = {
        expiresIn: '1d'
    }
    const result = jwt.sign(
        payload,
        process.env.JWT_SECRET || 'them secret them',
        options
    )
    return result
}