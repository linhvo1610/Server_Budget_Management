var db = require('./db');
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


let expenseModel = db.mongoose.model('expenseModel',expenseSchema);
let receiveModel = db.mongoose.model('receiveModel',receiveSchema);
module.exports={
    expenseModel,receiveModel
}