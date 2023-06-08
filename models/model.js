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



const expenseSchema = new db.mongoose.Schema(
    {
        image:{type: String,require:true},
        name: { type: String, required: true },
        
    },
    {collection:'expense_cat'}
);
const receiveSchema = new db.mongoose.Schema(
    {
        image:{type: String,require:true},
        name: { type: String, required: true },
        
    },
    {collection:'receive_cat'}
);

const budgetexpenseSchema = new db.mongoose.Schema({
    title:{type: String,required:true},
    price:{type: Number,required:true},
    note:{type: String,required:true},
    filter:{type:Number,required:true},
    id_expense:{type: db.mongoose.Schema.Types.ObjectId,required:false,ref:'expenseModel'},
    id_user:{type: db.mongoose.Schema.Types.ObjectId,ref:'usersModel'},
    date:{type:Date,required:true}
},{collection:'budgetexpense'});
const budgetreceiveSchema = new db.mongoose.Schema({
    title:{type: String,required:true},
    price:{type: Number,required:true},
    note:{type: String,required:true},
    filter:{type:Number,required:true},
    id_receive:{type: db.mongoose.Schema.Types.ObjectId,required:false,ref:'receiveModel'},
    id_user:{type: db.mongoose.Schema.Types.ObjectId,ref:'usersModel'},
    date:{type:Date,required:true}
},{collection:'budgetreceive'});


let expenseModel = db.mongoose.model('expenseModel',expenseSchema);
let receiveModel = db.mongoose.model('receiveModel',receiveSchema);
let usersModel = db.mongoose.model('usersModel',userSchema);
let budgetexpenseModel= db.mongoose.model('budgetexpenseModel',budgetexpenseSchema);
let budgetreceiveModel= db.mongoose.model('budgetreceiveModel',budgetreceiveSchema);

module.exports={
    expenseModel,receiveModel,usersModel,budgetexpenseModel,budgetreceiveModel
}