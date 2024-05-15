const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const isAuth = require("./Middleware/auth");
const app = express();
const PORT = process.env.PORT || 5000;
const mongoDBUri = process.env.MONGODB_URI;
const productRoutes = require("./Routes/products");
const userRoutes = require("./Routes/users");
const orderRoutes = require("./Routes/orders");

async function connectToMongoDB() {
  try {
      await mongoose.connect(mongoDBUri, { 
          useNewUrlParser: true, 
          useUnifiedTopology: true,
          dbName: process.env.DBNAME
      });
      console.log('Express app connected to MongoDB');
      app.listen(PORT, () => {
          console.log(`Express app listening on port ${PORT}`);
      });
  } catch (error) {
      console.error('Could not connect to MongoDB', error);
  }
}

connectToMongoDB();

app.use(express.json());
app.use(cors());
app.use(isAuth);
app.use("/product", productRoutes);
app.use("/api", userRoutes); // Changed for alignment with client-side route calling
app.use("/order", orderRoutes);


// Optional: Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});