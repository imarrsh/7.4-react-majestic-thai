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
  model: ItemToOrder,
  initialize: function(){},
  orderTotals: function(){
    var tax = 0.08,
        calcSubtotal = this.models
          .map(function(model){
            return model.get('price');
          })
          .reduce(function(sum, val){
            return sum + val;
          }, 0),
        calculatedTax = calcSubtotal * tax;

    // console.log(itemsTotal);
    return {
      subtotal: calcSubtotal.toFixed(2),
      calculatedTax: calculatedTax.toFixed(2),
      finalTotal: (calcSubtotal + calculatedTax).toFixed(2)
    };
  }

});


// the order model itself
var OrderModel = Backbone.Model.extend({
  initialize: function(){
    // this.items = new ItemsToOrderCollection();
    // this.items.on('add remove reset', this.updateOrder, this);
  },
  defaults: function(){
    return {
      name: '',
      method: 'pickup',
    };
  },
  // updateOrder: function() {
  //   // this.set("items", this.tags.pluck("item"));
  // },
  idAttribute: '_id'

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
