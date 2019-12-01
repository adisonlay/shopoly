import React, { Component } from 'react';
import Header from './header';
import BreadcrumbBar from './breadcrumb-bar';
import ItemCardsList from '../item/item-cards-list';
import ItemDetails from '../item/item-details';
import CartSummary from '../cart/cart-summary';
import CartCheckoutForm from '../cart/cart-checkout-form';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      view: { page: 'catalog', params: {} },
      cartItems: []
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder - this.placeOrder.bind(this);
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

  getOrderHistory() { }

  placeOrder(activeCartID) {
    fetch('/api/order/order.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(activeCartID)
    })
      .then(() => this.setState({
        view: { page: 'orderSummary', params: {} },
        cartItems: []
      }))
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
      orderHistory: '',
      orderSummary: ''
    };

    return (
      <div>
        <Header setAppView={this.setView} cartItemCount={cartItemCount} />
        <BreadcrumbBar setAppView={this.setView} currentView={currentPage} itemName={currentPage === 'details' ? currentParams.itemName : null} />
        {pageComponents[currentPage]}
      </div>
    );
  }
}
