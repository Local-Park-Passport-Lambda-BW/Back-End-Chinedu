const parkDb = require('../park/parkModel')

module.exports = {
    validateUserdetails,
    validateParkDetails,
    validatePark,
}

async function validatePark(req, res, next) {
    const { id } = req.params
    const park = await parkDb.findById(id)
    if (park) {
        req.park = park
        next()
    }
    else {
        res
            .status(404)
            .json({
                message: "There is no park with id " + id
            })
    }
}

function validateParkDetails(req, res, next) {
    const { name, city, country, description } = req.body
    if (!Object.keys(req.body).length) {
        res
            .status(400)
            .json({
                message: "Missing park details"
            })
    }
    else if (name && city && country && description) {
        next()
    }
    else {
        res
            .status(400)
            .json({
                message: "Incomplete details"
            })
    }
}

function validateUserdetails(req, res, next) {
    if (req.path === '/register') {
        const { name, username, email, password } = req.body;
        if (!Object.keys(req.body).length) {
            res
                .status(400)
                .json({
                    message: "Missing user details"
                })
        }
        else if (name && username && email && password) {
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
    if (req.path === '/login') {
        const { username, email, password } = req.body;
        if (!Object.keys(req.body).length) {
            res
                .status(400)
                .json({
                    message: "Missing user details"
                })
        }
        else if ((username || email) && password) {
            next()
        }
        else {
            res
                .status(400)
                .json({
                    message: "Incomplete details"
                })
        }        
    }
}