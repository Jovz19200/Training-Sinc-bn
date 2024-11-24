const express = require('express');
const app = express();
port = 3030;

app.get('/', (req, res)=>{
    res.send('This is the base route');
})

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
})