var db = require('./db');
const userSchema = new db.mongoose.Schema(
    {
        email: { type: String, required: true },
        username:{type:String,required:true},
        password:{type:String,required:true},
        role:{type:String,required:true},

    },
    {collection:'users'}
);


let usersModel = db.mongoose.model('usersModel',userSchema);
module.exports={
    usersModel
}