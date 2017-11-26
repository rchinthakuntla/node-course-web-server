//Load express module
const _express = require('express');
const _hbs = require('hbs');
const _fs = require('fs');

// Create App object by invoking express function
const port = process.env.PORT || 3000;
var app = _express();

_hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now} ${req.method} ${req.url}`;
  console.log(log);
  _fs.appendFile('server.log',log+'\n',(error) => {
    if (error) {
        console.log(error);
    }
  })
  next();
});

app.use((req, res, next) => {
  res.render('maintenance.hbs', {
    pageTitle: 'Maintenance page',
    body: 'Site is currently under maintenance.'
  });
});


app.use(_express.static(__dirname + '/public'));

// Define routing
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    currentYear: new Date().getFullYear(),
    body: 'Hi there! You reached home page.'
  });
})

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear(),
    body: 'Hi there! You reached about page.'
  });
})

// Listen for incoming traffic on port 3000
app.listen(port, () => {
  console.log(`Server is up and running on ${port}`);
});
