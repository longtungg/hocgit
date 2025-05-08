const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const cors = require('cors');
require('dotenv').config();
const { UserRouter, BookRouter, BorrowRouter, StatisticRouter, CategoryRouter } = require('./route/index.js');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swaggerconfig.js');


const apiRoute = "/libary";
const port = 3000;
const connection = require('./config/db.js');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.get("/", (req, res) => {
    res.render('upload.ejs');
})


app.use(bodyParser.json({ extend : true }));
app.use(bodyParser.urlencoded({ extended: true, limit : "50mb" }));


app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(apiRoute, UserRouter);
app.use(apiRoute, BookRouter);
app.use(apiRoute, BorrowRouter);
app.use(apiRoute, StatisticRouter);
app.use(apiRoute, CategoryRouter);
app.listen(port, '0.0.0.0', () => {
    console.log(`Server đang khởi chạy tại port ${port}`);
});
