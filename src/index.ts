import express from 'express';
import bodyParser from 'body-parser';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { connectDB } from './database';
import { setupRoutes } from './routes';

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

app.use(bodyParser.json());
connectDB();
setupRoutes(app, wss);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
