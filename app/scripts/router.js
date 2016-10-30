var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

var AppContainer = require('./components/app.jsx').AppContainer;

var MenuCollection = require('./models/menu').MenuCollection;

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'kitchen/': 'kicthen'
  },
  initialize: function(){

  },
  index: function(){

    ReactDOM.render(
      React.createElement(AppContainer, {router: this}),
      document.getElementById('app')
    );
  }
});

var router = new AppRouter();

module.exports = {
  router: router
};
