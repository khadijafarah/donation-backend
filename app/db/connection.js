const mongoose = require('mongoose');
require('dotenv').config()
// mongoose.connect('mongodb://127.0.0.1:27017/test');

const connectionToDB = async () => {
    await mongoose.connect(process.env.DB_URI)
    .then(() => {
        console.log("Pinged your deployment. You Successfully connected to MongoDB!");  
    })
    .catch((error) => {console.log(error)})
}

module.exports = connectionToDB