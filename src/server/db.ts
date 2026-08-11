import mongoose from 'mongoose';

let isConnected = false;
let dbStatusMessage = 'Initializing...';

export async function connectToDatabase(): Promise<boolean> {
  if (isConnected) {
    return true;
  }

  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/studymind';

  try {
    // Set connection options with short timeout so server boots instantly
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 3000,
      connectTimeoutMS: 3000,
    });

    isConnected = true;
    dbStatusMessage = `Connected to MongoDB at ${mongoUri.replace(/:[^:@]+@/, ':***@')}`;
    console.log(`[MongoDB] ${dbStatusMessage}`);
    return true;
  } catch (error: any) {
    isConnected = false;
    dbStatusMessage = `MongoDB not connected (${error.message || 'connection failed'}). Running in fallback mode.`;
    console.warn(`[MongoDB Warning] ${dbStatusMessage}`);
    return false;
  }
}

export function getDbStatus() {
  return {
    isConnected,
    status: dbStatusMessage,
    readyState: mongoose.connection.readyState,
  };
}
