
const{Schema,model}=require('mongoose');

const MedicoSchema= Schema({ //creara la tabla medicos
    nombre:{
        type: String,
        required:true
    },
    
    img:{
        type:String
    },
    usuario:{ // el que creo el hospital
        // establezco la referencia con el modelo Usuario
        type: Schema.Types.ObjectId,
        ref:'Usuario' ,
        required:true 

    },
    hospital:{ 
        // establezco la referencia con el modelo Hospital
        type: Schema.Types.ObjectId,
        ref:'Hospital'  ,
        required:true

    }
    

}); // para que en la base se llame asi


MedicoSchema.method('toJSON',function(){

    const {__v, ...object} =this.toObject(); 


  
   return object;
});    

module.exports= model('Medico',MedicoSchema)
