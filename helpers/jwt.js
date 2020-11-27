const jwt = require('jsonwebtoken');


const generarJWT=(uid)=>{
    // generarmos una promesa para que podamos manejar
    // en forma asincrona cuando querramos verificar el jwt

    return new Promise((resolve, reject)=>{

        const payload ={ // se puede poner cualquier cosa se recomienda
            // que no sea info sensible
            uid,
            nombre:'pruebaVero'
        }
         jwt.sign(payload,process.env.JWT_SECRET,{
             expiresIn:'24h'
         },(err,token)=>{ // si anduvo ok devuelve token 
            // si hubo error devueve el err
            if(err){
                console.log(err);
                reject('no se pudo generar JWT');
            }else{
                // anduvo ok la generacion del jwt
                resolve(token);
            }
    
         }); 
    });
}

module.exports={generarJWT}