const express = require('express');
const { DocRouter } = require('./src/Docs/swagger');
const { HomeRoute } = require('./src/Routes/homeRoute');
const userRoutes  = require('./src/Routes/user.routes');

const app = express();
port = 3030;

app.use(express.json())


app.get('/', HomeRoute);

app.use('/api-docs', DocRouter);
app.use('/users', userRoutes);

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
})