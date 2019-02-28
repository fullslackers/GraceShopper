const loginCheckMiddleware = (req, res, next) => {
  if (req.user) next()
  else res.sendStatus(401)
}

const adminCheckMiddleware = (req, res, next) => {
  if (req.user && req.user.isAdmin) next()
  else res.sendStatus(403)
}

module.exports = {
  loginCheckMiddleware,
  adminCheckMiddleware
}
