const Product = require("../models/product");
const Category = require("../models/category");

const slugify = require("slugify");
const product = require("../models/product");

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

exports.getProductBySlug = (req, res) => {
  const { slug } = req.params;
  Category.findOne({ slug: slug })
    .select("_id")
    .exec((error, category) => {
      if (error) {
        return res.status(400).json({ error });
      }
      if (category) {
        Product.find({ category: category._id }).exec((error, product) => {
          res.status(200).json({
            product,
            productByPrice: {
              under5k: product.filter((product) => product.price <= 5000),
              under10k: product.filter(
                (product) => product.price > 5000 && product.price <= 10000
              ),

              under10k: product.filter(
                (product) => product.price > 10000 && product.price <= 15000
              ),
              under15k: product.filter(
                (product) => product.price > 15000 && product.price <= 20000
              ),
              under20k: product.filter(
                (product) => product.price > 20000 && product.price <= 30000
              ),
            },
          });
        });
      }
    });
};
