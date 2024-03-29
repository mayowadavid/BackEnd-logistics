const express = require('express');
const env = require('dotenv');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const path = require("path");




//routes
const authRoutes = require('./src/routes/auth');
const adminRoutes = require('./src/routes/admin/auth');
const adminRequest = require('./src/routes/admin/request');
const addRequest = require('./src/routes/request');
const profileRoute = require('./src/routes/profile');
const galleryRoute = require('./src/routes/gallery');
// const jsonParser = bodyParser.json();
// const urlencodedParser = bodyParser.urlencoded({ extended: false})
//environment variable 
env.config();

//connect to Mongo
mongoose
// .connect(`mongodb://localhost:27017/logistics`,
.connect(`mongodb+srv://${process.env.User}:${process.env.Password}@cluster0.gjsj8.mongodb.net/${process.env.Database}?retryWrites=true&w=majority`,
{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));


app.use(cors());
//MiddleWare
// app.use(jsonParser);
app.use(express.json());

const port = process.env.PORT || 5000
app.use('/public', express.static('uploads') );
app.use('/api', profileRoute);
app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', adminRequest);
app.use('/api', addRequest);
app.use('/api', galleryRoute);
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});