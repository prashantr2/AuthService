const express = require('express');
const bodyParser = require('body-parser');
const { PORT } = require('./config/serverConfig');
const apiRoutes = require('./routes/index');

const app = express();

const prepareAndStartServer = async() => {
    
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use('/api', apiRoutes);

    app.listen(PORT, async() => {
        console.log(`Server up and running at PORT: ${PORT}`);
    })
}

prepareAndStartServer();
