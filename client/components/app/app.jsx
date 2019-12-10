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
      // orderHistory: (<OrderSummary setAppView={this.setView} viewParams={{
      //   orderItems: cartItems,
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

        {cartItems.length
        ?
          (<OrderSummary setAppView={this.setView} viewParams={{
            orderItems: cartItems,
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
