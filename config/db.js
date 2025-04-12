import mongoose from 'mongoose';

const connectDB = async () => {
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        retryWrites: true,
        retryReads: true,
    };

    let retries = 5;
    while (retries) {
        try {
            await mongoose.connect(process.env.MONGODB_URI, options);
            console.log('MongoDB connected');
            return;
        } catch (error) {
            console.error(`MongoDB connection error (${retries} retries left):`, error);
            retries--;
            await new Promise(res => setTimeout(res, 5000));
        }
    }

    console.error('Could not connect to MongoDB after multiple retries');
    process.exit(1);
};

mongoose.connection.on('error', err => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

export default connectDB;