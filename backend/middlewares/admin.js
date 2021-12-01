function admin(req, res, next) {
  if (!req.user.isAdmin) {
    return res.status(403).send("only admin");
  }
  next();
}

module.exports = admin;
