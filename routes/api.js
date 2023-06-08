var express = require('express');
var router = express.Router();
var apiU=require('../controllers/api/api-user');
var apiB=require('../controllers/api/api-budget');
var apiC=require('../controllers/api/api-cat');

/* GET home page. */

//get users
router.get('/users', apiU.listUsers);

//post users
router.post('/users', apiU.addUsers);
//update 
router.put('/users/:iduser', apiU.updateUsers);
//delete
router.delete('/users/:iduser', apiU.deleteUsers);


router.get('/expense_cat',apiC.listcatexpense);
router.get('/receive_cat',apiC.listcatreceive);
router.get('/budgetexpense',apiB.listexpensebudget);
router.get('/budgetreceive',apiB.listreceivebudget);

module.exports = router;