// scripts/models/kitchen

var Backbone = require('backbone');

// keep track of items added to the order
var ItemToOrder = Backbone.Model.extend({
  defaults: {
    name: '',
    price: 0,
    quantity: 1
  },
  idAttribute: 'id'
});

var ItemsToOrderCollection = Backbone.Collection.extend({
  model: ItemToOrder
});


// the order model itself
var OrderModel = Backbone.Model.extend({
  initialize: function(){
    this.items = new ItemsToOrderCollection();
    // this.items.on('add remove reset', this.updateOrder, this);
  },
  defaults: function(){
    return {
      name: '',
      method: 'Pick-up',
    };
  },
  updateOrder: function() {
    // this.set("items", this.tags.pluck("item"));
  },
  idAttribute: '_id',
  // orderTotal: function(){
  //   var tax = 0.8;
  //   var itemsTotal = this.items.map(function(item){
  //     return item.price;
  //   }).reduce(function(sum, val){
  //     return sum + val;
  //   }, 0);

  //   return itemsTotal * tax;
  // }


});

var OrderCollection = Backbone.Collection.extend({
  model: OrderModel,
  url: 'https://tiny-lasagna-server.herokuapp.com/collections/mt-thai-kitchen'
});

module.exports = {
  ItemToOrder: ItemToOrder,
  ItemsToOrderCollection: ItemsToOrderCollection,
  OrderModel: OrderModel,
  OrderCollection: OrderCollection
};

// Sample Order Output:

// [
//   {
//     "_id": "132b413454bj123",
//     "name": "orderee",
//     "method": "Pick-up",
//     "items" : [
//       {
//         "name": "Pad Thai",
//         "quantity": 1
//       },
//       {
//         "name": "Orange Chicken",
//         "quantity": 1
//       },
//       {
//         "name": "Thai Tea",
//         "quantity": 2
//       }
//     ]
//   }
// ]
