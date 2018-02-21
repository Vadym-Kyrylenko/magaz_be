const express = require ('express');
const router = express.Router();
const productControllers = require('../controllers/productControllers');

router.get('/products', productControllers.getProducts);
router.post('/products', productControllers.postProducts);
router.put('/products', productControllers.putProducts);
router.delete('/products', productControllers.deleteProducts);
router.get('/products/:idOfProduct', productControllers.getOneProduct);


module.exports = router;