import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import { createClient } from 'redis';
import userRouter from './routes/user.js';
import { connectRabbitMQ } from './config/rabbitmq.js';
import cors from 'cors';
dotenv.config();
connectDb();
connectRabbitMQ();
if (!process.env.REDIS_URL) {
    throw new Error("REDIS_URL is not defined in .env file");
}
export const redisClient = createClient({
    url: process.env.REDIS_URL,
});
redisClient.connect().then(() => console.log("Connected to Redis successfully")).catch(console.error);
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/v1", userRouter);
const port = process.env.PORT;
;
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
//# sourceMappingURL=index.js.map