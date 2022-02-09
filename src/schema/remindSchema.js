const mongoose = require("mongoose");
const remindSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    memberId: String,
    reason: String,
    createdAt: Number,
    sendAt: Number
})
module.exports = mongoose.model('Reminder',remindSchema, 'reminders')