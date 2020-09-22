const Cart = require("../models/cart");

exports.addItemToCart = (req, res) => {
  Cart.find({ user: req.user._id }).exec((error, cart) => {
    if (error) {
      return res.status(400).json({ error });
    }
    if (cart.length) {
      console.log("cart", cart);
      const product = req.body.cartItems.product;
      const item = cart[0].cartItems.find(
        (c) => c.product == req.body.cartItems.product
      );
      if (item) {
        Cart.findOneAndUpdate(
          { user: req.user._id, "cartItems.product": product },
          {
            $set: {
              "cartItems.$": {
                ...req.body.cartItems,
                quantity: item.quantity + req.body.cartItems.quantity,
              },
            },
          }
        ).exec((error, _cart) => {
          if (error) {
            res.status(400).json({ error: error });
          } else {
            res.status(200).json({ cart: _cart });
          }
        });
      } else {
        console.log(" no cart");

        Cart.findOneAndUpdate(
          { user: req.user._id },
          {
            $push: {
              cartItems: req.body.cartItems,
            },
          }
        ).exec((error, _cart) => {
          if (error) {
            res.status(400).json({ error: error });
          } else {
            res.status(200).json({ cart: _cart });
          }
        });
      }
    } else {
      const cart = new Cart({
        user: req.user._id,
        cartItems: req.body.cartItems,
      });

      cart.save((error, cart) => {
        if (error) {
          res.status(400).json({ error });
        } else {
          res.status(201).json({ message: "added to cart", cartItem: cart });
        }
      });
    }
  });
};
