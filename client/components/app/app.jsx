import React, { Component } from 'react';
import Header from './header';
import BreadcrumbBar from './breadcrumb-bar';
import ItemCardsList from '../item/item-cards-list';
import ItemDetails from '../item/item-details';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      view: {
        page: 'catalog',
        params: {}
      },
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

  render() {
    const pageComponents = {
      catalog: (<ItemCardsList setAppView={this.setView} />),
      details: (<ItemDetails setAppView={this.setView} viewParams={this.state.view.params} />),
      cart: '',
      checkout: '',
      orderHistory: '',
      orderSummary: ''
    };

    return (
      <div>
        <Header setAppView={this.setView} cartItemCount={this.state.cartItems.length} />
        <BreadcrumbBar currentView={this.state.view.page} itemName={this.state.view.page === 'details' ? this.state.view.params.itemName : null} />
        {pageComponents[this.state.view.page]}
      </div>
    );
  }
}
