// scripts/models/kitchen

var Backbone = require('backbone');

var Order = Backbone.Model.extend({
  defaults: {
    name: '',
    method: "Pick-up",
    items : []
  },
  idAttribute: '_id'
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
  model: Order,
  url: 'https://tiny-lasagna-server.herokuapp.com/collections/mt-thai-kitchen'
});

module.exports = {
  MenuItem: MenuItem,
  MenuCollection: MenuCollection
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
