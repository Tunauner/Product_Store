import express from "express";
import { deleteProduct, updateProduct, createProduct, getProduct } from "../controllers/product.controller.js";
const productRouter = express.Router();

//ürünleri ekle
productRouter.post("/", createProduct);

//ürünleri listele
productRouter.get("/", getProduct);

//ürünleri sil
productRouter.delete("/:id", deleteProduct);

//ürünleri güncelle
productRouter.put("/:id", updateProduct);

export default productRouter;
