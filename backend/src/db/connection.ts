import { connect, disconnect } from "mongoose";
async function connectToDatabase() {
  try {
    const url = process.env.MONGODB_URL;
    if (!url) {
      throw new Error("MONGODB_URL is not defined");
    }
    await connect(url);
  } catch (error) {
    console.log(error);
    throw new Error("Could not Connect To MongoDB");
  }
}

async function disconnectFromDatabase() {
  try {
    await disconnect();
  } catch (error) {
    console.log(error);
    throw new Error("Could not Disconnect From MongoDB");
  }
}

export { connectToDatabase, disconnectFromDatabase };
