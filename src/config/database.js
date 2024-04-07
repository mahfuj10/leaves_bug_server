const mongoose = require('mongoose');

const connectToDB = async () => {
    console.log('DB connecting .... 😣');
    try {
        
        await mongoose.connect(process.env.DB_URL);

        console.log('DB connected .... 😀');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

module.exports = {
    connectToDB
}

