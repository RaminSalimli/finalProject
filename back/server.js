import app from "./app.js";
import cloudinary from "cloudinary";
import http from "http";
import { Server } from "socket.io";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [process.env.FRONTEND_URL_ONE, process.env.FRONTEND_URL_TWO],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  }
});
 
const users = {};

io.on("connection", (socket) => {
  console.log("Yeni socket bağlantısı:", socket.id);
 
  socket.on("login", ({ userType, userId, roomId }) => {
    users[socket.id] = { userType, userId, roomId };
    socket.join(roomId);
    
    io.to(roomId).emit("message", {
      userId: "system",
      text: `${userType === "admin" ? "Admin" : "Hasta"} odaya katıldı.`
    });
  });
 
  socket.on("sendMessage", ({ roomId, text }) => {
    const user = users[socket.id];
    if (user && user.roomId === roomId) {
      io.to(roomId).emit("message", {
        userId: user.userId,
        text,
        userType: user.userType
      });
    }
  });
 
  socket.on("disconnect", () => {
    const user = users[socket.id];
    if (user) {
      io.to(user.roomId).emit("message", {
        userId: "system",
        text: `${user.userType === "admin" ? "Admin" : "Hasta"} ayrıldı.`
      });
      delete users[socket.id];
    }
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server ${process.env.PORT} portunda çalışır`);
});