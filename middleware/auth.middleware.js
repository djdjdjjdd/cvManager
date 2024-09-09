module.exports.authenticateToken = async (req, res, next) => {
    const authorization = req.header['authorization']
    if (!authorization)
        return res.sendStatus(401)
    jwt.verify(token, 'your-secret-key', (err, user) => {
        if (err)
            res.sendStatus(403)
        req.role = role
    })
}
