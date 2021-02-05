    const {response} = require('express'); // puede servir de ayuda al escribir las respuestas
    const Usuario=require('../models/usuario');
    const {generarJWT}=require('../helpers/jwt');
    const {googleVerify}=require('../helpers/google-verify');
    const bcryptjs=require('bcryptjs');
 

    const login=async(req,resp=response)=>{

        const { password, email} =req.body;


        try {
            // verificar email
            const usuarioDB=await Usuario.findOne({email});
            //si no existe
            if(!usuarioDB){
            return  resp.status(404).json({
                    ok:false,
                    msg:'no existe el usuario'
                })
            }
            // verificar contraseña
            // tengo la clave encriptada
            const validPassword=bcryptjs.compareSync(password,usuarioDB.password);
            if(!validPassword){
                return  resp.status(400).json({
                    ok:false,
                    msg:'contraseña incorrecta'
                })
            }

            // TODO: generar token - JWT
            const token =await generarJWT(usuarioDB.id);    
            // anduvo todo ok
            resp.json(
                {
                    ok:true,
                    token
                }
            )
        } catch (error) {
            console.log(error);
            resp.status(500).json({
                ok:false,
                msg: 'error '
            })
        }
    }
    const googleSingIn=async(req,resp=response)=>{
        const googletoken =req.body.token;
        //console.log(googletoken);
        try {
          const  {name, email , picture} =await  googleVerify(googletoken);
         
          // como en el caso de login comun chequear que el usuario exista
          const usuarioDb =  await Usuario.findOne({email});
        
          let usuario;
          if(!usuarioDb){
            // 
           // console.log('no existe el usuairo');
              // lo creamos
              usuario = new Usuario({
                  nombre:name,
                  email, // email=email
                  password:'@@@',// como viene de google no la sabemos
                  img:picture,
                  google:true // vino de google


              });
            
            }else
            {
              //  console.log(' existe el usuairo');
            usuario=usuarioDb
            usuario.google=true,
            usuario.password='@@@'
         }
         // guardar los cambios
         await  usuario.save();
         // TODO: generar token - JWT
         const token =await generarJWT(usuario.id); 

            resp.json(
                {
                    ok:true,
                  token
                }
            )
        } catch (error) {
            resp.status(401).json({
                ok:false,
                msg: 'no valido el token ingresado',
                
               // error 
            })
        }
        
    }
    // tomaremos un token y si es valido 
    // generamos uno nuevo para el uid que esta 
    // embebido en el primer token
    const renewToken=async(req,resp=response)=>{
      // si es valido el token que se envio como header
      // la funcion validarJWT tambien devuelve el uid 
      // del toquen valido en el request
      const uid=req.uid
      // si llegamos hasta aca es que tenemos el usuarioid
      const token =await generarJWT(uid); // renuevo y genero el token
        resp.json(
            {
                ok:true,
                token, // token nuevo
                uid

              
            }
        )
    }

    module.exports={
        login,
        googleSingIn,
        renewToken
    }