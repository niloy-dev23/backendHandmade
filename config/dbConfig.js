const mongoose = require('mongoose')
let databaseURL = process.env.DB_URL
const dbConfig = ()=>{
    mongoose.connect(databaseURL).then(()=>{
        console.log('Database Connected')
    })
}

module.exports = dbConfig