const express = require('express');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const expressip = require('express-ip');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 8080;

app.set('trust proxy', '173.245.54.136');

app.use('/static', express.static('public'));

app.use((req, res, next) => {
    const parsedQs = querystring.parse(url.parse('https://api.monke.vip' + req.originalUrl).query);
    req.urlParams = parsedQs;
    next();
});

app.use(expressip().getIpInfoMiddleware);

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: `MonkeDev - API`,
            description: 'The MonkeDev API'
        },
        servers: ['https://api.monke.vip/']
    },
    apis: [__dirname + '/Routes/*.js']    
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

const setFolder = (dir) => {
    const routes = fs.readdirSync(dir);
    routes.forEach(route => {
        if(route.endsWith('.js')) setFile(dir + '/' + route);
        else setFolder(dir + '/' + route);
    });
};
const setFile = (dir) => {
    const file = require(dir);
    app.use(file.end, file.router);
};

const Init = async () => {

    require('./Database/Init')();

    const routes = fs.readdirSync(__dirname + '/Routes');
    routes.forEach(route => {
        if(route.endsWith('.js')) setFile(__dirname + '/Routes/' + route);
        else setFolder(__dirname + '/Routes/' + route);
    });

    app.listen(port, () => console.log('on port: ' + port));

    require('./Discord_bot/bot');
};

Init();