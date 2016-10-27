var $ = require('jquery');
var Backbone = require('backbone');
require('./router');

$(function(){
  // backbone history: router
  Backbone.history.start();
}());
