const MyModel = require('../../models/category.model')

exports.listcatexpense = async (req, res, next) => {
    let dataR = {
        status: 1,
        msg: "ok"
    }



    //code xử lý lấy danh sách
    let list = []
    try {
        list = await MyModel.expenseModel.find();
        dataR.data = list;
    }
    catch (err) {
        dataR.msg = err.message;
    }

    //trả về client
    res.json(dataR)
}
exports.listcatreceive = async (req, res, next) => {
    let dataR = {
        status: 1,
        msg: "ok"
    }



    //code xử lý lấy danh sách
    let list = []
    try {
        list = await MyModel.receiveModel.find();
        dataR.data = list;
    }
    catch (err) {
        dataR.msg = err.message;
    }

    //trả về client
    res.json(dataR)
}

