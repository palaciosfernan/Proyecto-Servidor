import { Application, Request, Response } from 'express';
import { WebSocketServer } from 'ws';
import { createVehicle, updateVehicle, deleteVehicle, markAsSold } from './controllers';

export const setupRoutes = (app: Application, wss: WebSocketServer) => {
  app.post('/vehicles', createVehicle);
  app.put('/vehicles/:id', updateVehicle);
  app.delete('/vehicles/:id', deleteVehicle);
  app.patch('/vehicles/:id/sold', markAsSold);

  // Short Polling
  app.get('/polling/short', async (req: Request, res: Response) => {
    try {
      const vehicles = await Vehicle.find();
      res.json(vehicles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Long Polling
  app.get('/polling/long', async (req: Request, res: Response) => {
    const checkForUpdates = async () => {
      const vehicles = await Vehicle.find();
      if (vehicles.length > 0) {
        res.json(vehicles);
      } else {
        setTimeout(checkForUpdates, 5000);
      }
    };
    checkForUpdates();
  });

  // WebSocket
  wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('message', (message) => {
      console.log(`Received message => ${message}`);
      // Handle messages
    });

    ws.on('close', () => {
      console.log('Client disconnected');
    });
  });

  // Notify WebSocket clients on data change
  const notifyClients = () => {
    wss.clients.forEach((client) => {
      if (client.readyState === client.OPEN) {
        client.send('update');
      }
    });
  };

  // Integrate notifyClients in create, update, delete, markAsSold
};
