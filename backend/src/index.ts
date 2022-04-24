import express from 'express';
import dotenv from 'dotenv';
import { handleGetAllClients } from './controllers/handleGetAllClients';

// Config
dotenv.config();
const { HTTP_PORT } = process.env;

const app = express();

// Routes
app.get(`/`, handleGetAllClients);

// Init
app.listen(HTTP_PORT, () => {
	console.log(`Server started on port ${HTTP_PORT}`);
});
