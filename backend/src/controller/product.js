const Product = require("../models/product");
const slugify = require("slugify");

exports.addProduct = (req, res) => {
  const { name, price, quantity, description, category, createdBy } = req.body;

  let productPictures = [];
  if (req.body.productPicture.length) {
    productPictures = req.body.productPicture.map((file) => {
      return { img: file.filename };
    });
  }

  const product = new Product({
    name: name,
    slug: slugify(name),
    price,
    quantity,
    description,
    productPictures: productPictures,
    category,
    createdBy: req.user._id,
  });

  product.save((error, product) => {
    if (error) return res.status(400).json({ error });
    else {
      res.status(201).json({ message: "product created", product: product });
    }
  });
};

exports.getProducts = (req, res) => {
  Product.find({}).exec((error, product) => {
    if (error) {
      res.status(400).json({ message: "no product found" });
    }
    if (product) {
      res.status(200).json({ product: product });
    }
  });
};
