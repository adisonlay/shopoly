import React, { Component } from 'react';
import Header from './header';
import BreadcrumbBar from './breadcrumb-bar';
import ItemCardsList from '../item/item-cards-list';
import ItemDetails from '../item/item-details';

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
  }

  setView(page, params) {
    this.setState({
      view: { page, params }
    });
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
      .then(cartAddData => {
        const { itemID, finalPrice, quantity} = cartAddBody;
        const newCartItemData = JSON.parse(JSON.stringify(itemDetailData));
        newCartItemData.cartID = cartAddData.cartID;
        newCartItemData.finalPrice = finalPrice;
        newCartItemData.quantity = quantity;
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
      details: (<ItemDetails setAppView={this.setView} viewParams={currentParams} />),
      cart: '',
      checkout: '',
      orderHistory: '',
      orderSummary: ''
    };

    return (
      <div>
        <Header setAppView={this.setView} cartItemCount={this.state.cartItems.length} />
        <BreadcrumbBar setAppView={this.setView} currentView={currentPage} itemName={currentPage === 'details' ? currentParams.itemName : null} />
        {pageComponents[currentPage]}
      </div>
    );
  }
}
