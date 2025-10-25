import Product from "../models/product.model.js";
import moongoose from "mongoose";

//ürünleri ekle
export const createProduct =async (req, res) => {
  const product = req.body;
  if (!product.name || !product.price || !product.ImageUrl) {
    return res.status(400).json({ message: "All fields are required." });
  }
  const newProduct = new Product(product);

  try {
    {
      await newProduct.save();
      res.status(201).json({ success: true, data: newProduct, message: "Product created successfully."});
    }
  } catch (error) {
    if (error.code === 11000) { // duplicate key error yani aynı isimde ürün eklenmeye çalışıldığında bunu engeller name unique olarak ayarlandı cunku 
      return res.status(400).json({ success: false, message: "Product with this name already exists." });
    }
    res.status(500).json({ message: "Server error." });
  }
};

//ürünleri listele
export const getProduct = async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length === 0) {
      return res.status(404).json({ success: false, message: "No products found." });
    }
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
}

//ürünleri sil
export const deleteProduct = async (req, res) => { //:id dinamik parametre olarak alinir yani ":" bu ifade id nin dinamik oldugunu gosterir
  try {
    const{id} = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (moongoose.isValidObjectId(id) === false){
      return res.status(404).json({success: false, message: "Product not found." });
    }
    res.status(200).json({ success: true, data: deletedProduct, message: "Product deleted successfully."});
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
}

//ürünleri güncelle
export const updateProduct = async (req, res) => {

  try {
    const { id } = req.params;
    const product = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });

    if(moongoose.isValidObjectId(id) === false){
      return res.status(400).json({ success: false, message: "Invalid product ID." });
    }
    if (!product.name || !product.price || !product.ImageUrl) {
      return res.status(400).json({success: false, message: "All fields are required." });
    }
    
    if (!updatedProduct) {
      return res.status(404).json({success: false, message: "Product not found." });
    }
    res.status(200).json({ success: true, data: updatedProduct, message: "Product updated successfully."});
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
}




