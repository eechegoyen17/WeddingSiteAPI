const handleSignin = (req, res, db, bcrypt, jwt, tkey) => {
    db.select('email','secret')
        .from('login')
        .where('email', '=', req.body.email)
        .then(data => {
            if (data[0].email){
                const isValid = bcrypt.compareSync(req.body.password, data[0].secret);
                if (isValid) {
                    return db.select('*').from('users')
                        .where('email','=',req.body.email)
                        .then(user => {
                            return jwt.sign({user: user[0].email}, tkey.secret, { expiresIn: tkey.expiresIn }, (error, token) => {
                                res.status(200).json({user,token})
                            })
                        })
                        .catch(err => console.log(err))
                }
                else {
                    res.status(400).json('Wrong Credentials');
                }
            }
            else {
                res.status(400).json('Wrong Credentials!');
            }
        })
        .catch(err => res.status(400).json(err))
};

module.exports = {
    handleSignin: handleSignin
}