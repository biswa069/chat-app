// import express from 'express';
// import dotenv from 'dotenv';
// import connectDb from './config/db.js';
// import chatRoutes from './routes/chat.js';

// dotenv.config();

// connectDb();

// const app = express();

// app.use(express.json());

// app.use("/api/v1", chatRoutes);

// const port  = process.env.PORT;

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });

import express from "express";
import chatRoutes from "./routes/chat.js";
import connectDb from "./config/db.js";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import jwt from "jsonwebtoken"; // Import JWT

dotenv.config();

interface CustomSocket extends Socket {
  user?: any; // Or use your actual User interface here if you have one
}

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"],
  },
});

// Make 'io' accessible
app.set("io", io);

const port = process.env.PORT || 5002;
app.use(express.json());

connectDb();

// 🔥 SECURE HANDSHAKE MIDDLEWARE
// This runs BEFORE the connection is fully established
io.use((socket: CustomSocket, next) => {
  // 1. Get the token from the client's handshake auth object
  const token = socket.handshake.auth.token;

  if (!token) {
    return next(new Error("Authentication error: No token provided"));
  }

  try {
    // 2. Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    
    // 3. Attach user info to the socket instance for later use
    // (You might need to extend the Socket type interface for TypeScript to stop complaining, 
    // or just use 'any' for now to test)
    socket.user = decoded; 
    
    next(); // Allow connection
  } catch (err) {
    next(new Error("Authentication error: Invalid token"));
  }
});

app.use("/api/v1", chatRoutes);

// Connection Logic (Only runs if Middleware passed)
io.on("connection", (socket: CustomSocket) => {
  // Now we know EXACTLY who this user is!
  const user = socket.user;
  console.log(`✅ User Connected: ${user._id} (Socket: ${socket.id})`);

  socket.on("join_chat", (chatId) => {
    socket.join(chatId);
    console.log(`User ${user._id} joined room: ${chatId}`);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});