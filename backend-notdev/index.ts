import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/config/db';
import questionRoutes from './src/routes/questionRoutes';
import dsaTopicRoutes from './src/routes/dsaTopicRoutes';
import bodyParser from 'body-parser';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

// Enable CORS

app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/questions', questionRoutes);
app.use('/api/topics', dsaTopicRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
