    const {response} = require('express'); // puede servir de ayuda al escribir las respuestas
    const Usuario=require('../models/usuario');
    const {generarJWT}=require('../helpers/jwt');

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

    module.exports={
        login
    }