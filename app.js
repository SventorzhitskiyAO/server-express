const express = require('express');
const bodyParser = require('body-parser');
const connect = require('./services/dbConnect');
const usersRouter = require('./routes/users.routes');
const authRouter = require('./routes/auth.routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/users', usersRouter);

app.use('/auth', authRouter);

connect.then(() => app.listen(3000, () => {
    console.log(`Server running at http://localhost:3000`);
}))