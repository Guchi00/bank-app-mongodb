import mongoose from 'mongoose';

export const initializeDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(`${process.env.DATABASE_URL}`);
    console.log(`mongoDB connected: ${conn.connection.host}`)

  } catch (error) {
      console.log(error);
      process.exit(1)
  }
};
