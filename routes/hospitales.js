/*Ruta:/api/hospitales

*/
const {Router} = require('express');
const {check} = require('express-validator');
const{validarCampos} = require('../middlewares/validar-campos');
const{validarJWT} = require('../middlewares/validar-jwt');
const{getHospitales,crearHospital,actualizarHospital,borrarHospital} = require('../controllers/hospitales');
const router=Router();
 

// leer usuarios
router.get('/',getHospitales);// el seg. hago referencia al callback, no lo ejecuto
// crear usuarios // aca usaremos el express validator
router.post('/',
[// middlewares que seran validators 
    validarJWT,
     // ademas devuelve el uid
     check('nombre','El nombre es obligatorio').not().isEmpty(),
     validarCampos
],crearHospital);

// actualizo el usuario , le paso el id 
router.put('/:id',[
   
],actualizarHospital);

router.delete('/:id',//validarJWT,
borrarHospital);

module.exports=router;