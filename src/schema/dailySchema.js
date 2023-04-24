const mongoose = require('mongoose');

const dailySchema = new mongoose.Schema({
    userID: {type: String},
    lastUpdated: {type: Date, default: new Date()},
})
module.exports = new mongoose.model('daily',dailySchema,'Daily'); 