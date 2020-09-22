const Product = require("../models/product");
const slugify = require("slugify");

exports.addProduct = (req, res) => {
  const { name, price, description, category, createdBy } = req.body;

  let productPictures = [];

  if (req.files.length > 0) {
    productPictures = req.files.map((file) => {
      return { img: file.filename };
    });
  }

  const product = new Product({
    name: name,
    slug: slugify(name),
    price,
    description,
    productPictures,
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
