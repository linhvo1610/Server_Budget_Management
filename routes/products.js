var express = require('express');
var router = express.Router();
var productcontroller =require('../controllers/products.controller');
var check_login = require('../middleware/check_login')
var multer=require('multer');
var uploader=multer({dest:'./tmp'});

/* GET users listing. */
router.get('/',check_login.request_login,productcontroller.getproducts);
router.get('/add',check_login.request_login,productcontroller.addproduct)
router.post('/add',check_login.request_login,uploader.single('image'),productcontroller.addproduct);
router.get('/update/:idproduct',check_login.request_login,productcontroller.editproduct);
router.post('/update/:idproduct',check_login.request_login,uploader.single('image'),productcontroller.editproduct);
router.get('/delete/:idproduct',check_login.request_login,productcontroller.deleteproduct);
router.get('/sortproductname',check_login.request_login,productcontroller.sortproductname);
router.get('/sortproductprice',check_login.request_login,productcontroller.sortproductprice);
router.get('/addcat',check_login.request_login,productcontroller.addCat)
router.post('/addcat',check_login.request_login,productcontroller.addCat);
router.get('/category',check_login.request_login,productcontroller.listcat);
router.get('/category/delete/:idcat',check_login.request_login,productcontroller.deleteCat);
router.get('/category/update/:idcat',check_login.request_login,productcontroller.editcat);
router.post('/category/update/:idcat',check_login.request_login,productcontroller.editcat);
router.get('/details/:idproduct',check_login.request_login,productcontroller.detailproduct);
router.get('/category/sortcatname',check_login.request_login,productcontroller.sortcatname);
module.exports = router;
