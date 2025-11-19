import express from 'express';
import { createOrder, getOrders } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post("/create", createOrder);
orderRouter.get("/data", getOrders);

export default orderRouter