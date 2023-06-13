var express = require('express');
var router = express.Router();
var apiU=require('../controllers/api/api-user');
var apiB=require('../controllers/api/api-budget');
var apiC=require('../controllers/api/api-cat');
var apiBalance = require('../controllers/api/api-balance')

/* GET home page. */

//get users
router.get('/users', apiU.listUsers);

//post users
router.post('/users', apiU.addUsers);
//update 

router.put('/users/:iduser', apiU.updateUsers);
//delete
router.delete('/users/:iduser', apiU.deleteUsers);
router.get('/balance',apiBalance.listbalance);
router.post('/balance',apiBalance.addBalance);
router.get('/balance/:idbalance',apiBalance.updateBalance);
router.put('/balance/:idbalance',apiBalance.updateBalance);


router.get('/expense_cat',apiC.listcat);
// router.get('/receive_cat',apiC.listcatreceive);
router.get('/record',apiB.listrecord);
router.post('/record',apiB.addrecord);
router.get('/category',apiC.listcat)
// router.get('/budgetreceive',apiB.listreceivebudget);

module.exports = router;