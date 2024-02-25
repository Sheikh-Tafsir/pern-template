const express = require("express");
const app = express();
const cors = require("cors");
//const http = require('http');
//const pool = require('./config/dbConfig')
//const sequelize = require('./config/sequalizeConfig')
//const redisConfig = require('./config/redisConfig');
const redis = require('redis');
//const socketConfig = require("./config/socket/socketConfig"); // Import the Socket.IO configuration
//const pubnub = require('./config/pubnub/pubnubConfig');

require("dotenv").config();


var corsOptions = {
  origin: process.env.CORS_ALLOWED_ORIGINS || "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Add the HTTP methods you need
  allowedHeaders: ["Content-Type", "Authorization"], // Add the headers you want to allow
};

// Then use corsOptions in your CORS middleware setup
app.use(cors(corsOptions));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

const client = redis.createClient({
  host: 'redis', // Replace with your Redis server address
  port: 6379,
});

// Connect to the Redis server
client.on('connect', () => {
  console.log('Connected to Redis server');
});

// Error handling
client.on('error', (err) => {
  console.error('Error connecting to Redis:', err);
});

app.use("/user", require("./src/user/routes/userRoute"));
app.use("/project", require("./src/project/route/projectRoute"));
// app.use("/api/products", require("./src/routes/product/productRoute"));
// app.use("/api/chats", require("./src/routes/chat//chatRoute2"));

//this part is for socket io, when use it change the app.listen to server.listen
// Import the Socket.IO configuration and pass the HTTP server to it
//const server = http.createServer(app);
//socketConfig(server);

// Start the server on a specific port (e.g., 3000).
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
