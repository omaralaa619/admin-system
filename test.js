app.post("/register", checkNotAuthenticated, async (req, res) => {
  req.user = new User()
  next()
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
},
async (req, res) => {
    let user = req.user;
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    try {
      user = await user.save();
      res.redirect(`/login`);
    } catch (e) {
      res.render(`/register`);
      console.log(e);
    }
  };



);