/*Ruta:/api/usuarios
*/
const {Router} = require('express');
const {check} = require('express-validator');
const{validarCampos} = require('../middlewares/validar-campos');
const{validarJWT} = require('../middlewares/validar-jwt');


const{getUsuarios,crearUsuario,actualizarUsuario,borrarUsuarios} = require('../controllers/usuarios');
//const validarCampos = require('../middlewares/validar-campos');

const router=Router();
 
/*router.get('/',(req,resp)=>{// el primer parametro no esta la ruta completa porque no es
    // necesario, cuando se llega aca es porque se llamo a la ruta
    // app.use('/api/usuarios',require.....

   // como pasa en el index este archivo puede crecer mucho
   // lo del controlador lo ponemos en controllers
    resp.json(
        {
            ok:true,
            usuarios:[{
                id:123,
                nombre:'fernando'
            }]
        }
    )
})  ESTO SE SIMPLIFICA*/
// leer usuarios
router.get('/',validarJWT,getUsuarios);// el seg. hago referencia al callback, no lo ejecuto
// crear usuarios // aca usaremos el express validator
router.post('/',
[// middlewares que seran validators 
    check('nombre','El nombre es obligatorio').not().isEmpty(), // chequea que el nombre no sea vacio
    check('password','La password es obligatorio').not().isEmpty(), // chequea que el password no sea vacio
    check('email','el email es incorrecto').isEmail(),
    validarCampos
         // debe se el ultimo a llamar 
],crearUsuario);

// actualizo el usuario , le paso el id 
router.put('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(), // chequea que el nombre no sea vacio
    check('email','el email es incorrecto').isEmail(),
    check('role','el role es obligatorio').not().isEmpty(),
    validarCampos

],actualizarUsuario);

router.delete('/:id',validarJWT,borrarUsuarios);
module.exports=router;