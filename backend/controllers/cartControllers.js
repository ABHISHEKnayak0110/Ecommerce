const asyncHandler = require('express-async-handler');
const { getItems,updateItem } = require('../data/items');
const { getCartData ,addItemToCart  } = require('../data/cart');


//@desc Get all Items
//@route GET /api/allItem
//@Acess public
const getAllItems =  asyncHandler(async(req, res) => {
  const data = getItems() // get All Items 
res.status(200).json({data : data});
});

//@desc Item to Cart
//@route POST /api/addToCart
//@Acess public
const addToCart = asyncHandler(async(req, res) => {
  const { itemId, quantity , userId  , name} = req.body;
  const allItems = getItems() // get All Items 
  const CartData = getCartData()  // get All Cart Data
  const item = allItems.find((i) => i.id === itemId);

  if (!item) {
     res.status(404)
     throw new Error("Item Not Found ")
  }

  if (item.stock < quantity) {
     res.status(400)
      throw new Error(`Insufficient stock , Available stock is ${item.stock}`)
  }

  

  if (!CartData[userId]) {
    CartData[userId] = [];
  }
    const dataToAdd = CartData[userId] || []
    let itemAlreadyinCart = false
    const newItemArray = dataToAdd?.map(item => {
      if(item.itemId === itemId){
        item.quantity = Number(item.quantity) + quantity
        itemAlreadyinCart = true
        return item
      }
      return item
    })
    updateItem(itemId , quantity)
    !itemAlreadyinCart && dataToAdd.push({itemId , quantity, name})
    addItemToCart(userId , dataToAdd )
  res.status(200).json({
    message :  'Item added to cart'
  });

});

//@desc Get all Cart Items
//@route GET /api/allCartItem
//@Acess public
const getCartItems = asyncHandler(async(req, res) => {
  const data = getCartData()
res.status(200).json({data : data});
});

//@desc Get item from  Cart by id
//@route GET /api/cartItem/:id
//@Acess public
const getCartItemsById = asyncHandler(async(req, res) => {
  const {id} =  req.params
  const cartItem  = getCartData()
  const  data = cartItem[id]
  if(!data){
    res.status(404)
    throw new Error("Item Not Found ")
  }
res.status(200).json({data : data});
});

//@desc delete item from  Cart by id
//@route DELETE /api/deleteItem
//@Acess public
const deleteCartItem = asyncHandler(async(req, res) => {
  const {userId , id} =  req.body
  const cartItem  = getCartData()
  const  data = cartItem[userId]
  if(!data){
    res.status(404)
    throw new Error("Item Not Found ")
  }
  const newData = data.filter(item => item.id !== id)
  addItemToCart(userId , newData)
res.status(200).json({data : data});
});

module.exports = {
    getAllItems,
    addToCart,
    getCartItems,
   getCartItemsById,
   deleteCartItem
};
