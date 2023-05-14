const myModel=require('../models/product.model');
const fs=require('fs');

exports.getproducts =async(req,res,next)=>{
    let dieu_kien =null;
    let list_cat=await myModel.categoryModel.find();
    let objCat = await myModel.categoryModel.findById(  req.params.idcat  );
    console.log(objCat);
    if(typeof(req.query.id_cat)!='undefined'){
        let id_cat =req.query.id_cat;
        dieu_kien={id_cat:id_cat};

    }
    

    var list=await myModel.productModel.find(dieu_kien).populate('id_cat');
    console.log(list);
    res.render( 'products/products',{list:list,list_cat:list_cat},)

}
exports.addproduct =async (req,res,next)=>{
    var url_img='';
    
    let list_cat=await myModel.categoryModel.find();

    if(req.method =='POST'){
        // xử lý ghi CSDL ở đây
        // kiểm tra hợp lệ dữ liệu ở chỗ này.


        // tạo đối tượng model 
        await fs.promises.rename(req.file.path,'./public/uploads/'+req.file.originalname)
        url_img='/uploads/'+req.file.originalname;
        console.log("upload thành công"+url_img);
        let objProduct = new myModel.productModel();
        objProduct.image =  url_img;
        objProduct.name = req.body.name;
        objProduct.description=req.body.description;
        objProduct.price=req.body.price;
        objProduct.id_cat = req.body.category;
        
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
    res.render( 'products/addproduct',{list_cat:list_cat,url_img:url_img},)
    
}
exports.editproduct = async (req,res,next)=>{
    let msg = ''; // chứa câu thông báo
    // load dữ liệu cũ để hiển thị
    var url_img='';
    let list_cat=await myModel.categoryModel.find();
    let objProduct = await myModel.productModel.findById(  req.params.idproduct  );
    console.log( objProduct);
    if(req.method =='POST'){
        await fs.promises.rename(req.file.path,'./public/uploads/'+req.file.originalname)
        url_img='/uploads/'+req.file.originalname;
        
        console.log("upload thành công"+url_img);
 
        let objProduct = new myModel.productModel();

         objProduct.image =  url_img;
        objProduct.name = req.body.name;
        objProduct.description=req.body.description;
        objProduct.price=req.body.price;
        objProduct.id_cat = req.body.category;
        objProduct._id=req.params.idproduct;
        try{
             
            // update dữ liệu
            // await myModel.spModel.updateOne( {_id:  req.params.idsp},   objSP );
             await myModel.productModel.findByIdAndUpdate({_id:req.params.idproduct},objProduct);
             res.redirect('/product');
            console.log("Đã ghi thành công");
            msg = 'Đã ghi thành công';
        }catch(err){
            console.log(err);
            msg ='Lỗi '+ err.message;

        }
 
    }

    res.render('products/editproduct', 
            {msg:msg, objProduct: objProduct,list_cat:list_cat})

}
exports.detailproduct = async (req,res,next)=>{
    let msg = ''; // chứa câu thông báo
    // load dữ liệu cũ để hiển thị

    let list_cat=await myModel.categoryModel.find();
    let objProduct = await myModel.productModel.findById(req.params.idproduct).populate('id_cat');
    console.log( objProduct);
       
 

    res.render('products/productdetails', 
            {msg:msg, objProduct:objProduct,list_cat:list_cat})

}
exports.deleteproduct = async (req,res,next)=>{
    let msg = ''; // chứa câu thông báo
    // load dữ liệu cũ để hiển thị
    let objProduct = await myModel.productModel.findById(  req.params.idproduct  );
    console.log( objProduct);
        
        try{
             
            // update dữ liệu
            // await myModel.spModel.updateOne( {_id:  req.params.idsp},   objSP );
             await myModel.productModel.findByIdAndDelete({_id:req.params.idproduct});
             res.redirect('/product');

            console.log("Đã xóa thành công");
            msg = 'Đã ghi thành công';
        }catch(err){
            console.log(err);
            msg ='Lỗi '+ err.message;

        }
 

    res.render('products/products', 
            {msg:msg})

}
exports.sortproductname = async(req,res,next)=>{
    //Hiển thị danh sach san pham
    let list_cat=await myModel.categoryModel.find();
    //kiểm tra tồn tại tham số
    let dieu_kien =null;
    if(typeof(req.query.name)!='undefined'){
        let name =req.query.name;
        dieu_kien={name:name};
    }
    

    //var list=await myModel.spModel.find(dieu_kien).sort({name:1});
    //cair tieens lay them the loai
    var list=await myModel.productModel.find().populate('id_cat').sort({name:1});
    console.log(list);

    res.render('products/products',{list:list,list_cat:list_cat})
}
exports.sortproductprice = async(req,res,next)=>{
    //Hiển thị danh sach san pham
    let list_cat=await myModel.categoryModel.find();
    //kiểm tra tồn tại tham số
    let dieu_kien =null;
    if(typeof(req.query.price)!='undefined'){
        let price =req.query.price;
        dieu_kien={price:price};
    }
    

    //var list=await myModel.spModel.find(dieu_kien).sort({name:1});
    //cair tieens lay them the loai
    var list=await myModel.productModel.find().populate('id_cat').sort({price:1});
    console.log(list);

    res.render('products/products',{list:list,list_cat:list_cat})
}
exports.addCat = async(req,res,next)=>{
        let msg = ''; // ghi câu thông báo
    
        if(req.method =='POST'){
            // xử lý ghi CSDL ở đây
            // kiểm tra hợp lệ dữ liệu ở chỗ này.
    
    
            // tạo đối tượng model 
            let objCat = new myModel.categoryModel();
            objCat.name = req.body.name;
            
            try{
                let new_cat = await objCat.save();
                
                console.log(new_cat);
    
                console.log("Đã ghi thành công");
                msg = 'Đã thêm thành công';
            }catch(err){
                console.log(err);
                msg ='Lỗi '+ error.message;
    
            }
     
        }
        res.render( 'products/addcategory',{TieuDe:"Add User"},)
}
exports.listcat = async(req,res,next)=>{
    //Hiển thị danh sach san pham
    
    //kiểm tra tồn tại tham s
    

    //var list=await myModel.spModel.find(dieu_kien).sort({name:1});
    //cair tieens lay them the loai
    var list=await myModel.categoryModel.find();
    console.log(list);

    res.render('products/category',{list:list})
}

exports.deleteCat = async (req,res,next)=>{
    let msg = ''; // chứa câu thông báo
    // load dữ liệu cũ để hiển thị
    let objCat = await myModel.categoryModel.findById(  req.params.idcat  );
    console.log( objCat);
        
        try{
             
            // update dữ liệu
            // await myModel.spModel.updateOne( {_id:  req.params.idsp},   objSP );
             await myModel.categoryModel.findByIdAndDelete({_id:req.params.idcat});
             res.redirect('/product/category');

            console.log("Đã xóa thành công");
            msg = 'Đã ghi thành công';
        }catch(err){
            console.log(err);
            msg ='Lỗi '+ err.message;

        }
 

    res.render('products/category', 
            {msg:msg})

}
exports.editcat = async (req,res,next)=>{
    let msg = ''; // chứa câu thông báo
    // load dữ liệu cũ để hiển thị
    let objCat = await myModel.categoryModel.findById(  req.params.idcat  );
    console.log( objCat);
    if(req.method =='POST'){
 
        let objCat = new myModel.categoryModel();
        objCat.name = req.body.name;
        objCat._id = req.params.idcat;
        try{
             
            // update dữ liệu
            // await myModel.spModel.updateOne( {_id:  req.params.idsp},   objSP );
             await myModel.categoryModel.findByIdAndUpdate({_id:req.params.idcat},objCat);
             res.redirect('/product/category');
            console.log("Đã ghi thành công");
            msg = 'Đã ghi thành công';
         
        }catch(err){
            console.log(err);
            msg ='Lỗi '+ err.message;

        }
 
    }

    res.render('products/editcategory', 
            {msg:msg, objCat: objCat})

}
exports.sortcatname = async(req,res,next)=>{
    //Hiển thị danh sach san pham
    
    //kiểm tra tồn tại tham số
    let dieu_kien =null;
    if(typeof(req.query.name)!='undefined'){
        let name =req.query.name;
        dieu_kien={name:name};
    }
    

    //var list=await myModel.spModel.find(dieu_kien).sort({name:1});
    //cair tieens lay them the loai
    var list=await myModel.categoryModel.find().sort({name:-1});
    console.log(list);

    res.render('products/category',{list:list})
}