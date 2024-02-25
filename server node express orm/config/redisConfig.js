const redis = require('redis');

// Function to create and return a Redis client
const createClient = () => {
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

    return client;
};


module.exports = {
    createClient
};
