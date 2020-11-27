const {response} = require('express'); // puede servir de ayuda al escribir las respuestas
const {validationResult} =require('express-validator'); // para manejar los resultados del validator
// igual a un controlador con el req, resp y se agrega next, si pasa todo hace lo siguiente
const validarCampos =(req,resp=response,next)=> {
  // validaciones
        // podemos ver si paso las validaciones del express-validators
        // hecho en el ruteo routes/usuario.js son el resultado de los checks
        const errores=validationResult(req); // pasara por el middleware del check
        if (!errores.isEmpty()){
            // hay errores
            return resp.status(400).json({
                ok:false,
                errors:errores.mapped() // formateamos los errores
             // errors:'hay errores'
            })
        }

        // si anduvo bien sin errores se llama al next
        next();

}

module.exports={
    validarCampos
}