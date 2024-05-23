import { Request, Response } from 'express';
import { Vehicle } from './models';

export const createVehicle = async (req: Request, res: Response) => {
  try {
    const vehicle = new Vehicle(req.body);
    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateVehicle = async (req: Request, res: Response) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }
    res.json(vehicle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteVehicle = async (req: Request, res: Response) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }
    res.json({ message: 'Vehicle deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const markAsSold = async (req: Request, res: Response) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, { status: 'sold' }, { new: true });
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }
    res.json(vehicle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Polling mechanisms will be implemented here
