//Require de todo lo que necesitamos para el proyecto
const express = require("express");
const path = require('path');
const app = express();
const mainRouter = require("./routers/mainRouter");
const productsRouter = require("./routers/products")
const usersRouter = require("./routers/users");
const brandsRouter = require("./routers/brands");
const modelsRouter = require("./routers/models");
const methodOverride = require('method-override');
const session = require('express-session');
const cookies = require('cookie-parser');
const userLoggedMW = require('./middlewares/userLoggedMiddleware');

//cookies & session
app.use(
    session({
        secret: 'Inicio de session',
        resave: false,
        saveUninitialized: false,
    })
);
app.use(cookies());
app.use(userLoggedMW);
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();

    app.options('*', (req, res) => {
        res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
        res.send();
    });
});

//Seteo para usar EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
//Config de METHOD para otros métodos
app.use(methodOverride('_method'));
//Config para que reciba por POST
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//Declaración de ruta public
app.use(express.static(path.join(__dirname, "../public")));
//Ejecución de Node en la puerto 3001
app.listen(3001, () => {
    console.log("El servidor de prendio en el puerto:3001");
});
//Configuración de Routers
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/models", modelsRouter);
app.use("/brands", brandsRouter);
app.use("/", mainRouter);