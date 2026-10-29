// Load environment variables from .env file
require("dotenv").config();

// Fix for a common Windows/Node issue where MongoDB's SRV DNS lookup times out.
// This tells Node to prefer IPv4 addresses when resolving hostnames.
const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

const express = require("express");
const cors = require("cors");
const http = require("http");
const connectDB = require("./config/db");
const initSocket = require("./utils/socket");

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors()); // allows our React frontend (different port) to call this API
app.use(express.json()); // lets us read JSON from request bodies (req.body)

// Simple health check route - visit this to confirm the server is alive
app.get("/", (req, res) => {
  res.json({ message: "ArtSync API is running" });
});

// Auth routes - signup and login
app.use("/api/auth", require("./routes/authRoutes"));

// User profile routes
app.use("/api/users", require("./routes/userRoutes"));

// Project routes
app.use("/api/projects", require("./routes/projectRoutes"));

// Collaboration request routes
app.use("/api/requests", require("./routes/requestRoutes"));

// Saved/bookmarked project routes
app.use("/api/saved", require("./routes/savedRoutes"));

// Notification routes
app.use("/api/notifications", require("./routes/notificationRoutes"));

// Chat message routes (history only - live sending happens over Socket.IO)
app.use("/api/messages", require("./routes/messageRoutes"));

const PORT = process.env.PORT || 5000;

// We wrap the Express app in a raw HTTP server so Socket.IO can attach to it
// alongside our normal REST routes, both sharing the same port.
const httpServer = http.createServer(app);

// Set up real-time chat
initSocket(httpServer);

httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
