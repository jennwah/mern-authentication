const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require("passport");
const db = require('./config/key')
const userRoutes = require('./routes/user');

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

//connect to mongoDB database
mongoose.connect(db.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('DB connected!'))
.catch((err) => console.err(err));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

//ROUTES 
app.use('/api', userRoutes);


app.get('/', function (req, res) {
    res.send('balbalbal')
})
   
const port = process.env.PORT || 5000;

app.listen(port, ()=> {
    console.log(`Server running on port ${port}!`)
}); 