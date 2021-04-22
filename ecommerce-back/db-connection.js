const mongoose = require('mongoose')

async function main(){
    await mongoose.connect(process.env.MONGODB || 'mongodb://localhost/ecommerce',{useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify:true, useCreateIndex:true})
    console.log('DB Connected')
}

main()