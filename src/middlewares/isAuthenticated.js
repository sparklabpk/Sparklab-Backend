const isAuthenticated = (req, res, next) => {
    next();
}

module.exports = isAuthenticated;