const cors = require('cors');
const app = require('express')();
const bodyParser = require('body-parser');
const { configureAWS } = require('./src/aws/configureAWS');
const router = require('./api');
configureAWS();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use('/api', router);

app.listen(4000, (err) => {
    console.log('Servidor listo en el puerto ' + 4000);
})
