const asyncHandler = require('express-async-handler');
const { getItems } = require('../data/items');
const { addItemToCart ,getCartData, increaseOrder, getOrderNumber} = require('../data/cart');

// Generate a random discount code
function generateDiscountCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

//@desc  for Checkout items of Cart
//@route POST /api/checkout
//@Acess public
const checkOut =  asyncHandler(async(req, res) => {
    const CartsData = getCartData() // get Cart data
    const items = getItems() // get all Items 
    const OrderNumber = getOrderNumber() // get Order Number
 
    const nthOrderDiscount = 3 // After every third order 4 order will get discount
    const {userId }= req.body
    const cart = CartsData[userId] || [];
  
    // Calculate total price
    let totalPrice = 0;
    cart.forEach((cartItem) => {
      const item = items.find((i) => i.id === cartItem.itemId);
      totalPrice += item.price * cartItem.quantity;
    });
  
    // Check for discount
    let discount = 0;
    if(OrderNumber > 0 && OrderNumber % nthOrderDiscount === 0) {
      const discountCode = generateDiscountCode();
      discount = 0.1 * totalPrice;
      res.status(200).json({ totalPrice, discount, discountCode });
    } else {
      res.status(200).json({ totalPrice, discount });
    }
  
    // Clear the user's cart
    addItemToCart(userId , [])
    increaseOrder()

});

module.exports = {
    checkOut
};