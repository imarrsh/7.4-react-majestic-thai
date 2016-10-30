// scripts/models/menu

var Backbone = require('backbone');

var MenuItem = Backbone.Model.extend({
  idAttribute: '_id',
  itemSelected: function(){
    // only give back things pertinent for an order
    return {
      id: this.get('_id'),
      name: this.get('name'),
      price: this.get('price')
    };
  }
});

var MenuCollection = Backbone.Collection.extend({
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

// Sample Data Collection
// [
//   {
//   "category": "Beverages",
//   "name": "Thai Tea",
//   "description":"Classic Thai Tea",
//   "price": 3
//   },
//   {
//   "category": "Curry",
//   "name": "Yello Curry Chicken",
//   "description":"Mild yellow curry, containing rich flavors of curry powder, coconut milk, potatoes, onions and carrots with chicken.",
//   "price": 10.5
//   },
//   {
//   "category": "Noodles",
//   "name": "Pad Thai",
//   "description":"One of the most famous Thai rice noodles dish cooked with egg, bean spouts, tofu and sprinkled with ground peanut.",
//   "price": 10.5
//   },
//   {
//   "category": "Noodles",
//   "name": "Pad Thai",
//   "description":"Hot and spicy stir fried flat rice noodles with eggs, garlic, tomatoes, onions, mushrooms, bean sprouts, chilies, and basil.",
//   "price": 10.5
//   },
//   {
//   "category": "Appetizer",
//   "name": "Edamame",
//   "description":"Steamed young soy bean.",
//   "price": 4.95
//   },
//   {
//   "category": "Appetizer",
//   "name": "Chicken Gyoza (6 Pcs.)",
//   "description":"Steamed dumplings, stuffed with vegetables, chicken and seasoning. They are then quickly pan fried and served with our house special soy-sauce.",
//   "price": 6.95
//   },
//   {
//   "category": "Soup",
//   "name": "Tom Kha Soup Bowl",
//   "description":"Coconut soup with your choice of chicken, tofu, vegetable, or shrimp for an additional charge. Served with mushrooms, onions, lime leaves, galangal and lime juice. Seafood available for Pot for $4.00",
//   "price": 11.95
//   },
//   {
//   "category": "A la carte",
//   "name": "Spicy Eggplant",
//   "description":"Stir fried eggplant in black bean sauce, chilies and basil leaves",
//   "price": 10.5
//   },
//   {
//   "category": "Fried Rice",
//   "name": "Spicy Fried Rice",
//   "description":"Hot and spicy fried rice with garlic, chili, onions, bell peppers, and basil leaves.",
//   "price": 9.95
//   },
//   {
//   "category": "Noodle Soups",
//   "name": "Thai Beef Noodle Soup",
//   "description":"Rice noodles with beef stew, meat ball, sprouts, green onion in brown soup.",
//   "price": 9.95
//   },
// ]


// /collections/thai-returant/menu/appetizers/389743

// [

//   {
//     _id : 88957234b75234b78bj
//     menu: [
//       {
//         category: appetizers
//         menu-items: [
//           {item}
//           {item}
//           {item}
//           {item}
//         ]
//       },
//       {
//         category: noodles
//         menu-items: [
//           {item}
//           {item}
//           {item}
//           {item}
//         ]
//       }
//     ]
//   }
// ]

