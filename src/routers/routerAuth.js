const { Router } = require('express');
const routerLogin = Router();
const routerSignup = Router();
const routerLogout = Router();
const passport = require('../lib/auth.js')


/**** Rutas ****/

// Login
routerLogin.get('/', (req, res) => {
    if (req.isAuthenticated()){
        res.redirect('/')
    } else {
        res.render('login')
    }
})
routerLogin.post('/', passport.authenticate('login', { successRedirect: '/', failureRedirect: '/login/fail' }))
routerLogin.get('/fail', (req, res) => res.render('faillogin'))

// Registracion
routerSignup.get('/', (req, res) => res.render('signup'))
routerSignup.post('/', passport.authenticate('signup', { successRedirect: '/', failureRedirect: '/signup/fail' }))
routerSignup.get('/fail', (req, res) => res.render('failsignup'))


routerLogout.get('/', (req, res) => {
    const username = req.user.username
    req.logout()
    res.render('logout', { nombre: username })
    
})

exports.routerLogin = routerLogin
exports.routerSignup = routerSignup
exports.routerLogout = routerLogout
