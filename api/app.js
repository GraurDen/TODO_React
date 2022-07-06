require('dotenv').config();
const recursive = require('recursive-readdir-sync');
const express = require('express');
const cors = require('cors');
const port = process.env.PORT;
const app = express();
const sequelize = require('./database');
const i18next = require('i18next');
const Backend = require('i18next-fs-backend');
const i18nextMiddleware = require('i18next-http-middleware');

i18next
    .use(Backend)
    .use(i18nextMiddleware.LanguageDetector)
    .init({
        //Path to language resource files
        backend: {
            loadPath: __dirname + '/resources/locales/{{lng}}/{{ns}}.json',
        },
        // where to look language
        detection: {
            // detect lang, check query string first
            order: ['querystring', 'cookie'],
            caches: ['cookie'],
        },
        fallbackLng: 'en', // set 'en' if no active parameters found anywhere
        preload: ['en', 'ru'],
    });

app.use(i18nextMiddleware.handle(i18next));

app.use(express.json());
app.use(cors());

recursive(`${__dirname}/routes`).forEach((file) =>
    app.use('/api', require(file))
);

async function startApp() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        app.listen(port, () => console.log('SERVER STARTED ON PORT: ' + port));
    } catch (e) {
        console.e('Unable to connect to the database:', e);
        console.log(e);
    }
}

startApp();
