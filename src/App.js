import React, { useState } from "react";
import './App.css';

function App() {

  // Defining different display pages

  const PAGE_products = "products";
  const PAGE_basket = "basket";
  const PAGE_checkout = "checkout";

  // Basket State for items (error state is a filler for a discount code feature)

  const [basket, setBasket] = useState([]);
  const [error, setError] = useState("");

  // Calculations for basket total

  const cost = (product) => product.cost;
  const sum = (prev, next) => prev + next;
  let total;

  if (basket.length !== 0){
    total = basket.map(cost).reduce(sum).toFixed(2)
  } else {
    total = 0;
  }

  // State changer for displays (avoids React Router for quick mockup)

  const [display, setDisplay] = useState(PAGE_products);

  // Array of product objects, in place of where an API would be accessed

  const [products] = useState([
    {
      name: "Mens Home Shirt 2020/21",
      cost: 39.99,
      image: "https://morecambefootballclub.s3.eu-west-2.amazonaws.com/packages_images_path/junior-home-top-2021-size-s-package_logo-0d85c4a7923d2d5103b22f71b23b08a5.jpg",

    },
    {
      name: "Mens Away Shirt 2020/21",
      cost: 39.99,
      image: "https://morecambefootballclub.s3.eu-west-2.amazonaws.com/packages_images_path/junior-away-top-2021-size-s-package_logo-bed4699dd2e115e2adebf3328e623d43.jpg",
    },
    {
      name: "Mens Zip Top 2020/21",
      cost: 29.99,
      image: "https://morecambefootballclub.s3.eu-west-2.amazonaws.com/packages_images_path/2xs-zip-top-black-2021-package_logo-dc4ab13036866bc172e609f2086cf130.jpg"
    },
    {
      name: "Mens Home Shorts 2020/21",
      cost: 16.99,
      image: "https://morecambefootballclub.s3.eu-west-2.amazonaws.com/packages_images_path/pre-order-junior-home-short-2021-size-5xs-package_logo-ec8e9ff35429b84cb6d468b2468ab3bc.jpg"
    },
    {
      name: "Mens Away Shorts 2020/21",
      cost: 16.99,
      image: "https://morecambefootballclub.s3.eu-west-2.amazonaws.com/packages_images_path/pre-order-away-short-2021-size-5xs-package_logo-6b18b69d25cd3cd0a72f0991ad7def52.jpg"
    },
    {
      name: "Mens Training Top 2020/21",
      cost: 18.99,
      image: "https://morecambefootballclub.s3.eu-west-2.amazonaws.com/packages_images_path/xs-t-shirt-black-2021-package_logo-872c68ab973cbdfc44f3010733ae6ef0.jpg"
    }
  ]);

  // Functions
  
  const addToBasket = (product) => {
    setBasket([...basket, {...product}])
  };

  const removeFromBasket = (productToRemove) => {
    setBasket(basket.filter((product) => product !== productToRemove))
  }

  const switchTo = (nextDisplay) => {
    setDisplay(nextDisplay);
  }

  const errorMessageFunc = () => {
    setError("Invalid code!");
  }

  // Display Render Functions

  const renderProducts = () => (
    <div id="products">
      {products.map((product) => (
        <div id="product">
          <h3>{product.name}</h3>
          <h4>£{product.cost}</h4>
          <img id="product-picture" src={product.image} alt="" />
          <button onClick={() => addToBasket(product)}>Add to Basket</button>
        </div>
      ))}  
    </div>
  )

  const renderBasket = () => (
    <div id="baskets">
      <h1 id="my-basket">My Basket</h1>
      {basket.map((product) => (
        <div id="basket-item">
          <img id="basket-picture" src={product.image} alt="" />
          <h3>{product.name}</h3>
          <h3>£{product.cost}</h3>
          <button id="remove" onClick={() => removeFromBasket(product)}>Remove</button>
        </div>
      ))}
      <div id="totals">
        <div id="discount">
          <h3>Enter Discount Code:</h3>
          <input id="discount-input" type="text" name="coupon" />
          <button id="discount-button" onClick={() => errorMessageFunc()}>Submit</button>
          <h4 id="discount-error">{error}</h4>
        </div>
        <h2>Total: £{total}</h2>
        <button id="checkout" onClick={() => switchTo(PAGE_checkout)}>Checkout</button>
      </div>
    </div>
  )

  const renderCheckout = () => (
    <div id="checkout-page">
      <h1 id="checkout-header">Checkout</h1>
      <h3>To Pay: £{total}</h3>
      <div id="payment">
        <img id="payment-picture" alt="" src="https://img.vendingmarketwatch.com/files/base/cygnus/vmw/image/2011/09/visa_logo_10377884.png?auto=format&w=720" />
        <img id="payment-picture" alt="" src="https://newsroom.mastercard.com/wp-content/uploads/2016/09/paypal-logo.png" />
        <img id="payment-picture" alt="" src="https://seekvectorlogo.com/wp-content/uploads/2019/11/klarna-vector-logo.png" />
      </div>
    </div>
  )


  // Main React

  return (
    <div className="App">
      <h1 id="main-header"><img onClick={() => switchTo(PAGE_products)} id="header-img" alt="" src="https://upload.wikimedia.org/wikipedia/fr/thumb/9/94/Logo_Morecambe_FC_2010.svg/1200px-Logo_Morecambe_FC_2010.svg.png" /></h1>
      <div id="page-headers">
      <button id="basket-button" onClick={() => switchTo(PAGE_basket)}>Basket ({basket.length})</button>
      <button id="products-button" onClick={() => switchTo(PAGE_products)}>Products</button>    
      </div>

      {display === PAGE_products && renderProducts()}
      {display === PAGE_basket && renderBasket()}
      {display === PAGE_checkout && renderCheckout()}

    </div>
  );
}

export default App;
