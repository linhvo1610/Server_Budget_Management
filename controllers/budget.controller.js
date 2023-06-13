const myModel = require('../models/model');
const fs = require('fs');

exports.getrecord = async (req, res, next) => {
    let dieu_kien = null;
    let list_cat = await myModel.categoryModel.find();
    let objCat = await myModel.categoryModel.findById(req.params.idcat);
    console.log(objCat);
    if (typeof (req.query.id_cat) != 'undefined') {
        let id_cat = req.query.id_cat;
        dieu_kien = { id_cat: id_cat };

    }


    var list = await myModel.recordModel.find(dieu_kien).populate('id_cat');
    console.log(list);
    res.render('budget/expense', { list: list, list_cat: list_cat },)

}
exports.detail = async(req,res,next) =>{
    let dieu_kien = null;
    let list_cat = await myModel.categoryModel.find();
    let objCat = await myModel.categoryModel.findById(req.params.idcat);
   
    console.log(objCat);
    if (typeof (req.query.id_cat) != 'undefined') {
        let id_cat = req.query.id_cat;
        dieu_kien = { id_cat: id_cat };

    }


    var list = await myModel.recordModel.find(dieu_kien).populate('id_cat');
    console.log(list);
    res.render('budget/detail', { list: list, list_cat: list_cat },)
}
exports.addrecord = async (req, res, next) => {
    var url_img = '';

    let list_cat = await myModel.categoryModel.find();
    let list_user = await myModel.usersModel.find();
    let list_balance = await myModel.balanceModel.find();

    if (req.method == 'POST') {
        // xử lý ghi CSDL ở đây
        // kiểm tra hợp lệ dữ liệu ở chỗ này.

        var is_expense = req.body.check;
        console.log(is_expense);
        let objProduct = new myModel.recordModel();
        objProduct.title = req.body.title;
        objProduct.price = req.body.price;
        objProduct.description = req.body.description;
        objProduct.id_cat = req.body.category;
        objProduct.id_user = req.body.user;
        objProduct.id_balance = req.body.balance;
        var isChecked = false;
        if (is_expense == 'true') {
            isChecked = true;
            objProduct.is_expense=isChecked
        }else{
            objProduct.is_expense=isChecked
        }
       
        objProduct.date = new Date();

        try {
            let new_product = await objProduct.save();

            console.log(new_product);

            console.log("Đã ghi thành công");
            msg = 'Đã thêm thành công';
        } catch (err) {
            console.log(err);
            msg = 'Lỗi ' + error.message;

        }

    }
    res.render('budget/add_expense_budget', { list_cat: list_cat, list_user: list_user, list_balance: list_balance },)

}

// exports.getreceivebudget =async(req,res,next)=>{
//     let dieu_kien =null;
//     let list_expense=await myModel.receiveModel.find();
//     let objCat = await myModel.receiveModel.findById(  req.params.idcat  );
//     console.log(objCat);
//     if(typeof(req.query.id_receive)!='undefined'){
//         let id_receive =req.query.id_receive;
//         dieu_kien={id_receive:id_receive};

//     }


//     var list=await myModel.budgetreceiveModel.find(dieu_kien).populate('id_receive');
//     console.log(list);
//     res.render( 'products/products',{list:list,list_cat:list_cat},)

// }
// exports.addreceivebudget =async (req,res,next)=>{
//     var url_img='';

//     let list_cat=await myModel.receiveModel.find();
//     let list_user= await myModel.usersModel.find();

//     if(req.method =='POST'){
//         // xử lý ghi CSDL ở đây
//         // kiểm tra hợp lệ dữ liệu ở chỗ này.


//         let objProduct = new myModel.budgetreceiveModel();
//         objProduct.title =  req.body.title;
//         objProduct.price = req.body.price;
//         objProduct.note=req.body.note;
//         objProduct.id_receive= req.body.category;
//         objProduct.id_user=req.body.user;
//         objProduct.filter=0;
//         objProduct.date=new Date();

//         try{
//             let new_product = await objProduct.save();

//             console.log(new_product);

//             console.log("Đã ghi thành công");
//             msg = 'Đã thêm thành công';
//         }catch(err){
//             console.log(err);
//             msg ='Lỗi '+ error.message;

//         }

//     }
//     res.render( 'budget/add_receive_budget',{list_cat:list_cat,list_user:list_user},)

// }