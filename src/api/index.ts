import express from 'express';
import dotenv from 'dotenv';
import { errorHandler } from './filter/errorHandler';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res) => {});

app.use(errorHandler);
