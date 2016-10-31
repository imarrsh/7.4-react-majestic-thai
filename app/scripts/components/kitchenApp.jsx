var Backbone = require('backbone');
var React = require('react');

var OrderCollection = require('../models/kitchen').OrderCollection;

var KitchenOrderListItem = React.createClass({
  handleClick: function(){
    this.props.completeOrder(this.props.model);
  },
  render: function(){
    var order = this.props.model;
    var orderItems = order.get('items').map(function(item){
      return(
        <li key={item.id} className="list-group-item">
          {item.name} <span className="badge">{item.quantity}</span>
        </li>
      );
    });
    return(
      <li className="list-group-item">
        <div className="row">
          <div className="col-xs-9">
            <div className="kitchen-order">
              <h2>{order.get('name')}</h2>
              <h3>{order.get('method')}</h3>
              <ul className="list-group">
                {orderItems}
              </ul>
            </div>
          </div>
          <div className="col-xs-3">
            <button className="btn btn-danger" 
              onClick={this.handleClick}>
                Complete
            </button>
          </div>          
        </div>
      </li>
    );
  }
});

var KitchenOrderList = React.createClass({
  render: function(){
    var self = this;
    var allOrders = this.props.orders.map(function(order){
      return(
        <KitchenOrderListItem 
          key={order.get('_id')}
          model={order}
          completeOrder={self.props.completeOrder}
        />
      )
    }); 
    return(
      <ul className="list-group">
        {allOrders}
      </ul>
    );
  }
});

var KitchenView = React.createClass({
  getInitialState: function(){
    var self = this;
    var orders = new OrderCollection()
    orders.fetch().then(function(data){
      self.setState({collection: orders});
    });

    return {
      collection: orders
    }

  },
  completeOrder: function(model){
    model.destroy();
    this.setState({collection: this.state.collection});
  },
  render: function(){
    return(
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <h1>Majestic Thai :: Kitchen</h1>
            <KitchenOrderList 
              orders={this.state.collection}
              completeOrder={this.completeOrder}
            />
          </div>
        </div>
      </div>
    )
  },
});
      
module.exports = {
  KitchenView: KitchenView
};
