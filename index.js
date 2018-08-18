const cors = require('cors');
const app = require('express')();
const bodyParser = require('body-parser');
const { configureAWS } = require('./src/aws/configureAWS');

configureAWS();

// Middleware to permit request since others machines
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());

app.listen(4000, (err) => {
    console.log('Servidor listo en el puerto ' + 4000);
})
