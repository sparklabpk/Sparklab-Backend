var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const routes = require("./routes");
const cors = require('cors');

var router = express.Router();

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.json({ type: '*/*' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: '*'
}));

router.use(function (request, response, next) {
  console.log("REQUEST:" + request.method + "   " + request.url);
  console.log("BODY:" + JSON.stringify(request.body));
  // response.setHeader('Access-Control-Allow-Origin', '*');
  // response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // response.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(express.static('static'));
app.use('/api', routes);

app.get('/status', (_, res) => {
  res.json({ message: 'API Healthcheck : 200' }).status(200);
});

var PORT = process.env.EXPRESS_PORT || 8080;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`);
});