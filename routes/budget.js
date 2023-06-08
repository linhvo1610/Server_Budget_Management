var express = require('express');
var router = express.Router();
var catcontroller =require('../controllers/category.controller');
var check_login = require('../middleware/check_login');
var budgetcontroller = require('../controllers/budget.controller');
var multer=require('multer');
var uploader=multer({dest:'./tmp'});
router.get('/addexpensebudget',check_login.request_login,budgetcontroller.addexpensebudget);
router.post('/addexpensebudget',check_login.request_login,budgetcontroller.addexpensebudget);
router.get('/addreceivebudget',check_login.request_login,budgetcontroller.addreceivebudget);
router.post('/addreceivebudget',check_login.request_login,budgetcontroller.addreceivebudget);
module.exports = router;
