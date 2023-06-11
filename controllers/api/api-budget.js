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