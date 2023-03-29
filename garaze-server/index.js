import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from "./mongodb/connect.js";
import userRoutes from "./routes/user.routes.js";
import parkingSpaceRoutes from "./routes/parkingSpace.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.get('/', (req, res) => {
    res.send({ message: 'Hello world'});
})

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/parking-spaces', parkingSpaceRoutes);

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL)

        app.listen(8080,() => console.log('Server started on port 8080'))
    } catch (error) {
        console.log(error);
    }
}

startServer()
