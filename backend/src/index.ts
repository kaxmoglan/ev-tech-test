import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import { handleGetAllClients } from './controllers/handleGetAllClients';
import { handleCreateNewClient } from './controllers/handleCreateNewClient';

// Config
dotenv.config();
const { HTTP_PORT } = process.env;

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Routes
app.get(`/`, handleGetAllClients);
app.post(`/`, handleCreateNewClient);

// Init
app.listen(HTTP_PORT, () => {
	console.log(`Server started on port ${HTTP_PORT}`);
});
