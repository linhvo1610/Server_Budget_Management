var express = require('express');
var router = express.Router();
var catcontroller =require('../controllers/category.controller');
var check_login = require('../middleware/check_login');
var budgetcontroller = require('../controllers/budget.controller');
var multer=require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './tmp');
    },
    filename: function name(req, file, cb) {
        cb(null, file.fieldname + "" + Date.now() + "" + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    
}).single('image');


router.get('/addexpensecat',check_login.request_login,catcontroller.addcategory)
router.post('/addexpensecat',check_login.request_login,catcontroller.addcategory);
router.get('/expensecat',check_login.request_login,catcontroller.listcategory);
router.get('/expensecat/delete/:idcat',check_login.request_login,catcontroller.deletecategory);
router.get('/expensecat/update/:idcat',check_login.request_login,catcontroller.editcategory);
router.post('/expensecat/update/:idcat',check_login.request_login,catcontroller.editcategory);
// router.get('/details/:idproduct',check_login.request_login,catcontroller.detailproduct);
// router.get('/expensecat/sortexpensecatname',check_login.request_login,catcontroller.sortexpenseCatname);
// router.get('/addreceivecat',check_login.request_login,catcontroller.addreceiveCat)
// router.post('/addreceivecat',check_login.request_login,upload,catcontroller.addreceiveCat);
// router.get('/receivecat',check_login.request_login,catcontroller.listreceiveCat);
// router.get('/receivecat/delete/:idcat',check_login.request_login,catcontroller.deletereceiveCat);
// router.get('/receivecat/update/:idcat',check_login.request_login,catcontroller.editreceiveCat);
// router.post('/receivecat/update/:idcat',check_login.request_login,upload,catcontroller.editreceiveCat);
// router.get('/receivecat/sortreceivecatname',check_login.request_login,catcontroller.sortreceivecatname);
module.exports = router;
