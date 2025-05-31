const express = require('express');
const app = express();
const connectDb = require('./config/dbConnection');
const dotenv = require('dotenv').config();


const port  = process.env.PORT || 5000 ;


app.use(express.json());            


connectDb();
app.get('/', (req, res) => {
  res.send('Hello World!');
});
   

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});  
