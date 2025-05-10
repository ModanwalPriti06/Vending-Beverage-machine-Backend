const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  name:{
    type: String,
    default: ''
  },
  value: {
    type: Number,
    required: true, 
    default: 0
  }
}, { timestamps: true });

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;

