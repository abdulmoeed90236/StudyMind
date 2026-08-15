import mongoose from 'mongoose';

let isConnected = false;
let isConnecting = false;
let lastConnectAttempt = 0;
let dbStatusMessage = 'Initializing...';

export async function connectToDatabase(): Promise<boolean> {
  if (isConnected && mongoose.connection.readyState === 1) {
    return true;
  }

  // If currently connecting, wait briefly without triggering redundant connections
  if (isConnecting) {
    return isConnected;
  }

  // Prevent spamming connection attempts if recent attempt failed (< 15 seconds cooldown)
  const now = Date.now();
  if (!process.env.MONGODB_URI && now - lastConnectAttempt < 15000 && lastConnectAttempt !== 0) {
    return false;
  }

  lastConnectAttempt = now;
  isConnecting = true;

  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/studymind';

  try {
    // Set fast connection timeout so API requests never hang
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 1500,
      connectTimeoutMS: 1500,
      bufferCommands: false,
    });

    isConnected = true;
    isConnecting = false;
    dbStatusMessage = `Connected to MongoDB at ${mongoUri.replace(/:[^:@]+@/, ':***@')}`;
    console.log(`[MongoDB] ${dbStatusMessage}`);
    return true;
  } catch (error: any) {
    isConnected = false;
    isConnecting = false;
    dbStatusMessage = `MongoDB not connected (${error.message || 'offline'}). Running high-performance fallback store.`;
    return false;
  }
}

export function getDbStatus() {
  return {
    isConnected: isConnected && mongoose.connection.readyState === 1,
    status: dbStatusMessage,
    readyState: mongoose.connection.readyState,
  };
}

