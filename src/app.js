const express = require('express');
const cors = require('cors');
const { connectToDB } = require('./config/database');
const { initializeSocket } = require('./config/socket');
require("dotenv").config();
const http = require('http');
const routes = require('./routes/index.route');

const app = express();
const port =  process.env.PORT || 9000;
const server = http.createServer(app);


// Middleware
app.use(express.json());
app.use(cors());

// initialize socket.io
initializeSocket(server);

// Routes
app.use('/api', routes);

async function run() {
    try {
        await connectToDB()
    }
    catch (err) {
        console.log(err)
    }
}

run().catch(e => console.log(e)).finally()
 
// Default route
app.get('/', (req, res) => {
    res.send("Not authorized")
});

// Start server
server.listen(port, () => {
    console.log("my server is runningin port", port)
})
