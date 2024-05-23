
import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  brand: String,
  model: String,
  year: Number,
  bodyType: String,
  color: String,
  mileage: Number,
  price: Number,
  status: String,
});

export const Vehicle = mongoose.model('Vehicle', vehicleSchema);
