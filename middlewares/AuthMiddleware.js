const { verify } = require("jsonwebtoken")

const validateToken = (req, res, next) => {
  const accesToken = req.header("accessToken")

  if (!accesToken) return res.json({ error: "User not logged in" })

  try {
    const validToken = verify(accessToken, "importantSecret")

    if (validToken) return next()
    
  } catch (err) {
    return res.json({ error: err })
  }
}

module.exports = { validateToken }