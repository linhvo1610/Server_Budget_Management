const MyModel = require('../../models/product.model')

exports.listProducts = async (req, res, next) => {
    let dataR = {
        status: 1,
        msg: "ok"
    }



    //code xử lý lấy danh sách
    let list = []
    try {
        list = await MyModel.categoryModel.find();
        dataR.data = list;
    }
    catch (err) {
        dataR.msg = err.message;
    }

    //trả về client
    res.json(dataR)
}
