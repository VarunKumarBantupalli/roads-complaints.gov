const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const connectDb = require('./config/dbConnection');
const uploadRoutes = require('./routes/upload');
const complaintRoutes = require('./routes/complaints');
const responseRoutes = require('./routes/responses');
const cors = require("cors");
const dotenv = require('dotenv').config();


const port  = process.env.PORT || 5000 ; 
connectDb();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use('/api', uploadRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/responses', responseRoutes);



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});  
