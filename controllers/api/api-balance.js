const MyModel = require('../../models/model')

exports.listbalance = async (req, res, next) => {
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
        list = await MyModel.balanceModel.find(dieu_kien).populate("id_user");
        dataR.data = list;
    }
    catch (err) {
        dataR.msg = err.message;
    }

    //trả về client
    res.json(dataR)
}
exports.addBalance =async (req, res, next) => {
    let dataR = {
        status: 1,
        msg: "ok"
    }
    if(req.method =='POST'){
        // xử lý ghi CSDL ở đây
        // kiểm tra hợp lệ dữ liệu ở chỗ này.


        // tạo đối tượng model 
        let objBalance = new MyModel.balanceModel();
        objBalance.id_user = req.body.id_user;
        objBalance.balance = req.body.balance;
      
        try{
            let dataR = await objBalance.save();
            
            console.log(dataR);

            console.log("Đã ghi thành công");
           
        }catch(err){
            console.log(err);
            dataR.msg = err.message;
        }
 
    }

    //code xử lý add


    //trả về client
    res.json(dataR)

}
exports.updateBalance =async (req, res, next) => {
    let dataR = {
        status: 1,
        msg: "ok"
    }
    if(req.method =='PUT'){
        // xử lý ghi CSDL ở đây
        // kiểm tra hợp lệ dữ liệu ở chỗ này.
        // tạo đối tượng model 
        let objBalance = new MyModel.balanceModel();
        objBalance.id_user = req.body.id_user;
        objBalance.balance = req.body.balance;
        objBalance._id = req.params.idbalance;
        try{
            await MyModel.balanceModel.findByIdAndUpdate({_id:req.params.idbalance},objBalance);
            let dataR = await objBalance.save();
            console.log(dataR);

            console.log("Đã ghi thành công");
           
        }catch(err){
            console.log(err);
            dataR.msg = err.message;
        }
 
    }

    //code xử lý add


    //trả về client
    res.json(dataR)

}