 let item = [
    { id: 1, name: 'Bottle', price: 10, stock: 100 },
    { id: 2, name: 'Chair', price: 20, stock: 50 },
]
// Export a function to add a new item to the items array
  exports.updateItem =  (itemId , value) => {
    item =  item.map(data => {
        if(data.id === itemId){
            data.stock = (data.stock - value) >=0 ? data.stock - value : 0
        }
        return data
    })
  }
  
  // Export the items array for reading
  exports.getItems =  () => {
    return item;
  }