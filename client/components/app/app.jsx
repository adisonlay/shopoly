import React, { Component } from 'react';
import Header from './header';
import BreadcrumbBar from './breadcrumb-bar';
import ItemCardsList from '../item/item-cards-list';
import ItemDetails from '../item/item-details';
import CartSummary from '../cart/cart-summary';
import CartCheckoutForm from '../cart/cart-checkout-form';
import OrderSummary from '../order/order-summary';
import OrderHistory from '../order/order-history';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      view: { page: 'catalog', params: {} },
      cartItems: []
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
  }

  setView(page, params) {
    this.setState({ view: { page, params } });
  }

  getCartItems() {
    fetch('/api/cart/cart.php')
      .then(response => response.json())
      .then(cartItems => this.setState({ cartItems }))
      .catch(error => console.error(error));
  }

  addToCart(cartAddBody, itemDetailData) {
    fetch('/api/cart/cart.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cartAddBody)
    })
      .then(response => response.json())
      .then(cartAddResponse => {
        const newCartItemData = JSON.parse(JSON.stringify(itemDetailData));
        newCartItemData.cartID = cartAddResponse.cartID;
        newCartItemData.finalPrice = cartAddBody.finalPrice;
        newCartItemData.quantity = cartAddBody.quantity;
        this.setState(prevState => { cartItems: prevState.cartItems.concat([newCartItemData]) });
      })
      .catch(error => console.error(error));
  }

  placeOrder(cartID) {
    cartID = parseInt(cartID);
    fetch('/api/order/order.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cartID })
    })
      .then(() => this.setState({ cartItems: [] }))
      .catch(error => console.error(error));
  }

  componentDidMount() {
    this.getCartItems();
  }

  render() {
    let initialCartItemCount = 0;
    const cartItemCount = this.state.cartItems.reduce((runningCount, currentItemObject) => runningCount + currentItemObject.quantity, initialCartItemCount);

    const { page: currentPage, params: currentParams } = this.state.view;
    const pageComponents = {
      catalog: (<ItemCardsList setAppView={this.setView} />),
      details: (<ItemDetails setAppView={this.setView} viewParams={currentParams} addToCartCallback={this.addToCart} />),
      cart: (<CartSummary setAppView={this.setView} cartItems={this.state.cartItems} />),
      checkout: (<CartCheckoutForm setAppView={this.setView} viewParams={currentParams} cartItems={this.state.cartItems} placeOrderCallback={this.placeOrder} />),
      orderSummary: (<OrderSummary setAppView={this.setView} viewParams={currentParams} />),
      orderHistory: (<OrderHistory setAppView={this.setView} />)


      // orderSummary: '',
      // orderHistory: (<OrderSummary setAppView={this.setView} viewParams={{
      //   orderItems: this.state.cartItems,
      //   orderItemCount: 6,
      //   orderTotal: 860,
      //   shippingAddress: {
      //     nameInput: 'Mr. Monopoly',
      //     addressInput: '200 Park Place',
      //     cityInput: 'Atlantic City',
      //     stateInput: 'NJ',
      //     zipInput: '12345',
      //     countryInput: 'United States'
      //   }
      // }} />)
    };

    return (
      <div>
        <Header setAppView={this.setView} cartItemCount={cartItemCount} />
        <BreadcrumbBar setAppView={this.setView} currentView={currentPage} itemName={currentPage === 'details' ? currentParams.itemName : null} />
        {pageComponents[currentPage]}

        {this.state.cartItems.length
        ?
          (<OrderSummary setAppView={this.setView} viewParams={{
            orderItems: this.state.cartItems,
            orderItemCount: 6,
            orderTotal: 860,
            shippingAddress: {
              nameInput: 'Mr. Monopoly',
              addressInput: '200 Park Place',
              cityInput: 'Atlantic City',
              stateInput: 'NJ',
              zipInput: '12345',
              countryInput: 'United States'
            }
          }} />)
        :
        null
        }

      </div>
    );
  }
}
