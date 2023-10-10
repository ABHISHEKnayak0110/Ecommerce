 const Cart = {}
// Export a function to add a new item to the Cart 
exports.addItemToCart = (key , data ) =>  {
    Cart[key] = data
  }
  
  // Export get Cart value
  exports.getCartData = () => {
    return Cart;
  }
  //delete key from Cart
  exports.deleteCartItem =(key) => {
     delete Cart[key]
  }

// for order data
  let Order = 0
exports.increaseOrder = () => {
     Order = Order + 1
  }
  exports.getOrderNumber  = () =>{
    return Order
  }