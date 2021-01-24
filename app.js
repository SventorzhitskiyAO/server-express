const express = require('express');
const bodyParser = require('body-parser');
// const User = require('./models/users.model');
const usersRouter = require('./routes/users.routes');
const authRouter = require('./routes/auth.routes');
const sequelize = require("./services/dbConnect")

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/users', usersRouter);
app.use('/auth', authRouter);

sequelize.sync().then(()=>{
    app.listen(3000, function(){
        console.log(`Server running at http://localhost:3000`);
    });
})