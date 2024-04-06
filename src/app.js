const express = require('express');
const cors = require('cors');

require("dotenv").config();


const app = express();
const port =  process.env.PORT || 9000;

//middleware
app.use(express.json());
app.use(cors());

// import router

async function run() {
    try {

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

// call route
app.use(emailRoute)


app.listen(port, () => {
    console.log("my server is runningin port", port)
})