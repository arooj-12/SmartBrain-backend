const handleSignin = (db, bcrypt) => (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json('incorrect form submission');
  }

  db.select('email', 'hash').from('login')
    .where('email', '=', email) 
    .then(data => {
      //console.log('Retrieved hash from database:', data);
      const isValid = bcrypt.compareSync(password, data[0].hash.trimEnd());
      console.log('Retrieved hash from database:', data);
      if (isValid) {
        return db.select('*').from('users')
          .where('email', '=', email)
          .then(user => {
            res.json(user[0])
          })
          .catch(err => res.status(400).json('unable to get user'))
      } else {
       // console.log(isValid, 'true or false');
        res.status(400).json('wrong credentials')
      }
    })
    .catch(err => {
      console.log(err);
      res.status(400).json('wrong credentials');
    });
}

module.exports = {
  handleSignin: handleSignin
}
