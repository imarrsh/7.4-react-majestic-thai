var Backbone = require('backbone');
var React = require('react');
require('backbone-react-component');

// layout helpers
var Row = require('./layout/layouts.jsx').Row;

var MenuItem = React.createClass({
  mixins: [Backbone.React.Component.mixin],  
  handleAddItem: function(e){
    this.props.addItemToOrder(this.props.model);
  },
  render: function(){
    var model = this.props.model;
    return(
      <Row>
        <div className="col-xs-12">
          <div className="menu-item cf">
            <h3 className="item-title">{model.get('name')} <span className="item-price">{model.get('price')}</span></h3>
            <h5>{model.get('category')}</h5>
            <p className="item-description">
              {model.get('description')}
              <button onClick={this.handleAddItem} className="btn btn-add">Add</button>
            </p>
          </div>
        </div>
      </Row>
    );
  }
});

var MenuList = React.createClass({
  mixins: [Backbone.React.Component.mixin],    
  render: function(){
    var self = this;
    var collection = this.getCollection();
    var menuItems = collection.map(function(menuItem){
      return(
        <MenuItem
          key={menuItem.get('_id')}
          model={menuItem}
          addItemToOrder={self.props.addItemToOrder}
        />
      );
    });
    return (
      <div className="col-md-8">
        <div className="food-menu foreground">

          <div className="row">
            <div className="col-xs-12">
              <h1>Our Menu</h1>
            </div>
          </div>

          {menuItems}

        </div>
      </div>
    );
  }
});

module.exports = {
  MenuItem: MenuItem,
  MenuList: MenuList
};
