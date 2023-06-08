var express = require('express');
var router = express.Router();
var catcontroller =require('../controllers/category.controller');
var check_login = require('../middleware/check_login');
var budgetcontroller = require('../controllers/budget.controller');
var multer=require('multer');
var uploader=multer({dest:'./tmp'});


router.get('/addexpensecat',check_login.request_login,catcontroller.addexpenseCat)
router.post('/addexpensecat',check_login.request_login,uploader.single('image'),catcontroller.addexpenseCat);
router.get('/expensecat',check_login.request_login,catcontroller.listexpenseCat);
router.get('/expensecat/delete/:idcat',check_login.request_login,catcontroller.deleteexpenseCat);
router.get('/expensecat/update/:idcat',check_login.request_login,catcontroller.editexpenseCat);
router.post('/expensecat/update/:idcat',check_login.request_login,catcontroller.editexpenseCat);
// router.get('/details/:idproduct',check_login.request_login,catcontroller.detailproduct);
router.get('/expensecat/sortexpensecatname',check_login.request_login,catcontroller.sortexpenseCatname);
router.get('/addreceivecat',check_login.request_login,catcontroller.addreceiveCat)
router.post('/addreceivecat',check_login.request_login,uploader.single('image'),catcontroller.addreceiveCat);
router.get('/receivecat',check_login.request_login,catcontroller.listreceiveCat);
router.get('/receivecat/delete/:idcat',check_login.request_login,catcontroller.deletereceiveCat);
router.get('/receivecat/update/:idcat',check_login.request_login,catcontroller.editreceiveCat);
router.post('/receivecat/update/:idcat',check_login.request_login,catcontroller.editreceiveCat);
router.get('/receivecat/sortreceivecatname',check_login.request_login,catcontroller.sortreceivecatname);
module.exports = router;
