const express = require("express");
const mongoose = require("mongoose");
const { Product } = require("../Models/products");
const router = express.Router();


//Get products from database
//Get API
router.get("/", async (req, res) => {
  const productList = await Product.find();
  res.send(JSON.stringify(productList));
});

//Get a single product by id
router.get("/:id", async (req, res) => {
  const product_id = req.params.id;
  const product = await Product.findById(product_id);
  res.send(JSON.stringify(product));
});

// Create a new product
router.post("/create", async (req, res) => {
  try {
    const newProduct = new Product(req.body.data);  // Check structure of req.body.data
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Failed to create product", error: error.toString() });
  }
});

//Update a product
//Put API
router.put("/update/:id", async (req, res) => {
  try {
    const product_id = req.params.id;
    const updatedProduct = await Product.findByIdAndUpdate(product_id, req.body.data, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product updated successfully!", product: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Failed to update product", error: error.toString() });
  }
});
//Delete a product
//Delete API
router.delete("/delete/:id", async (req, res) => {
  try {
    const result = await Product.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted!" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Failed to delete product", error: error.toString() });
  }
});

module.exports = router;
