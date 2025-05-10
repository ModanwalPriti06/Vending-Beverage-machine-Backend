const mongoose = require('mongoose');
const beverageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  ingredients: {
    water: {
      type: Number,
      required: true
    },
    milk: {
      type: Number,
      required: false, 
      default: 0       
    },
    coffee: {
      type: Number,
      required: true
    },
    sugar: {
      type: Number,
      required: true
    }
  }
});
const Beverage = mongoose.model('Beverage', beverageSchema);
module.exports = Beverage;
