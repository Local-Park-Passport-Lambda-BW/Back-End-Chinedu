const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt
      .verify(
        token,
        process.env.JWT_SECRET || 'me secret me',
        (err, decodedToken) => {
          if (err) {
            res
              .status(401)
              .json({
                message: 'shall not pass!',
                error: err
              });        
          }
          else {
            req.decodedToken = decodedToken;
            next();
          }
    })
  }
  else {
    res
      .status(400)
      .json({
      message: "No credentials provided"
    })
  }
};