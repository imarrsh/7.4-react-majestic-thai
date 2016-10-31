var Backbone = require('backbone');
var React = require('react');
require('backbone-react-component');

// menu config
var MenuCollection = require('../models/menu').MenuCollection;
// track order items
var ItemToOrder = require('../models/order').ItemToOrder;
var ItemsToOrderCollection = require('../models/order').ItemsToOrderCollection;
// manage orders 
var OrderModel = require('../models/kitchen').OrderModel;
var OrderCollection = require('../models/kitchen').OrderCollection;
// layout components
var AppWrapper = require('./layout/layouts.jsx').AppWrapper;
var Row = require('./layout/layouts.jsx').Row;
// app components
var MenuItem = require('./menu.jsx').MenuItem;
var MenuList = require('./menu.jsx').MenuList;
var OrderTicketPricing = require('./order.jsx').OrderTicketPricing;
var OrderTicketListing = require('./order.jsx').OrderTicketListing;
var OrderTicket = require('./order.jsx').OrderTicket


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
