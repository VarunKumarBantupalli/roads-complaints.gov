const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const connectDb = require('./config/dbConnection');
const uploadRoutes = require('./routes/upload');
const dotenv = require('dotenv').config();


const port  = process.env.PORT || 5000 ;
connectDb();

app.use(express.json());
app.use('/api', uploadRoutes);
app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});  
