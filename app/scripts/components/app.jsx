var Backbone = require('backbone');
var React = require('react');
require('backbone-react-component');

// menu config
var MenuCollection = require('../models/menu').MenuCollection;
// track order items
var ItemToOrder = require('../models/kitchen').ItemToOrder;
var ItemsToOrderCollection = require('../models/kitchen').ItemsToOrderCollection;
// manage orders 
var OrderModel = require('../models/kitchen').OrderModel;
var OrderCollection = require('../models/kitchen').OrderCollection;
// layout components
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


// order subtotal, tax and total
var OrderTicketPricing = React.createClass({
  render: function(){
    // order subtotal, tax and total
    var orderTotals = this.props.orderItems.orderTotals();
    // console.log(orderTotals);
    return (
      <Row>

        <div className="col-xs-12">
          <div className="order-totals">

            <h5 className="order-subtotal">
              Subtotal 
              <span className="cost">${orderTotals.subtotal}</span>
            </h5>
            <h5 className="order-tax">
              Tax 
              <span className="cost">${orderTotals.calculatedTax}</span>
            </h5>
            <h4 className="order-total">
              Total 
              <span className="cost">${orderTotals.finalTotal}</span>
            </h4>
            
          </div>
        </div>
        
      </Row>
    );
  }
});

// order listing
var OrderTicketListing = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  getInitialState: function(){
    return {
      listing: 'You have no items yet.'
    }
  },
  render: function(){
    var self = this;
    var orderItems = this.props.orderItems.length ? this.props.orderItems.map(function(item){
      return (
        <div key={item.get('id') || item.cid} className="order-item">
          <h4 className="order-item-name">{item.get('name')} <small>{item.get('price')}</small></h4>
        </div>
      );
    }) : <h4 className="order-item-name">{this.state.listing}</h4>;

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
      orderName: '',
      orderMethod: 'pickup'
    }
  },
  handleNameChange: function(e){
    this.setState({orderName: e.target.value});
  },
  handleOrderSubmit: function(e){
    e.preventDefault();

    var ticket = {
      name: this.state.orderName,
      method: this.state.orderMethod
    };
    this.props.submitOrder(ticket);
  },
  handleMethodChange: function(e){
    // console.log('method changed', e.target.value);
    this.setState({orderMethod: e.target.value});
  },
  render: function(){
    return(
      <div className="col-md-4">
        <div className="order-ticket foreground">

          <form action="" id="ticket-form" onSubmit={this.handleOrderSubmit}>
            
            <div className="row">
              <div className="col-xs-12">
                <h1>Your Order</h1>
              </div>
            </div>
            {/* Name input */}
            <div className="row">
              <div className="col-xs-12">
                <input type="text" 
                  onChange={this.handleNameChange} 
                  value={this.state.orderName} 
                  className="form-control" 
                  placeholder="Your name, please" 
                  required 
                />
              </div>
            </div>
            {/*  delivery or takeout? */}
            <div className="row">
              <div className="col-xs-12">
                <div className="order-method">
                  <label htmlFor="pickup" className="radio-inline">
                    <input id="pickup" 
                      onChange={this.handleMethodChange} 
                      defaultChecked={true} 
                      type="radio" name="method" value="pickup" className="" 
                    />
                    Pick-up
                  </label>
                  <label htmlFor="delivery" className="radio-inline">
                    <input id="delivery" 
                      onChange={this.handleMethodChange} 
                      type="radio" name="method" value="delivery" className="" 
                    />
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
            <OrderTicketPricing orderItems={this.props.orderItems}/>

            {/* order submit */}
            <div className="row">
              <div className="col-xs-12">
                <div className="order-controls">
                  <input type="reset"
                    className="btn btn-default order-cancel"
                    value="Cancel"
                  />
                  <input type="submit" 
                    className="btn btn-success order-submit" 
                    value="Place Order" 
                  />
                </div>

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
    // instantiate the order collection
    var orderCollection = new OrderCollection();

    return {
      collection: menu,
      orderCollection: orderCollection
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
  submitOrder: function(ticket){
    // submit order to OrderCollection
    var order = new OrderModel();

    order.set({
      'name': ticket.name,
      'method': ticket.method,
      'items': this.state.customerOrder.toJSON()
    });
    this.props.orderCollection.create(order);
  },
  render: function(){
    return (
      <AppWrapper>

        <section className="order-menu">
          <div className="container">

            <RestuarantHeading />

            <Row>
              <MenuList addItemToOrder={this.addItemToOrder}/>
              <OrderTicket 
                orderItems={this.state.customerOrder} 
                submitOrder={this.submitOrder}
              />
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
