import express from 'express';
import redis from 'redis';
import mongoose from 'mongoose';
import signale from 'signale';
import apiRoute from './routes';
import config from './config';

// Initialize app.
const app = express();

// Initialize redis client.
const redisClient = redis.createClient({
  ...config.redis,
});
app.locals.redis = redisClient;
// Connect MongoDB.
mongoose.connect(config.mongodbConnection, { useNewUrlParser: true, useUnifiedTopology: true });

// Routes.
app.get('/', (req, res) => res.send('<p>👋 Xin chào</p>'));
app.use('/api', apiRoute);

// Start server.
app.listen(config.port, () => signale.info(`Server started on http://localhost:${config.port}`));
