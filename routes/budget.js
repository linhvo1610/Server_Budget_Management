var express = require('express');
var router = express.Router();
var catcontroller =require('../controllers/category.controller');
var check_login = require('../middleware/check_login');
var budgetcontroller = require('../controllers/budget.controller');
var multer=require('multer');
var uploader=multer({dest:'./tmp'});
router.get('/list',check_login.request_login,budgetcontroller.getrecord);
router.get('/detail/:id_cat',check_login.request_login,budgetcontroller.detail);

router.get('/add',check_login.request_login,budgetcontroller.addrecord);
router.post('/add',check_login.request_login,budgetcontroller.addrecord);
router.get('/tim',check_login.request_login,budgetcontroller.sortuser);
// router.get('/addreceivebudget',check_login.request_login,budgetcontroller.addreceivebudget);
// router.post('/addreceivebudget',check_login.request_login,budgetcontroller.addreceivebudget);
module.exports = router;
