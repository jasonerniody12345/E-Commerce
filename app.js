const env = require("dotenv");
env.config(); // Load environment variables from .env file

const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors"); // Import CORS
const path = require("path"); // To serve static files
const app = express();
const router = express.Router();
const port = 8800;

// Middleware setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);

// Enable CORS for specific origin
app.use(
  cors({
    origin: "http://localhost:8080", // Frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// MongoDB Connection Setup
const mongoose = require("mongoose");
mongoose.connect(
  `mongodb+srv://jason:${process.env.MONGO_PASSWORD}@cluster0.jd4gj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
);

// Routes
const user = require("./routes/user");
const product = require("./routes/product");
const transaction = require("./routes/transaction");

app.use("/users", user);
app.use("/products", product);
app.use("/transactions", transaction);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));


// Serve static files (images) from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Listen to requests on a specific port (Heroku or local)
app.listen(process.env.PORT || 8800, () => {
  console.log("Listening on port " + (process.env.PORT || port));
});
