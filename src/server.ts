import express, { Application } from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db";
import { createBoard, getBoard } from "./controllers/board";

dotenv.config();

const app: Application = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.post("/api/board", createBoard);
app.get("/api/board/:id", getBoard);

// Socket.IO logic
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join-board", (boardId: string) => {
    socket.join(boardId);
    console.log(`User ${socket.id} joined board ${boardId}`);
    socket.to(boardId).emit("user-joined", socket.id);
  });

  socket.on("draw-data", (data: { boardId: string; drawingData: any }) => {
    const { boardId, drawingData } = data;
    socket.to(boardId).emit("draw-data", drawingData);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Start Server
const PORT = process.env.PORT || 4022;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
