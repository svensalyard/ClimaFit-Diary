const router = require('express').Router();
const { User } = require('../../models');

router.post('/signup', async (req, res) => {
  try {
    console.log(req.body);
    const userData = await User.create(req.body);
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.redirect('/'); 
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  console.log(req.body);
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
    } else {
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        res.json({ message: 'Login successful', redirect: '/' }); // Send JSON response
      });
    }

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.redirect('/'); 
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
