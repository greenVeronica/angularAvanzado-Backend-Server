/*Ruta:/api/medico

*/
const {Router} = require('express');
const {check} = require('express-validator');
const{validarCampos} = require('../middlewares/validar-campos');
const{validarJWT} = require('../middlewares/validar-jwt');
const{getMedicos,crearMedico,actualizarMedico,borrarMedico} = require('../controllers/medicos');
const router=Router();
 

// leer usuarios
router.get('/',getMedicos);// el seg. hago referencia al callback, no lo ejecuto
// crear usuarios // aca usaremos el express validator
router.post('/',
[// middlewares que seran validators 
   // middlewares que seran validators 
   validarJWT,
   // ademas devuelve el uid
   check('nombre','El nombre es obligatorio').not().isEmpty(),
   check('hospital','El hospital id debe ser valido').isMongoId(), //debe ser un id de mongo

   validarCampos
],crearMedico);

// actualizo el usuario , le paso el id 
router.put('/:id',[
   
],actualizarMedico);

router.delete('/:id',//validarJWT,
borrarMedico);

module.exports=router;