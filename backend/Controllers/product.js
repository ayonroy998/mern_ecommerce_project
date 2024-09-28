import { Product } from "../Models/product.js";

//add product (create)
export const addProduct = async (req, res) => {
  const { title, description, price, qty, image, category } = req.body;

  try {
    let product = await Product.create({
      title,
      description,
      price,
      qty,
      image,
      category,
    });
    res.json({ message: "product added successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Error creating product" });
  }
};

//get all products (read)
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "sorry!! not to get products" });
  }
};

//get product by id
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
    if (!product) {
      res.status(404).json({ message: "Invalid Id" });
    }
  } catch (error) {
    res.status(500).json({ message: "sorry!! not to get product by id" });
  }
};

//update product by id  (update)
export const updateProductById = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(product);
    if (!product) {
      res.status(404).json({ message: "Invalid Id" });
    }
  } catch (error) {
    res.status(500).json({ message: "sorry!! not to update product by id" });
  }
};

//delete product by id (delete)
export const deleteProductById = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.json(product);
    if (!product) {
      res.status(404).json({ message: "Invalid Id" });
    }
  } catch (error) {
    res.status(500).json({ message: "sorry!! not to delete product by id" });
  }
};
