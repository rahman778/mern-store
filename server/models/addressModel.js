import mongoose from "mongoose";

// Address Schema
const addressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String
  },
  isDefault: {
    type: Boolean,
    default: false
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});


const Address = mongoose.model("Address", addressSchema);

export default Address;

