const express = require('express')
const cors = require('cors') ;
const errorHandler = require("./middleware/errorHandler")
const cartRotes = require("./routes/cartRoutes")
const checkOutRoutes = require("./routes/checkoutRoutes")

let port = 3050
const app = express()
app.use(express.json())
app.use(cors());

app.use('/api/item' ,cartRotes)
app.use('/api/checkout' ,checkOutRoutes)

app.use(errorHandler)
app.listen( port,
    () => {
        console.log("server started" , port)
    }
)