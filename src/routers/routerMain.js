function checkAuth(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect("/login");
    }
}



function getIndex(req, res) {
    const username = req.user.username
    res.render('main', { nombre: username })
}

module.exports = {
    checkAuth,
    getIndex
}