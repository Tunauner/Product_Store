import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // aynı isimde ürün eklenmesini engelleme
    },
    price: {
      type: Number,
      required: true,
    },
    ImageUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // createdAt ve updatedAt alanlarini otomatik ekler
  }
);

const Product = mongoose.model("Product", productSchema); //Product desek de databasede products olarak olusur
export default Product;
