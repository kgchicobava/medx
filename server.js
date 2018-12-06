const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
// Routes
const doctors = require("./routes/doctors");
const patients = require("./routes/patients");
const api = require("./routes/api");

const app = express();

// body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Connection to database
const mongoURI = require("./config/keys").mongoURI;
mongoose.connect(mongoURI, { useNewUrlParser: true })
        .then(() => console.log("Connected to MongoDB"))
        .catch((err) => console.log(err));


app.use(passport.initialize());
require("./config/passport")(passport);
// Use routers
app.use("/api/user", api);
app.use("/api/patients", patients);
app.use("/api/doctors", doctors);



// If in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  };


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server is started on ${PORT}`));

