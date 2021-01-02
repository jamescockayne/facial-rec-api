const handleSignIn = (req, res, db, bcrypt) => {

    //find the user with the imput email, compare the hash, and if it matches, return all the user data.
    db.select('email', 'hash').from('login')
        .where('email','=', req.body.email)
        .then(data => {
            const isValid = bcrypt.compareSync(req.body.password, data[0].hash)
            if (isValid) {
                db.select('*').from('users')
                    .where('email', '=', req.body.email)
                    .then(user => res.json(user[0]))
                    .catch(err => res.status(400).json('unable to get user'))
            } else {
                res.status(400).json('invalid credentials')
            }
        })
        .catch(err => res.status(400).json('invalid credentials'))
}

module.exports = {
   handleSignIn: handleSignIn
}