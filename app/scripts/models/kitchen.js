// scripts/models/kitchen

var Backbone = require('backbone');

// the order model itself
var OrderModel = Backbone.Model.extend({
  defaults: function(){
    return {
      name: '',
      method: 'pickup',
      invoice: 0
    };
  },
  idAttribute: '_id'

});

// all the orders
var OrderCollection = Backbone.Collection.extend({
  model: OrderModel,
  url: 'https://tiny-lasagna-server.herokuapp.com/collections/mt-thai-kitchen'
});

module.exports = {
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
