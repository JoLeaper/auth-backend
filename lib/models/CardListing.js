const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  cardName: {
    type: String,
    required: true
  },

  cardRarity: {
    type: String,
    required: true
  },

  cardCost: {
    type: Number,
    required: true
  },

  cardQuantity: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('CardListing', schema);
