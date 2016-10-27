// scripts/models/menu

var Backbone = require('backbone');

var MenuItem = Backbone.Router.extend({

});

var MenuCollection = Backbone.Router.extend({
  model: MenuItem,
  url: 'https://tiny-lasagna-server.herokuapp.com/collections/mt-thai-menu'
});

module.exports = {
  MenuItem: MenuItem,
  MenuCollection: MenuCollection
};

// Sample menu item:
// {
//  "category": "appetizer/salad/soup/dinner/lunch/kids",
//  "name": "Item/Dish Name",
//  "description": "description of item or dish"
//  "price": 8.99
// }