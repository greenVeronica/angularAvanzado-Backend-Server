/*Ruta:/api/upload/usuarios -medicos - hospitales/id del que corresponda

*/

const {Router} = require('express');
const expressFileUpload = require('express-fileupload');

const{validarJWT} = require('../middlewares/validar-jwt');
const{fileUpload,leerFoto} = require('../controllers/uploads');
const router=Router();

router.use(expressFileUpload());

router.put('/:tipo/:id',validarJWT,fileUpload);
router.get('/:tipo/:foto',validarJWT,leerFoto);



module.exports=router;

