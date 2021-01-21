const env = require("dotenv")
env.config()

const bodyParser = require("body-parser")
const express = require("express")
const app = express()
const router = express.Router()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use(router)

const mongoose  = require("mongoose")
mongoose.connect(`mongodb+srv://jason:${process.env.MONGO_PASSWORD}@cluster0.qd6sq.mongodb.net/E-Commerce?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

const user = require("./routes/user")
const product = require("./routes/product")

app.use("/users", user)
app.use("/products", product)

app.listen (port, () => {
    console.log("Listening" + " " + port)
})