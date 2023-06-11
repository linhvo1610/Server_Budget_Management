const MyModel = require('../../models/model')

exports.listcat = async (req, res, next) => {
    let dataR = {
        status: 1,
        msg: "ok"
    }



    //code xử lý lấy danh sách
    let list = []
    try {
        list = await MyModel.balanceModel.find();
        dataR.data = list;
    }
    catch (err) {
        dataR.msg = err.message;
    }

    //trả về client
    res.json(dataR)
}
// exports.listcatreceive = async (req, res, next) => {
//     let dataR = {
//         status: 1,
//         msg: "ok"
//     }



//     //code xử lý lấy danh sách
//     let list = []
//     try {
//         list = await MyModel.receiveModel.find();
//         dataR.data = list;
//     }
//     catch (err) {
//         dataR.msg = err.message;
//     }

//     //trả về client
//     res.json(dataR)
// }

