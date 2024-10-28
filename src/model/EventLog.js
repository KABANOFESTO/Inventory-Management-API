const mongoose = require('mongoose');

const eventLogSchema = new mongoose.Schema({
    action: { type: String, required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('EventLog', eventLogSchema);