var express = require('express');
var router = express.Router();
var apiU=require('../controllers/api/api-user')
var apiP=require('../controllers/api/api-product')

/* GET home page. */

//get users
router.get('/users', apiU.listUsers);

//post users
router.post('/users', apiU.addUsers);
//update 
router.put('/users/:iduser', apiU.updateUsers);
//delete
router.delete('/users/:iduser', apiU.deleteUsers);

router.get('/product',apiP.listProducts)

module.exports = router;