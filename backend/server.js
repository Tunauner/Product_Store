import express from "express";
import dotenv from "dotenv"; //.env ulasmak icin
import { connectDB } from "./config/db.js";
import productRouter from "./routes/product.routes.js";  //router import edildi
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve(); // yolunu almak icin

app.use(express.json()); //json formatindaki body i okuyabilmek icin

app.use("/api/products", productRouter); //router kullanimi icin kullanilir , api/products ile baslayan tum istekler productRouter a yonlendirilir

//bundan once npm run build yaptım bu sayede frontend build edildi ve dist 
if (process.env.NODE_ENV === "production") { // işlem sadece production modunda calisacak
  app.use(express.static(path.join(__dirname, "/frontend/dist"))); //frontedın buıld dosyalarını statık bı sekılde bıze sunar 
  app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))); //api istekleri haric tüm istekler indeks.html sayfasına yonlendirilir
//console.log(process.env.MONGO_URI);

app.listen(PORT, () => {
  connectDB();
  console.log("Server at http://localhost:" + PORT);
});}
