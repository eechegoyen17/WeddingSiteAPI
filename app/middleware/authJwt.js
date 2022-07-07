
verifyToken = (req, res, next, jwt, tkey) => {
  const token = req.body.token
  jwt.verify(token, tkey.secret, (err, decodedToken) => {
    if(err){
      if (err.name === "TokenExpiredError"){
        res.status(401).json("Session Expired");
        res.end();
      }
      else{
        res.status(401).json("Unauthorized Access");
        res.end();
      }
    }
    else {
      next();
    }
  });
}

const authJwt = {
    verifyToken: verifyToken
  };

module.exports = authJwt;