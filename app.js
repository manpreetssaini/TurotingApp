const express = require ('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const fileUpload = require('express-fileupload');
const defaultErrorHandler = require('./server/middleware/errorHandler');
const authenticate = require('./server/middleware/authentication');
require('dotenv').config();

const routes = require('./server/routes')
const loginRouter = require("./server/routes/login");
const registerRouter = require("./server/routes/register");
const dashboardRouter = require("./server/routes/dashboard");


const app = express();


const port = 3000;

// // const db = mysql.createConnection({debug: ['ComQueryPacket', 'RowDataPacket']});
// const db = mysql.createConnection({
//   // Replace with user-appropriate values
//   host: 'localhost',
//   user: 'root',
//   password: 'password',
//   database: 'tutors_db',
//   insecureAuth: true
// });

// db.connect((err) => {
//   if(!err) {
//     console.log("Connected");
//   } 
//   else {
//     throw(err)
//   }
// });

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure:false,
        maxAge: 7200000,
        httpOnly: true,
    },
}));


app.set("port", process.env.port || port);
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use(fileUpload());
app.use(authenticate.parseUser);
app.use(defaultErrorHandler);


app.use('/', routes);
app.use('/', loginRouter);
app.use('/', registerRouter);
app.use('/', dashboardRouter);
  
  app.listen(port, () => {
      console.log(`Server running on port: ${port}`);
  });
  