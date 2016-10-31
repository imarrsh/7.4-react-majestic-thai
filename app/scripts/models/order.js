// scripts/models/order

var Backbone = require('backbone');

// what is an order item?
var ItemToOrder = Backbone.Model.extend({
  defaults: {
    name: '',
    price: 0,
    quantity: 1
  },
  idAttribute: 'id'
});

// keep track of items added to the order and provide some math
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

module.exports = {
  ItemToOrder: ItemToOrder,
  ItemsToOrderCollection: ItemsToOrderCollection
}