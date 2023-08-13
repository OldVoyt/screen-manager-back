import mongoose from 'mongoose';
import {
  MONGODB_URI
} from '../../shared/constants/database.constants';


const options: mongoose.ConnectOptions = {
  keepAlive: true,
};

mongoose.set('strictQuery', true);

export const database = () =>
  mongoose
    .connect(MONGODB_URI, options)
    .then((connection) => {
      process.stdout.write('MongoDB Connected!\n');
      return connection;
    })
    .catch((err) => {
      process.stdout.write(JSON.stringify(err));
      process.exit(1);
    });

export default database;
