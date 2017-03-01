// var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

var hashHistory = require('react-router').hashHistory;
var Router = require('react-router').Router;
var Redirect = require('react-router').Redirect;
var IndexRoute = require('react-router').IndexRoute;
var Route = require('react-router').Route;
var Link = require('react-router').Link;

var AppContainer = require('./components/app.jsx').AppContainer;
var KitchenView = require('./components/kitchenApp.jsx').KitchenView;

var MenuCollection = require('./models/menu').MenuCollection;

module.exports = ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/">
      <IndexRoute component={AppContainer} />
      <Route path="kitchen" component={KitchenView} />
    </Route>
  </Router>
), document.getElementById('app'));

// var AppRouter = Backbone.Router.extend({
//   routes: {
//     '': 'index',
//     'kitchen/': 'kicthen'
//   },
//   initialize: function(){

//   },
//   index: function(){

//     ReactDOM.render(
//       React.createElement(AppContainer, {router: this}),
//       document.getElementById('app')
//     );
//   },
//   kicthen: function(){
//     ReactDOM.render(
//       React.createElement(KitchenView, {router: this}),
//       document.getElementById('app')
//     );
//   }
// });

// var router = new AppRouter();

// module.exports = {
//   router: router
// };
