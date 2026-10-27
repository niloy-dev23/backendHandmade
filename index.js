const dns = require('node:dns')
require('dotenv').config()
var cors = require('cors')
const express = require('express')
const port = process.env.PORT
const app = express()
app.use(express.json())
app.use(cors())
let dashboardLogin = require('./controller/dashboardLogin.js')
let dashboardMiddlware = require('./middleware/dashboardMiddleware.js')
let dbConfig = require('./config/dbConfig.js')
dbConfig()

dns.setServers(['8.8.8.8','1.1.1.1'])
const route = require('./routes/index.js')
app.use(route)

app.listen(port, ()=>{
    console.log('Server is running on port:', port)
})