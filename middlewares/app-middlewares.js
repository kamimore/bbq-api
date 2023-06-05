const bodyParser = require('body-parser');
const helmet = require('helmet');
// const morgan = require('morgan');
const compression = require('compression');

// Help to secure express app.
app.use(helmet());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,Authorization,Content-Type,x-access-token,showLoader');
    res.header('Access-Control-Max-Age', 864000);
    next();
});

/*

app.use(bodyParser.json({limit : '1000mb'}));

app.use(bodyParser.urlencoded({
    limit: '1000mb',
    extended: true,
}));


*/

app.use(express.json({limit: '5000mb'}));
app.use(express.urlencoded({limit: '5000mb', extended: true}));

// log all http requests
// app.use(morgan('dev'));

app.use(express.static('public'));

// compress responses
app.use(compression());
