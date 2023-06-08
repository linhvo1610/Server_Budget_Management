const myModel = require('../models/model');
const fs = require('fs');

exports.getexpensebudget =async(req,res,next)=>{
    let dieu_kien =null;
    let list_expense=await myModel.expenseModel.find();
    let objCat = await myModel.expenseModel.findById(  req.params.idcat  );
    console.log(objCat);
    if(typeof(req.query.id_expense)!='undefined'){
        let id_expense =req.query.id_expense;
        dieu_kien={id_expense:id_expense};

    }


    var list=await myModel.budgetexpenseModel.find(dieu_kien).populate('id_expense');
    console.log(list);
    res.render( 'products/products',{list:list,list_cat:list_cat},)

}
exports.addexpensebudget =async (req,res,next)=>{
    var url_img='';

    let list_cat=await myModel.expenseModel.find();
    let list_user= await myModel.usersModel.find();

    if(req.method =='POST'){
        // xử lý ghi CSDL ở đây
        // kiểm tra hợp lệ dữ liệu ở chỗ này.


        let objProduct = new myModel.budgetexpenseModel();
        objProduct.title =  req.body.title;
        objProduct.price = req.body.price;
        objProduct.note=req.body.note;
        objProduct.id_expense = req.body.category;
        objProduct.id_user=req.body.user;
        objProduct.filter=1;
        objProduct.date=new Date();

        try{
            let new_product = await objProduct.save();

            console.log(new_product);

            console.log("Đã ghi thành công");
            msg = 'Đã thêm thành công';
        }catch(err){
            console.log(err);
            msg ='Lỗi '+ error.message;

        }

    }
    res.render( 'budget/add_expense_budget',{list_cat:list_cat,list_user:list_user},)

}

exports.getreceivebudget =async(req,res,next)=>{
    let dieu_kien =null;
    let list_expense=await myModel.receiveModel.find();
    let objCat = await myModel.receiveModel.findById(  req.params.idcat  );
    console.log(objCat);
    if(typeof(req.query.id_receive)!='undefined'){
        let id_receive =req.query.id_receive;
        dieu_kien={id_receive:id_receive};

    }


    var list=await myModel.budgetreceiveModel.find(dieu_kien).populate('id_receive');
    console.log(list);
    res.render( 'products/products',{list:list,list_cat:list_cat},)

}
exports.addreceivebudget =async (req,res,next)=>{
    var url_img='';

    let list_cat=await myModel.receiveModel.find();
    let list_user= await myModel.usersModel.find();

    if(req.method =='POST'){
        // xử lý ghi CSDL ở đây
        // kiểm tra hợp lệ dữ liệu ở chỗ này.


        let objProduct = new myModel.budgetreceiveModel();
        objProduct.title =  req.body.title;
        objProduct.price = req.body.price;
        objProduct.note=req.body.note;
        objProduct.id_receive= req.body.category;
        objProduct.id_user=req.body.user;
        objProduct.filter=0;
        objProduct.date=new Date();

        try{
            let new_product = await objProduct.save();

            console.log(new_product);

            console.log("Đã ghi thành công");
            msg = 'Đã thêm thành công';
        }catch(err){
            console.log(err);
            msg ='Lỗi '+ error.message;

        }

    }
    res.render( 'budget/add_receive_budget',{list_cat:list_cat,list_user:list_user},)

}