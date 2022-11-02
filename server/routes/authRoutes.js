const connectEnsureLogin = require('connect-ensure-login');
const router = require('express').Router();
const authController = require('../controller/auth');

router.route('/login').get(authController.getLogin);
router.route('/').get(authController.getLogin);
router.route('/register').get(authController.getRegister);

router.route('/login').post(authController.postLogin);
router.route('/').post(authController.postLogin);
router.route('/register').post(authController.postRegister);

router.route('/logout').get(authController.postLogout);


module.exports = router;
