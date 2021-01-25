const express = require('express');
const fs = require('fs');

const app = express();

const port = process.env.PORT || 8080;


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
    const routes = fs.readdirSync(__dirname + '/Routes');
    routes.forEach(route => {
        if(route.endsWith('.js')) setFile(__dirname + '/Routes/' + route);
        else setFolder(__dirname + '/Routes/' + route);
    });

    app.listen(port, () => console.log('on port: ' + port));

};

Init();