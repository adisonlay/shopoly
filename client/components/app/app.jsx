import React, { Component } from 'react';
import Header from './header';
import BreadcrumbBar from './breadcrumb-bar';
import ItemCardsList from '../item/item-cards-list';
import ItemDetails from '../item/item-details';
import CartSummary from '../cart/cart-summary';
import CartCheckoutForm from '../cart/cart-checkout-form';
import OrderSummary from '../order/order-summary';
import OrderHistory from '../order/order-history';
import { getHouseUnlockStatus, getHotelUnlockStatus } from './functions';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      view: { page: 'catalog', params: {} },
      cartItems: [],
      orderHistoryData: []
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.getOrderHistory = this.getOrderHistory.bind(this);
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
    const { cartItems } = this.state;
    for (let cartItem of cartItems) {
      if (parseInt(cartItem.itemID) === parseInt(cartAddBody.itemID)) {
        if (cartItem.quantity + cartAddBody.quantity > 4) return false;
      }
    }

    fetch('/api/cart/cart.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cartAddBody)
    })
      .then(response => response.json())
      .then(cartAddResponse => {
        if (cartAddResponse.success) {
          this.getCartItems();
        }
      })
      .catch(error => console.error(error));

    return true;
  }

  updateQuantity(cartID, itemID, newQuantity) {
    cartID = parseInt(cartID);
    itemID = parseInt(itemID);
    newQuantity = parseInt(newQuantity);

    const currentItem = this.state.cartItems.find(cartItem => parseInt(cartItem.cartID) === cartID && parseInt(cartItem.itemID) === itemID);
    if (newQuantity <= 0 || newQuantity > 4 || !currentItem || currentItem.quantity === newQuantity) return false;

    fetch('/api/cart/cart.php', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cartId, itemID, newQuantity })
    })
      .then(response => response.json())
      .then(cartPatchResponse => {
        if (cartPatchResponse.success) {
          const newCart = this.state.cartItems.map(cartItem => {
            if (parseInt(cartItem.itemID) === itemID) {
              const updatedItem = JSON.parse(JSON.stringify(currentItem));
              updatedItem.quantity = newQuantity;
              return updatedItem;
            } else {
              return cartItem;
            }
          });
          this.setState({ cartItems: newCart });
        }
      })
      .catch(error => console.error(error));

    return true;
  }

  removeFromCart(cartID, itemID) {
    cartID = parseInt(cartID);
    itemID = parseInt(itemID);

    fetch('/api/cart/cart.php', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cartId, itemID })
    })
      .then(response => response.json())
      .then(cartDeleteResponse => {
        if (cartDeleteResponse.success) {
          const newCart = this.state.cartItems.filter(cartItem => {
            if (!(parseInt(cartItem.cartID) === cartID && parseInt(cartItem.itemID) === itemID)) {
              return true;
            }
          });
          this.setState({ cartItems: newCart });
        }
      })
      .catch(error => console.error(error));
  }

  getOrderHistory() {
    fetch('api/order/order.php')
      .then(response => response.json())
      .then(orderHistoryData => this.setState({ orderHistoryData }))
      .catch(error => console.error(error));
  }

  placeOrder(cartID) {
    cartID = parseInt(cartID);
    fetch('/api/order/order.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cartID })
    })
      .then(response => response.json())
      .then(orderAddResponse => {
        if (orderAddResponse.success) {
          this.getOrderHistory();
          this.setState({ cartItems: [] });
        }
      })
      .catch(error => console.error(error));
  }

  componentDidMount() {
    this.getCartItems();
    this.getOrderHistory();
  }

  render() {
    const { cartItems, orderHistoryData } = this.state;
    const { page: currentPage, params: currentParams } = this.state.view;

    const cartItemCount = cartItems.reduce((runningCount, currentItemObject) => runningCount + currentItemObject.quantity, 0);
    const unlockStatus = { house: getHouseUnlockStatus(orderHistoryData), hotel: getHotelUnlockStatus(orderHistoryData) };

    const pageComponents = {
      catalog: (<ItemCardsList setAppView={this.setView} unlockStatus={unlockStatus} />),
      details: (<ItemDetails setAppView={this.setView} viewParams={currentParams} addToCartCallback={this.addToCart} unlockStatus={unlockStatus} />),
      cart: (<CartSummary setAppView={this.setView} cartItems={cartItems} />),
      checkout: (<CartCheckoutForm setAppView={this.setView} viewParams={currentParams} cartItems={cartItems} placeOrderCallback={this.placeOrder} />),
      orderSummary: (<OrderSummary setAppView={this.setView} viewParams={currentParams} />),
      orderHistory: (<OrderHistory setAppView={this.setView} orderHistoryData={orderHistoryData} />)
    };

    return (
      <>
        <Header setAppView={this.setView} cartItemCount={cartItemCount} />
        <BreadcrumbBar setAppView={this.setView} currentView={currentPage} itemName={currentPage === 'details' ? currentParams.itemName : null} />
        {pageComponents[currentPage]}
      </>
    );
  }
}
