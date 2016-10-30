var Backbone = require('backbone');
var React = require('react');
require('backbone-react-component');

var MenuCollection = require('../models/menu').MenuCollection;

var ItemToOrder = require('../models/kitchen').ItemToOrder;
var ItemsToOrderCollection = require('../models/kitchen').ItemsToOrderCollection;
var OrderModel = require('../models/kitchen').OrderModel;

var AppWrapper = require('./layout/app-wrapper.jsx').AppWrapper;
var Row = require('./layout/app-wrapper.jsx').Row;

// plain heading object
var RestuarantHeading = function(props){
  return (
    <Row>
      <div className="col-xs-12">
        <div className="main-heading">
          <h1>Majestic Thai</h1>
        </div>
      </div>
    </Row>
  );
};

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



// order listing
// <input type="text" name="order-item" value="Pad Thai" disabled />
// <input type="text" name="order-item-quantity" value="1" disabled />
var OrderTicketListing = React.createClass({
  mixins: [Backbone.React.Component.mixin],  
  render: function(){
    console.log(this.props.orderItems);
    var orderItems = this.props.orderItems.map(function(item){
      return (
        <div key={item.get('id')} className="order-item">
          <h4 className="order-item-name">{item.get('name')} <small>{item.get('price')}</small></h4>
        </div>
      );
    });

    return (
      <Row>
        <div className="col-xs-12">
          <div className="order-item-list">

            {orderItems}                         

          </div>
        </div>
      </Row>
    );
  }
});

var OrderTicket = React.createClass({
  mixins: [Backbone.React.Component.mixin],    
  getInitialState: function(){
    return {
      orderName: ''
    }
  },
  handleNameChange: function(e){
    this.setState({orderName: e.target.value});
  },
  render: function(){
    return(
      <div className="col-md-4">
        <div className="order-ticket foreground">

          <form action="" id="ticket-form">
            
            <div className="row">
              <div className="col-xs-12">
                <h1>Your Order</h1>
              </div>
            </div>
            {/* Name */}
            <div className="row">
              <div className="col-xs-12">
                <input type="text" onChange={this.handleNameChange} value={this.state.orderName} className="form-control" placeholder="Your name, please" required />
              </div>
            </div>
            {/*  delivery or takeout? */}
            <div className="row">
              <div className="col-xs-12">
                <div className="order-method">
                  <label htmlFor="pickup" className="radio-inline">
                    <input id="pickup" type="radio" name="method" value="pickup" className="" />
                    Pick-up
                  </label>
                  <label htmlFor="delivery" className="radio-inline">
                    <input id="delivery" type="radio" name="method" value="delivery" className="" />
                    Delivery
                  </label>
                </div>
              </div>
            </div>
            {/* order listing heading */}
            <div className="row">
              <div className="col-xs-12">
                <div className="ticket-heading">
                  <h4 className="items-label">Item</h4>
                  <h4 className="items-price">Price</h4>
                </div>
              </div>
            </div>

            {/* order listing */}
            <OrderTicketListing orderItems={this.props.orderItems} />

            {/* order subtotal, tax and total */}
            <div className="row">

              <div className="col-xs-12">
                <div className="order-totals">

                  <h5 className="order-subtotal">
                    Subtotal 
                    <span className="cost">$26.79</span>
                  </h5>
                  <h5 className="order-tax">
                    Tax 
                    <span className="cost">$2.43</span>
                  </h5>
                  <h4 className="order-total">
                    Total 
                    <span className="cost">$29.22</span>
                  </h4>
                  
                </div>
              </div>
              
            </div>
            {/* order submit */}
            <div className="row">
              <div className="col-xs-12">
                <input type="submit" className="btn btn-success order-submit" value="Place Order" />
              </div>
            </div>

          </form>

        </div>
      </div>
    );
  }
});

// ####################################
// parent container for all the things
// ####################################

var AppContainer = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  getDefaultProps: function(){
    var menu = new MenuCollection();
    menu.fetch();

    return {
      collection: menu
    }
  },
  getInitialState: function(){
    self = this;
  
    var customerOrder = new ItemsToOrderCollection();

    return {
      customerOrder : customerOrder
    }
  },
  addItemToOrder: function(menuItem){
    // we just need name,price & id of the model
    // console.log('addItemToOrder', menuItem.itemSelected());
    var newItem = menuItem.itemSelected();
    // not sure if this is good, updating state directly and then setting it
    this.state.customerOrder.add(newItem);
    this.setState({customerOrder: this.state.customerOrder});
  },
  submitOrder: function(){
    // submit order to OrderCollection
  },
  render: function(){
    return (
      <AppWrapper>

        <section className="order-menu">
          <div className="container">

            <RestuarantHeading />

            <Row>
              <MenuList menu={this.props.collection} addItemToOrder={this.addItemToOrder}/>
              <OrderTicket orderItems={this.state.customerOrder}/>
            </Row>

          </div>
        </section>

      </AppWrapper>
    );
  }
});

module.exports = {
  AppContainer: AppContainer
};
