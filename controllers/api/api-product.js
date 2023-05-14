const MyModel = require('../../models/product.model')

exports.listProducts = async (req, res, next) => {
    let dataR = {
        status: 1,
        msg: "ok"
    }



    //code xử lý lấy danh sách
    let list = []
    try {
        list = await MyModel.productModel.find().populate("id_cat");
        dataR.data = list;
    }
    catch (err) {
        dataR.msg = err.message;
    }

    //trả về client
    res.json(dataR)
}
