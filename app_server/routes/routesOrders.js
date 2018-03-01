const express = require ('express');
const router = express.Router();
const orderControllers = require('../controllers/orderControllers');

router.get('/orders', orderControllers.getOrders);
router.post('/orders', orderControllers.postOrders);
router.put('/orders', orderControllers.putOrders);
router.delete('/orders', orderControllers.deleteOrders);
router.get('/orders/:idOfOrder', orderControllers.getOneOrder);


module.exports = router;