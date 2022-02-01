const express = require("express")
const cors = require("cors")

require('dotenv').config(); //so that we can read the information about our secret key which is stored in the .env file
const cookieParser = require('cookie-parser'); //so that the server can understand the cookie information coming in from the client (browser)

const app = express(); 
const port = 8000;

app.use(express.json())
app.use(express.urlencoded({extended:true})) 
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser());



require("./server/config/mongoose.config")



require('./server/routes/user.routes')(app)



app.listen( port, () => console.log(`Listening on port: ${port}`) );