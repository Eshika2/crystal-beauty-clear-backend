import jwt from "jsonwebtoken";

export function verifyJWT(req, res, next) {
    const header = req.header("Authorization");
    // console.log(header);
    if (header != null) {
        const token = header.replace("Bearer ", "");
        // console.log(token);
        jwt.verify(token, "secretKey", (err, decoded)=>{
            // console.log(decoded);
            if (decoded != null) {
                req.user = decoded;
            }
        })
    }
    next();
}