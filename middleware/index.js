
module.exports = {
    validateUserdetails,
    validateParkDetails,
}

function validateParkDetails(req, res, next) {
    const { name, city, country, description } = req.body
    if (name && city && country && description) {
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
    if (req.path === '/login') {
        const { username, email, password } = req.body;
        if ((username || email) && password) {
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