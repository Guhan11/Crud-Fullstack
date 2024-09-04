const express = require("express");

const app = express();
const port = 8000;

//Display All Users
// app.get("/users",(req,res)=>{
//     return res.json(users);
// });

app.listen(port,(err)=>{
    console.log(`App is running in port${port}`);
});

