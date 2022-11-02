const User = require('../models/user');
const bcrypt = require('bcryptjs');
const moment = require('moment');

//import all services
const { findUserbyEmail, isValidPassword } = require('../services/user');

/* Get the register Page */
exports.getRegister = (req, res, next) => {
    let errors = [];
    res.render('auth/register', {
        errors,
    });
};

/* Post user info in the database for register */
exports.postRegister = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const password2 = req.body.password2;

    console.log(name + ' ' + email + ' ' + password);

    let errors = [];
    if (!name || !email || !password || !password2) {
        errors.push({ message: "Veuillez remplir tout les formulaires" });
    }

    if (password !== password2) {
        errors.push({ message: "Veuillez verifier votre mot de passe" });
    }

    if (password.length < 5) {
        errors.push({ message: "le mot de passe devrait avoir au moins 6 caractères" });
    }
    if (name.length < 4) {
        errors.push({ message: "le nom devrait avoir au moins 5 caractères" });
    }

    if (errors.length > 0) {
        res.render('auth/register', {
            errors,
            name,
            email,
            password,
            password2
        });
    } else {
        //Validation passed
        User.findOne({ email: email })
            .then(user => {
                if (!user) {
                    const newUser = new User({
                        username: name,
                        email: email,
                        password: password
                    });
                    //hashed password
                    bcrypt.genSalt(10, (error, salt) => {
                        bcrypt.hash(newUser.password, salt, (error, hash) => {

                            //Set password to hash
                            newUser.password = hash;
                            console.log(hash);
                            console.log(error);
                            //save user
                            newUser.save()
                                .then(user => {
                                    console.log(user);
                                    res.redirect('/login');
                                })
                                .catch(error => console.log(error));

                        });
                        console.error(error);
                    });

                } else {
                    errors.push({ message: "email identique à un autre compte" });
                    res.render('auth/register', {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    });
                }
            })
            .catch(error => console.log(error));

    }

};

//SignIn
/*Get Login Page*/
exports.getLogin = (req, res, next) => {
    console.log(req.session.user)
    let user = req.session.user;
    res.render('auth/login', {
        path: '/login',
        user: user
    });
};

//login handle
exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    let errors = [];
    let userLoged = {};

    if (!email || !password) {
        errors.push({ message: "Veuillez remplir correctement le formulaire" });
    }

    if (errors.length > 0) {
        res.render('auth/login', {
            errors
        });
    } else {
        findUserbyEmail(email, (user) => {
            if (!user) {
                console.log('Aucun utilisateur est associé à cet email');
                res.redirect('/login');
            } else {
                isValidPassword(password, user.password, (valid) => {
                    if (valid == false) {
                        console.log("Mot de passe incorrect");
                        res.redirect('/login');
                    } else {
                        userLoged = {
                            name: user.name,
                            email: user.email,
                            password: user.password
                        }
                        req.session.user = userLoged;
                        res.redirect('/home');
                    }
                })

            }

        })
    }
};

/*Secure the Page*/
exports.secureLog = (req, res, next) => {
    if (req.session.user) next();
    else {
        res.redirect('/login');
    }
}

/*LogOut function*/
exports.postLogout = (req, res, next) => {
    req.session.destroy(() => console.log("User logged out"));
    res.redirect('/login')
};