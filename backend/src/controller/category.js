const Category = require("../models/category");
const slugify = require("slugify");

const createCategoryList = (categories, parentId = null) => {
  let category;
  if (parentId == null) {
    category = categories.filter((c) => c.parentId == undefined);
  } else {
    category = categories.filter((c) => c.parentId == parentId);
  }
  const categoryList = [];

  for (let c of category) {
    categoryList.push({
      _id: c.id,
      name: c.name,
      slug: c.slug,
      subCategories: createCategoryList(categories, c._id),
    });
  }

  return categoryList;
};

exports.addCategory = (req, res) => {
  const categoryDetail = { name: req.body.name, slug: slugify(req.body.name) };

  if (req.file) {
    categoryDetail.categoryImage =
      process.env.API + "/public/" + req.file.filename;
  }
  if (req.body.parentId) {
    categoryDetail.parentId = req.body.parentId;
  }
  const categoryObj = new Category(categoryDetail);
  categoryObj.save((error, category) => {
    if (error) {
      res.status(400).json({ error: error });
    } else {
      res.status(201).json({ message: "Category created", category: category });
    }
  });
};

exports.getCategories = (req, res) => {
  Category.find({}).exec((error, category) => {
    if (error) {
      res.status(400).json({ message: "no category found" });
    }
    if (category) {
      res.status(200).json({ category: createCategoryList(category) });
    }
  });
};
