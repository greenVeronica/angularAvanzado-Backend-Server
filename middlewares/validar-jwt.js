const {response} = require('express'); // puede servir de ayuda al escribir las respuestas
const {validationResult} =require('express-validator'); // para manejar los resultados del validator
// const jwt = require('../helpers/jwt'); ESTE NO VA ES EL AUTOMATICO
const jwt = require('jsonwebtoken');


const validarJWT= (req,resp=response,next)=>{
    // leer el token
    const token = req.header('x-token');
    
  //  console.log(token);
    if (!token){
        return resp.status(401).json({
            ok:false,
            msg:'No hay token en la peticion'
        })
    }

    // verificar token
    try {
        const {uid} =jwt.verify(token,process.env.JWT_SECRET);
        // si lo anterior anda bien va directo al console.log sino
        // va al catch

       // console.log(uid);

        // como anduvo ok, le puedo agregar al request que vino
        req.uid=uid;
        // anduvo todo bien , seguimos
      
        next();
        
        
    } catch (error) {
        return resp.status(401).json({
            ok:false,
            msg:'token incorrecto'
        })
    }

    
}

module.exports={
    validarJWT
}