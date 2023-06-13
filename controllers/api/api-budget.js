const MyModel = require('../../models/model')

exports.listrecord = async (req, res, next) => {
    let dataR = {
        status: 1,
        msg: "ok"
    }

    let dieu_kien =null;
    if(typeof(req.query.id_user)!='undefined'){
        let id_user =req.query.id_user;
        dieu_kien={id_user:id_user};
        console.log(dieu_kien);
    }

    //code xử lý lấy danh sách
    let list = []
    try {
        list = await MyModel.recordModel.find(dieu_kien).populate("id_cat").populate("id_user");
        dataR.data = list;
    }
    catch (err) {
        dataR.msg = err.message;
    }

    //trả về client
    res.json(dataR)
    console.log(dataR);

}
exports.addrecord =async (req, res, next) => {
    let dataR = {
        status: 1,
        msg: "ok"
    }
    if(req.method =='POST'){
        // xử lý ghi CSDL ở đây
        // kiểm tra hợp lệ dữ liệu ở chỗ này.


        // tạo đối tượng model 
        var is_expense = req.body.check;
        let objProduct = new MyModel.recordModel();
        objProduct.title = req.body.title;
        objProduct.price = req.body.price;
        objProduct.description = req.body.description;
        objProduct.id_cat = req.body.id_cat;
        objProduct.id_user = req.body.id_user;
        objProduct.id_balance = req.body.id_balance;
            objProduct.is_expense=req.body.is_expense;
       
        objProduct.date = new Date();
      
        try{
            let dataR = await objProduct.save();
            
            console.log(dataR);

            console.log("Đã ghi thành công");
           
        }catch(err){
            console.log(err);
            dataR.msg = err.message;
        }
 
    }
}
// exports.listreceivebudget = async (req, res, next) => {
//     let dataR = {
//         status: 1,
//         msg: "ok"
//     }
//     let dieu_kien =null;
//     if(typeof(req.query.id_user)!='undefined'){
//         let id_user =req.query.id_user;
//         dieu_kien={id_user:id_user};
//         console.log(dieu_kien);
//     }



//     //code xử lý lấy danh sách
//     let list = []
//     try {
//         list = await MyModel.budgetreceiveModel.find(dieu_kien).populate("id_receive").populate("id_user");
//         dataR.data = list;
//     }
//     catch (err) {
//         dataR.msg = err.message;
//     }

//     //trả về client
//     res.json(dataR)
// }