var $ = require('jquery');
var Backbone = require('backbone');
require('./router');

$(function(){
  // backbone history: router
  // TODO: replace with react router
  Backbone.history.start();
}());
