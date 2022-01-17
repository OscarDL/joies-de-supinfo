const mongoose = require('mongoose');


const connectDB = async () => {
  mongoose.connect(process.env.DB_URL).then(
    () => console.log('MongoDB connected')
  );
};


module.exports = connectDB;
