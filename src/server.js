import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import clientRoutes from './routes/client.routes.js';
import cakeRoutes from './routes/cake.routes.js';
import orderRoutes from './routes/order.routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(clientRoutes);
app.use(cakeRoutes);
app.use(orderRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Running server in port ${PORT}`));