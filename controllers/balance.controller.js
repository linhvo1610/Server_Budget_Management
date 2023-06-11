const myModel = require('../models/model');
const fs = require('fs');

exports.getbalance =async(req,res,next)=>{
    let dieu_kien =null;
    let list_user=await myModel.usersModel.find();
    let objBalance = await myModel.expenseModel.findById(  req.params.id_user  );
    console.log(objBalance);
    if(typeof(req.query.id_user)!='undefined'){
        let id_user =req.query.id_user;
        dieu_kien={id_user:id_user};

    }


    var list=await myModel.budgetexpenseModel.find(dieu_kien).populate('id_user');
    console.log(list);
    res.render( 'products/products',{list:list,list_user:list_user},)

}
exports.addbalance =async (req,res,next)=>{
    let list_user= await myModel.usersModel.find();

    if(req.method =='POST'){
        // xử lý ghi CSDL ở đây
        // kiểm tra hợp lệ dữ liệu ở chỗ này.


        let objBalance = new myModel.balanceModel();
        objBalance.balance =  req.body.balance;
        objBalance.id_user=req.body.user;

        try{
            let new_balance = await objBalance.save();

            console.log(new_balance);

            console.log("Đã ghi thành công");
            msg = 'Đã thêm thành công';
        }catch(err){
            console.log(err);
            msg ='Lỗi '+ error.message;

        }

    }
    res.render( 'balance/add_balance',{list_user:list_user},)

}
