const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
//const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

 app.use((req, res, next) => {
    User.findById("5c50a9a4d518f406696331cd")
    .then(user => {
        req.user = user;
      next();
     })
      .catch(err => console.log(err));
 });
  

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://georgis:Beshtash1990!@cluster0-plh1l.mongodb.net/shop?retryWrites=true')
.then(result => {
  User.findOne().then(user => {
    if (!user) {
      const user = new User({
        name: 'Georgis',
        email: 'georgis.ka@hotmail.com',
        cart: {
          items: []
        }
      });
      user.save();

    }
  });
  app.listen(3000);
}).catch(err => {
  console.log(err);
});
