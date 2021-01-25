const express = require('express');
const bodyParser = require('body-parser');
const connect = require('./services/dbConnect');
const usersRouter = require('./routes/users.routes');
const authRouter = require('./routes/auth.routes');
const multer = require("multer");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/users', usersRouter);

app.use('/auth', authRouter);

// const upload = multer({dest:"img/"});

// app.post("/upload/:id", upload.single("img"), function (req, res, next) {
//     console.log(req.file);
//     res.header({'Content-Type': 'image/jpeg'} )
//     res.sendFile(__dirname + '/' + req.file.path);
//     // if(!filedata)
//     //     res.send("Ошибка при загрузке файла");
//     // else
//     //     res.send("Файл загружен");
// });


connect.then(() => app.listen(3000, () => {
    console.log(`Server running at http://localhost:3000`);
}))
