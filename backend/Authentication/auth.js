const jwt = require("jsonwebtoken");
const jwtSecret = "asd889asdas5656asdas887";

const autenticateToken = async (req, res, next) => {
    const authHeader = await req.headers['authorization']
    console.log(authHeader)
    const token = authHeader && authHeader.split(' ')[1]
    console.log(token + "/////////")
    if (token == null) {
        console.log("Token not match");
    }
    else {

        jwt.verify(token, jwtSecret, (err, data) => {
            if (err) {
                console.log("Token incorrect")
            }
            else {
                console.log("Match")
                next();
            }
        })
    }
}
module.exports=autenticateToken