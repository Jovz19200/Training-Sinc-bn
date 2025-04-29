const express = require('express');
const { DocRouter } = require('./src/Docs/swagger');
const { HomeRoute } = require('./src/Routes/homeRoute');
const userRoutes  = require('./src/Routes/user.routes');
const trainingRoutes = require('./src/Routes/training.routes');
const categoriesRoutes = require('./src/Routes/categories.routes');
const feedbackRoutes = require('./src/Routes/feedback.routes');

const app = express();
port = process.env.PORT;
console.log("herreee");

app.use(express.json())


app.get('/', HomeRoute);

app.use('/api-docs', DocRouter);
app.use('/users', userRoutes);
app.use('/trainings', trainingRoutes);
app.use('/categories', categoriesRoutes);
app.use('/feedback', feedbackRoutes);

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
})
