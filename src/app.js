const express = require('express');
const cors = require('cors');
const { connectToDB } = require('./config/database');
var requestIp = require('request-ip');

require("dotenv").config();


const app = express();
const port =  process.env.PORT || 9000;

//middleware
app.use(express.json());
app.use(cors());
app.use(requestIp.mw());


async function run() {
    try {

        await connectToDB()

    }
    catch (err) {
        console.log(err)
    }
    finally {

    }
}

run().catch(e => console.log(e)).finally()
 

// import route
const emailRoute = require('./routes/email.route');
const userRoute = require('./routes/user.route');

// call route
app.use('/email', emailRoute)
app.use('/user', userRoute)

 
var ipMiddleware = function(req, res, next) {
    var clientIp = requestIp.getClientIp(req); // on localhost > 127.0.0.1
    // next();
};
app.get('/', (req, res) => {
//     const coords = getLatitudeLongitude('27.147.176.58');
// if (coords) {
//     console.log('Latitude:', coords.latitude);
//     console.log('Longitude:', coords.longitude);
// } else {
//     console.log('Failed to get location.');
// }

    res.send(`Your IP address is: ${req.socket.remoteAddress} and ${req.socket.localAddress}`);
});

app.listen(port, () => {
   
    console.log("my server is runningin port", port)
})