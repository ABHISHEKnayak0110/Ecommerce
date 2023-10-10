const express = require("express");
const router = express.Router();
const {getAllItems ,addToCart, getCartItems ,getCartItemsById ,deleteCartItem} = require("../controllers/cartControllers")

router.route(`/allItems`).get(getAllItems);
router.route(`/addToCart`).post(addToCart);
router.route(`/allCartItem`).get(getCartItems);
router.route(`/cartItem/:id`).get(getCartItemsById);
router.route(`/deleteItem`).delete(deleteCartItem);





module.exports = router