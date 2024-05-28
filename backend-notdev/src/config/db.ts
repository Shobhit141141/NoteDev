import mongoose, { ConnectOptions } from 'mongoose';
interface ConnectionOptions extends ConnectOptions {
    useNewUrlParser: boolean;
    useUnifiedTopology: boolean;
  }
const connectDB = async () => {
  try {
    const options: ConnectionOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/dsa-notes',options);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

export default connectDB;
