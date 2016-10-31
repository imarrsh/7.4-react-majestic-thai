var Backbone = require('backbone');
var React = require('react');

var OrderModel = require('../models/kitchen').OrderModel;
var OrderCollection = require('../models/kitchen').OrderCollection;
      
var KitchenView = React.createClass({
  render: function(){
    return(
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            
          </div>
        </div>
      </div>
    )
  },
});
      
module.exports = {
  KitchenView: KitchenView
};
