// modelo de usuarios que representara la tabla en mongo
// modelo para moongose
// haremos una destructuracion una importacion
// traemos el esquema y model
const{Schema,model}=require('mongoose');
// creamos el esquema , que contendra la coleccion
const UsuarioSchema= Schema({
    nombre:{
        type: String,
        require:true
    },
    email:{
        type: String,
        require:true,
        unique:true
    },
    password:{
        type: String,
        require:true
    },
    img:{
        type:String
    },
    role:{
        type: String,
        require:true,
        default: 'USER_ROLE'
    },
    google:{
        type: Boolean,
        default:false
    }
    

});

// mongo genera por default el campo _id, 
// pero si lo quiero manejar como id solo sin el guion, NO AFECTA A LA BASE
// lo cambiamos asi:

UsuarioSchema.method('toJSON',function(){
    // instancia del elemento actual
    // this.toObject(); extraigo los campos con destructuracion
    // el ...object tiene todos los campos menos el _id y la __v
    // extraigo el password pero luego no lo retorno para no verlo
    const {__v,_id,password, ...object} =this.toObject(); 

   // return object;// asi solo retorna el objeto sin los campos primeros
   // para corregir , le agrego un elemento al object
   object.uid=_id; // le agrego una prop uid con el _id
   return object;
});    
// exportamos el modelo a usar desde afuera
// cuando lo llamen
module.exports= model('Usuario',UsuarioSchema)
