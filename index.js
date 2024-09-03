require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const products = require('./routes/products')
const users = require('./routes/users')

// middlewares
app.use(cors())
app.use(express.json())

// routes
app.use('/products', products)
app.use('/users', users)

// connect to mongodb
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB'))

// listen on port
app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})