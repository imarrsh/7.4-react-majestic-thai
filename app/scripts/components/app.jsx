var React = require('react');

var MenuCollection = require('../models/menu').MenuCollection;

var AppWrapper = require('./layout/app-wrapper.jsx').AppWrapper;
var Row = require('./layout/app-wrapper.jsx').Row;

// plain heading object
var RestuarantHeading = function(props){
  return (
    <div className="row">
      <div className="col-xs-12">
        <div className="main-heading">
          <h1>Majestic Thai</h1>
        </div>
      </div>
    </div>
  );
};

var MenuItem = React.createClass({
  handleAddItem: function(e){
    console.log(this.props.model)
    
    // this.props.addItem();
  },
  render: function(){
    // console.log(this.props.name)
    return(
      <Row>
        <div className="col-xs-12">
          <div className="menu-item cf">
            <h3 className="item-title">{this.props.name} <span className="item-price">{this.props.price}</span></h3>
            <h5>{this.props.category}</h5>
            <p className="item-description">
              {this.props.description}
              <button onClick={this.handleAddItem} className="btn btn-add">Add</button>
            </p>
          </div>
        </div>
      </Row>
    );
  }
});

var MenuList = React.createClass({
  render: function(){
    var menuItems = this.props.menu.map(function(menuItem){
      return(
        <MenuItem
          key={menuItem.get('_id')}
          name={menuItem.get('name')}
          category={menuItem.get('category')}
          price={menuItem.get('price')}
          description={menuItem.get('description')}
          model={menuItem}
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

var OrderTicket = React.createClass({
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
                <input type="text" className="form-control" placeholder="Your name, please" required />
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
            <div className="row">
              <div className="col-xs-12">

              <div className="order-item-list">

                  <div className="order-item">
                    <h4 className="order-item-name">Pad Thai <small>$8.99</small></h4>
                    <input type="text" name="order-item" value="Pad Thai" disabled />
                    <input type="text" name="order-item-quantity" value="1" disabled />
                  </div>                         

              </div>

              </div>
            </div>
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

var AppContainer = React.createClass({
  getInitialState: function(){
    self = this;

    var menu = new MenuCollection();
    menu.fetch().then(function(data){
      self.setState({collection: menu})
    });

    return {
      collection: menu
    }
  },
  render: function(){
    return (
      <AppWrapper>

        <section className="order-menu">
          <div className="container">

            <RestuarantHeading />

            <Row>
              <MenuList menu={this.state.collection}/>
              <OrderTicket />
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
