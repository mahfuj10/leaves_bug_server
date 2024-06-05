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
const emailRoute = require('./routes/email.route');
const userRoute = require('./routes/user.route');
const teamRoute = require('./routes/team.route');
const projectRoute = require('./routes/project.route');
const taskRoute = require('./routes/task.route');
const chatRoute = require('./routes/chat.route');
const whiteboardRoute = require('./routes/whiteboard.route');
const notesRoute = require('./routes/notes.route');

app.use('/email', emailRoute)
app.use('/user', userRoute)
app.use('/team', teamRoute)
app.use('/project', projectRoute)
app.use('/task', taskRoute)
app.use('/chat', chatRoute)
app.use('/whiteboard', whiteboardRoute)
app.use('/notes', notesRoute)
// app.use('/api', routes);

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
app.get('/home', (req, res) => {
    res.send("this is an home")
});

// Start server
server.listen(port, () => {
    console.log("my server is runningin port", port)
})
