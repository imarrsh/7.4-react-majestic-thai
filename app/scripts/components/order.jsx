var Backbone = require('backbone');
var React = require('react');
require('backbone-react-component');

// layout helpers
var Row = require('./layout/layouts.jsx').Row;

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

module.exports = {
  OrderTicketPricing: OrderTicketPricing,
  OrderTicketListing: OrderTicketListing,
  OrderTicket: OrderTicket
};
