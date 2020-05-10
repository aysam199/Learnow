const router = require('express').Router();
const {jwtCheck} = require ('../middlewares/auth0');



router.get('/',require('../actions/courses'));


module.exports = router;