# Shopoly

A full-stack, single-page React.js e-commerce web application with a dynamic PHP API that allows shoppers to browse properties, add their items to a cart, and place orders online.

## Technologies Used
- React.js
- Webpack 4
- Material-UI
- HTML5
- CSS3
- PHP
- MySQL
- AWS EC2

## Live Demo
Try the application live at [http://shopoly.adisonlay.com/](http://shopoly.adisonlay.com/).

## Features
- Shoppers can view the items for purchase.
- Shoppers can view the details of an item.
- Shoppers can add items to their cart.
- Shoppers can view their cart summary.
- Shoppers can update their cart item quantity.
- Shoppers can remove items from their cart.
- Shoppers can place an order.
- Shoppers can view their order summary.
- Shoppers can view their order history.

## Development
#### System Requirements
- NPM 6 or higher
- MySQL 5.7 or higher
- PHP 7.2 or higher
- Apache HTTP Server

#### Getting Started
1. Clone the repository.
    ```shell
    git clone https://github.com/adisonlay/shopoly.git
    cd shopoly
    ```

1. Install all dependencies with NPM.
    ```shell
    npm install
    ```

1. Add and enable the `shopoly.localhost` site on Apache web server using the provided virtual host configuration file (in the `server` directory).
    ```shell
    sudo cp server/shopoly.localhost.conf /etc/apache2/sites-available
    sudo a2ensite shopoly.localhost
    sudo service apache2 restart
    ```

1. Import the example database to MySQL.
    ```shell
    mysql shopoly < shopoly.sql
    ```

1. Start the project. Once started you can view the application by opening http://localhost:3000 in your browser.
    ```shell
    npm run dev
    ```
