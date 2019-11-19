const db = require('./userModel')

module.exports = {
    validateUserdetails,
}

function validateUserdetails(req, res, next) {
    const { name, username, email, password } = req.body;
    if (name && username && email && password) {
        next()
    }
    else {
        res
            .status(400)
            .json({
                message: "Incomplete registration data"
            })
    }
}