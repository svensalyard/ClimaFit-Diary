require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const userRoutes = require('./controllers/api/userRoutes');
const helpers = require('./utils/helpers');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
  // ... other options
});


module.exports = sequelize;

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials'), 
  helpers
});

// Sessions setup
app.use(session({
  secret: 'Super secret secret',
  cookie: { maxAge: 300000, httpOnly: true, secure: false, sameSite: 'strict' },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({ db: sequelize })
}));


// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.render('layouts/main', { logged_in: req.session.logged_in });
});

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
})

.catch(err => {
  console.error('Unable to connect to the database:', err);
});

