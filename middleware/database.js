// const mongoose = require('mongoose');
// const connectDB = require('../models/modelConfig');
// const { initializeGridFS } = require('./multiGridFS'); // Import GridFS initialization

// const checkDB = async (req, res, next) => {
//   if (mongoose.connection.readyState === 1) { // Already connected
//     console.log('_____database Already Connected____');
//     return next();
//   }

//   try {
//     if (mongoose.connection.readyState === 0) { // Not connected
//         connectDB();
//     }
//     mongoose.connection.once('open', () => {
//       console.log('_____database Connected____');
//       initializeGridFS(); // Initialize GridFS after successful DB connection
//       next();
//     });

//   } catch (error) {
//     console.error('Database connection error:', error);
//     res.status(500).render('templates/error/500');
//   }
// };

// module.exports = checkDB;
















// const mongoose = require('mongoose')
// const connectDB = require('../models/modelConfig')

// const checkDB = async (req, res, next) => {
//   if (mongoose.connection.readyState === 1) { // Already connected
//     console.log('_____database Already Connected____');
//     return next();
//   }

//   try {
//     if (mongoose.connection.readyState === 0) { // Not connected
//         connectDB();
//     }
//     mongoose.connection.once('open', () => {
//       console.log('_____databaseConnected____');
//       next();
//     });

//   } catch (error) {
//     console.error('Database connection error:', error);
//     res.status(500).render('templates/error/500');
//   }
// };

// module.exports = checkDB;
