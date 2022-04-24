import express from 'express';
import dotenv from 'dotenv';

// Config
dotenv.config();
const { HTTP_PORT } = process.env;

const app = express();

// Routes
app.get(`/`, (req, res) => res.send(`hello friend`));

// Init
app.listen(HTTP_PORT, () => {
	console.log(`Server started on port ${HTTP_PORT}`);
});
