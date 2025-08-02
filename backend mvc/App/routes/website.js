let express=require('express')
const { authentication } = require('./web/auth')

let website=express.Router()


website.use('/auth',authentication)

module.exports={website}


//http://localhost:8000/website/auth