import mongoose, { connection } from 'mongoose';

const conn = {
  isConnected: false,
};

export async function dbConnect() {
  if (conn.isConnected) return;
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to ${db.connection.db.databaseName} database`);
    conn.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.error("Error connecting to database:", error.message);
  }
}

// const connection = mongoose.connection;

// // connection.on("connected", () => console.log("Mongodb connected to db"));

// connection.on("error", (err) => console.error("Mongodb Error:", err.message));