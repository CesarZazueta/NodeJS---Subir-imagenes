const express = require('express');
const { restart } = require('nodemon');
const path = require('path');

const multer = require('multer');

//Inicializamos el framework
const app = express();

//Para configurar el puerto
app.set('port',4000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//Middleware


//Multer

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: function (req, file, cb) {
        cb(null, file.originalname);
      }
});

app.use(multer({
    storage: storage,
    dest: path.join(__dirname, 'public/uploads'),
    limits: {fileSize: 2097152},
    fileFilter: (req,file,cb) => {
        const filetype = /jpeg|jpg|png|gif/;
        const mimetype = filetype.test(file.mimetype);
        const extname = filetype.test(path.extname(file.originalname));
    }
}).single('imagens')
);



//Rotutes
app.use(require('./routes/index.routes'))

//Static Files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), () => {
    console.log(`Servidor conectado en el puerto ${app.get('port')}`);
});