# Server
<hr>

# Package installation

`npm i express mongoose dotenv cors nodemon -d bcrypt jsonwebtoken stripe`

<hr>

# basic server setup

create index.js file

add code to listen to server

```javascript
const express = require("express");
const app = express();

const PORT = 5000;

app.get("/", (req, res) => {
    res.send("hello get here");
})

app.listen(PORT, (req, res) => {
    console.log(`started listening at port ${PORT}`)
});
```


<hr>

# pages

- Home.js
- Shop.js
- ProductDetails.js
- Cart.js
- Like.js
- SignUp.js
- SignIn.js
- Orders.js
- Account.js


# components

- create components folder
- create header folder - Header.js
- create footer folder - Footer.js
- create layout folder - Layout.js
- creater home Folder - 
    - Carousel.js
    - ProductList.js
    - ProductCard.js
    - StarRating.js
- creater Cart Folder - 
    - CartList.js
    - CartCard.js
- create shop Folder -
    - ShopProductList.js
- create like Folder -
    - LikeList.js
    - LikeCard.js
- create sign Folder -
    - FormInputs.js
- create utils Folder -
    - ScrollToTop.js

# router

- create router folder
- create Route.js - link all pages and create path.


# connect

- App.js add Layout.js component 


# redux

- create banner Folder - 
    - bannerAction.js
    - bannerReducer.js
    - bannerTypes.js
- create cart Folder - 
    - cartAction.js
    - cartReducer.js
    - cartTypes.js
- create data Folder - 
    - dataAction.js
    - dataReducer.js
    - dataTypes.js
- create filters Folder - 
    - filterAction.js
    - filterReducer.js
    - filterTypes.js
- create like Folder - 
    - likeAction.js
    - likeReducer.js
    - likeTypes.js
    
- create store.js

<br>

 
![alt text](image.png)

![alt text](image-1.png)

![alt text](image-2.png)

<hr>

# HOME
1. # Banner (Carousel)
2. # Product Listing

# PRODUCT-DETAILS
1. # ProductCard.js

# SHOP
1. # ShopProductList.js
2. # ProductCard.js

# CART
1. # CartList.js
2. # CartCard.js

# LIKE
1. # LikeList.js
2. # LikeCard.js
