import * as mongoose from "mongoose";
export async function connectToMongoDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI || '');
        console.log('DataBase Connected SuccessFully')
      } catch (error) {
        console.error(error)
        process.exit(1)
      }
  }
