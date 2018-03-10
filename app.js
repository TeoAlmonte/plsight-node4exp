/*jshint esversion: 6 */

const express = require('express');
const exphbs  = require('express-handlebars');
const path = require('path');
const app = express();
const sql = require('mssql');
const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');
const session = require('express-session');

const index = require('./routes/index');
const admin = require('./routes/admin');
const auth = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({secret: 'library'}));
// Passports
require('./config/passport')(app);


const config = {
  user: 'adminaccount',
  password: 'password10!',
  server: 'sample-db.database.windows.net', // You can use 'localhost\\instance' to connect to named instance
  database: 'sample-db',

  options: {
      encrypt: true // Use this if you're on Windows Azure
  }
};

sql.connect(config, (err) => {
  if(err) {
    console.log(err);
  } else {
    console.log('connected to azure');
  }
});

app.use(express.static(path.join(__dirname, 'public')));
app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs');


// Routes
app.use('/', index);
app.use('/admin', admin);
app.use('/auth', auth);

const port = 5000;
app.listen(port, (err) =>{
  console.log(`running on ${port}`);
});