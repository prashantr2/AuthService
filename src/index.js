const express = require('express');
const { PORT } = require('./config/serverConfig');

const app = express();

const prepareAndStartServer = async() => {

    app.listen(PORT, async() => {
        console.log(`Server up and running at PORT: ${PORT}`);
    })
}

prepareAndStartServer();
