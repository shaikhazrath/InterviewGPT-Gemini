import express from 'express';
import cors from 'cors';
import Interview from './routes/interview.js';
import User from './routes/userRouter.js'
import mongoose from 'mongoose';
import { config } from 'dotenv';


const app = express();

app.use(cors());

app.use(express.json());
config({path:'.env'})

app.use('/', Interview);
app.use('/user',User)

mongoose
  .connect(process.env.DB)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

app.listen(9000, () => {
  console.log(`Server started on port 9000`);
});