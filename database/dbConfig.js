const mongoose = require('mongoose');



const dbConfig = async () => {
    try {
        await mongoose.connect(process.env.DB_CONECCTION);
        console.log('connect');
    } catch (error) {
        console.log(error);
    }
}

module.exports = dbConfig