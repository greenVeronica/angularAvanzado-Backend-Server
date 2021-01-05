
const{Schema,model}=require('mongoose');

const HospitalSchema= Schema({ //creara la tabla hospitals
    nombre:{
        type: String,
        required:true
    },
    
    img:{
        type:String
    },
    usuario:{ // el que creo el hospital
        required:true,
        // establezco la referencia con el modelo Usuario
        type: Schema.Types.ObjectId,
        ref:'Usuario'  

    }
    

},{collection:'hospitales'}); // para que en la base se llame asi



HospitalSchema.method('toJSON',function(){

    const {__v, ...object} =this.toObject(); 


  
   return object;
});    

module.exports= model('Hospital',HospitalSchema)
