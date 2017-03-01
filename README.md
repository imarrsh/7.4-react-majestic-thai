# Majestic Thai
#### (7.4-react-majestic-thai)

This project is from the end of week 7 at [The Iron Yard Greenville](https://theironyard.com). This comes after a couple weeks of learning and exercising concepts with _Backbone.js_ and being introduced to _React.js_. This project utilizes a simple back-end that serves a restaurant menu and facilitates a basic user ordering process and a simple kitchen view for completing orders.

The process for development was a little more open in terms of the visual design. A requirement was to create a few sketches and mock-ups of the end goal, and I chose [Adobe XD](http://www.adobe.com/products/experience-design.html) to design a rough layout in.

*Update:* Since this is a smaller project and I wanted to get a taste for React Router, I swapped out Backbone's router for the React Router in this project. It did not take much as there are only 2 views for this app, but I wanted to experiement a bit. 

#### User View
The app data is driven by Backbone's `Model` and `Collection` objects that handle the JSON coming down from the back-end to feed the menu and kitchen views that hands the data off to React components to display on-screen. The cart's state is updated when items are added and ships the users order data off to a second endpoint when the form submission is triggered.

#### Kitchen View
The kitchen view is a super simple interface that provides the restaurant staff a way to 'complete' the orders as they are finished. This sends a `DELETE` request to the server and removes the record completely.

## Tooling and Dependencies
+ [React](https://facebook.github.io/react/)
+ [React Router <sup>NEW!</sup>](https://github.com/ReactTraining/react-router)
+ [Backbone](http://backbonejs.org/)
+ [npm](https://www.npmjs.com/)
    - [bootstrap-sass](https://github.com/twbs/bootstrap-sass)
    - [jQuery](https://jquery.com/)
    - [Underscore](http://underscorejs.org/)
    - [Backbone.React.Component](https://github.com/magalhas/backbone-react-component)
+ [Bootstrap](http://getbootstrap.com/)
+ [Sass](http://sass-lang.com/)

##
 [See a live demo](https://imarrsh.github.io/7.4-react-majestic-thai/)