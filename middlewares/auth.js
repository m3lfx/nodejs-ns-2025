const jwt = require("jsonwebtoken")
exports.isAuthenticatedUser = (req, res, next) => {

    console.log(req.headers)
   
    if (!req.header('Authorization')) {
        return res.status(401).json({ message: 'Login first to access this resource' })
    }

    const token = req.header('Authorization').split(' ')[1];
    // console.log(token)


    if (!token) {
        return res.status(401).json({ message: 'Login first to access this resource' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log(decoded.id)

    // next()
};

