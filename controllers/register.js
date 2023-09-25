const handleRegister = (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json('incorrect form submission');
  }

  const hash = bcrypt.hashSync(password);
  const joined = new Date(); 

  db.transaction(trx => {
    trx.insert({
      hash: hash,
      email: email
    })
    .into('login')
    .returning('email')
    .then((loginEmail) => {
      return trx('users')
        .returning('*')
        .insert({
          email: loginEmail[0].email,
          name: name,
          joined: joined 
        })
        .then(user => {
          res.json(user[0]);
        });
    })
    .then(trx.commit)
    .catch(error => {
      trx.rollback();
      res.status(400).json('unable to register');
    });
  })
  .catch(err => {
    res.status(400).json('unable to register');
  });
};

module.exports = {
  handleRegister: handleRegister
};
