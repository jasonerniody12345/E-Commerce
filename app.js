const env = require("dotenv")
env.config()

const bodyParser = require("body-parser")
const express = require("express")
const app = express()
const router = express.Router()
const port = 8800

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use(router)

const mongoose  = require("mongoose")
mongoose.connect(`mongodb+srv://jason:${process.env.MONGO_PASSWORD}@cluster0.qd6sq.mongodb.net/E-Commerce?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

const user = require("./routes/user")
const product = require("./routes/product")
const transaction = require("./routes/transaction")

app.use("/users", user)
app.use("/products", product)
app.use("/transactions", transaction)

//tambin process.PORT buat heroku
//tambain di package.json scripts "start node app.js / nodemon "
app.listen (process.env.PORT || 8800 , () => {
    console.log("Listening" + " " + port)
})