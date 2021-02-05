/*Ruta:/api/login
*/
const {Router} = require('express');
const {check} = require('express-validator');
const{validarCampos} = require('../middlewares/validar-campos');
const{validarJWT} = require('../middlewares/validar-jwt');


const router=Router();
const{login,googleSingIn,renewToken} = require('../controllers/auth')


router.post('/', 
// quiere decir la ruta
// middelwares
[  check('password','La password es obligatorio').not().isEmpty(), // chequea que el password no sea vacio
check('email','el email es incorrecto').isEmail(),
validarCampos

]
// controladores
,login
);
router.post('/google', 
// quiere decir la ruta
// middelwares
[  check('token','La password es obligatorio').not().isEmpty(), // chequea que el password no sea vacio

validarCampos

]
// controladores
,googleSingIn
);
// validar el token 
router.get('/renew', 
validarJWT  // necesitara un token correcto
,renewToken
);



module.exports=router;