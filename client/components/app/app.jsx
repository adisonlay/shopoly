import React, { Component } from 'react';
import Header from './header';
import BreadcrumbBar from './breadcrumb-bar';
import ItemCardsList from '../item/item-cards-list';
import ItemDetails from '../item/item-details';
import CartSummary from '../cart/cart-summary';
import { Box } from '@material-ui/core';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      view: { page: 'catalog', params: {} },
      activeCartID: null,
      cartItems: [],
      orderedCarts: []
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
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

  componentDidMount() {
    this.getCartItems();
  }

  render() {
    const { page: currentPage, params: currentParams } = this.state.view;
    const pageComponents = {
      catalog: (<ItemCardsList setAppView={this.setView} />),
      details: (<ItemDetails setAppView={this.setView} viewParams={currentParams} addToCartCallback={this.addToCart} />),
      cart: (<CartSummary setAppView={this.setView} cartItems={this.state.cartItems} />),
      checkout: '',
      orderHistory: '',
      orderSummary: ''
    };

    return (
      <Box>
        <Header setAppView={this.setView} cartItemCount={this.state.cartItems.length} />
        <BreadcrumbBar setAppView={this.setView} currentView={currentPage} itemName={currentPage === 'details' ? currentParams.itemName : null} />
        {pageComponents[currentPage]}
      </Box>
    );
  }
}
