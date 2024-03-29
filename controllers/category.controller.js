const myModel = require('../models/model');
const fs = require('fs');
exports.addcategory = async (req, res, next) => {
    let msg = ''; // ghi câu thông báo
    var url_img='';

    if (req.method == 'POST'){
        await fs.promises.rename(req.file.path, './public/uploads/' + req.file.originalname)
        url_img = '/uploads/' + req.file.originalname;
        console.log("upload thành công" + url_img);
        let objCat = new myModel.categoryModel();
        objCat.name=req.body.name;
        objCat.image=url_img;
    
        try {
            let new_cat = await objCat.save();
            console.log(new_cat);
            console.log("Đã ghi thành công");
            msg = 'Đã thêm thành công';
        } catch (err) {
            console.log(err);
            msg = 'Lỗi ' + error.message;

        }

    }
    res.render('category/add_expense_category')
}
exports.listcategory = async (req, res, next) => {

    var list = await myModel.categoryModel.find();
    
    console.log(list);

    res.render('category/expense_category', { list: list })
}

exports.deletecategory = async (req, res, next) => {
    let msg = ''; // chứa câu thông báo
    // load dữ liệu cũ để hiển thị
    let objCat = await myModel.categoryModel.findById(req.params.idcat);
    console.log(objCat);

    try {

        // update dữ liệu
        // await myModel.spModel.updateOne( {_id:  req.params.idsp},   objSP );
        await myModel.categoryModel.findByIdAndDelete({ _id: req.params.idcat });
        res.redirect('/category/expensecat');

        console.log("Đã xóa thành công");
        msg = 'Đã ghi thành công';
    } catch (err) {
        console.log(err);
        msg = 'Lỗi ' + err.message;

    }


    res.render('category/expense_category',
        { msg: msg })

}
exports.editcategory = async (req, res, next) => {
    let msg = ''; // chứa câu thông báo
    // load dữ liệu cũ để hiển thị
    let list_user=await myModel.usersModel.find();
    let objCat = await myModel.categoryModel.findById(req.params.idcat);
    console.log(objCat);
    if (req.method == 'POST') {

        let objCat = new myModel.categoryModel();
        objCat.name = req.body.name;
        objCat.id_user = req.body.user;
        objCat._id = req.params.idcat;
        try {

            // update dữ liệu
            // await myModel.spModel.updateOne( {_id:  req.params.idsp},   objSP );
            await myModel.categoryModel.findByIdAndUpdate({ _id: req.params.idcat }, objCat);
            res.redirect('/category/expensecat');
            console.log("Đã ghi thành công");
            msg = 'Đã ghi thành công';

        } catch (err) {
            console.log(err);
            msg = 'Lỗi ' + err.message;

        }

    }

    res.render('category/editexpensecategory',
        { msg: msg, objCat: objCat,list_user:list_user })

}
// exports.sortexpenseCatname = async (req, res, next) => {
//     //Hiển thị danh sach san pham

//     //kiểm tra tồn tại tham số
//     let dieu_kien = null;
//     if (typeof (req.query.name) != 'undefined') {
//         let name = req.query.name;
//         dieu_kien = { name: name };
//     }


//     //var list=await myModel.spModel.find(dieu_kien).sort({name:1});
//     //cair tieens lay them the loai
//     var list = await myModel.expenseModel.find().sort({ name: -1 });
//     console.log(list);

//     res.render('category/expense_category', { list: list })
// }
// exports.addreceiveCat = async (req, res, next) => {
//     let msg = ''; // ghi câu thông báo

//     if (req.method == 'POST') {
//         // xử lý ghi CSDL ở đây
//         // kiểm tra hợp lệ dữ liệu ở chỗ này.


//         // tạo đối tượng model 
//         let objCat = new myModel.receiveModel();
//         objCat.name = req.body.name;
//         objCat.image = req.file.filename;

//         try {
//             let new_cat = await objCat.save();

//             console.log(new_cat);

//             console.log("Đã ghi thành công");
//             msg = 'Đã thêm thành công';
//         } catch (err) {
//             console.log(err);
//             msg = 'Lỗi ' + error.message;

//         }

//     }
//     res.render('category/add_receive_category', { TieuDe: "Add User" },)
// }
// exports.listreceiveCat = async (req, res, next) => {

//     var list = await myModel.receiveModel.find();
//     console.log(list);

//     res.render('category/receive_category', { list: list })
// }

// exports.deletereceiveCat = async (req, res, next) => {
//     let msg = ''; // chứa câu thông báo
//     // load dữ liệu cũ để hiển thị
//     let objCat = await myModel.receiveModel.findById(req.params.idcat);
//     console.log(objCat);

//     try {

//         // update dữ liệu
//         // await myModel.spModel.updateOne( {_id:  req.params.idsp},   objSP );
//         await myModel.receiveModel.findByIdAndDelete({ _id: req.params.idcat });
//         res.redirect('/category/receivecat');

//         console.log("Đã xóa thành công");
//         msg = 'Đã ghi thành công';
//     } catch (err) {
//         console.log(err);
//         msg = 'Lỗi ' + err.message;

//     }


//     res.render('category/receive_category',
//         { msg: msg })

// }
// exports.editreceiveCat = async (req, res, next) => {
//     let msg = ''; // chứa câu thông báo
//     // load dữ liệu cũ để hiển thị
//     let objCat = await myModel.receiveModel.findById(req.params.idcat);
//     console.log(objCat);
//     if (req.method == 'POST') {

//         let objCat = new myModel.receiveModel();
//         objCat.name = req.body.name;
//         objCat.image = req.file.filename;
//         objCat._id = req.params.idcat;
//         try {

//             // update dữ liệu
//             // await myModel.spModel.updateOne( {_id:  req.params.idsp},   objSP );
//             await myModel.receiveModel.findByIdAndUpdate({ _id: req.params.idcat }, objCat);
//             res.redirect('/category/receivecat');
//             console.log("Đã ghi thành công");
//             msg = 'Đã ghi thành công';

//         } catch (err) {
//             console.log(err);
//             msg = 'Lỗi ' + err.message;

//         }

//     }

//     res.render('category/editreceivecategory',
//         { msg: msg, objCat: objCat })

// }
// exports.sortreceivecatname = async (req, res, next) => {
//     //Hiển thị danh sach san pham

//     //kiểm tra tồn tại tham số
//     let dieu_kien = null;
//     if (typeof (req.query.name) != 'undefined') {
//         let name = req.query.name;
//         dieu_kien = { name: name };
//     }


//     //var list=await myModel.spModel.find(dieu_kien).sort({name:1});
//     //cair tieens lay them the loai
//     var list = await myModel.receiveModel.find().sort({ name: -1 });
//     console.log(list);

//     res.render('category/receive_category', { list: list })
// }