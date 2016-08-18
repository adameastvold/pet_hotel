var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

//our routes

var owner = require('./routes/owner'); //brings the route in
var pet = require('./routes/pet');
var joiner = require('./routes/joiner');

app.use(bodyParser.urlencoded({
    extended: true
}));

//.use sends it to that file to do the things
app.use('/owner', owner);
app.use('/pet', pet);
app.use('/joiner', joiner);


// Catchall route
app.get('/*', function(req, res) {
    var file = req.params[0] || '/views/index.html';
    res.sendFile(path.join(__dirname, './public', file));
});

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
    console.log('Listening on port ', app.get('port'));

});
