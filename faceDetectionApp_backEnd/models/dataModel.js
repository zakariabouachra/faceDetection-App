const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    name: String,
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Presence', DataSchema);
