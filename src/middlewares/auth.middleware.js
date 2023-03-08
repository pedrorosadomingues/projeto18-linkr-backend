import jwt from 'jsonwebtoken';
import { findUserById } from '../repositories/users.repository.js';


export async function userAuth(req, res, next){
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", '');
    if (!token) return res.sendStatus(401);
    const secretKey = process.env.SECRET_KEY;

try {
	const data = jwt.verify(token, secretKey);
    const {rows} = await findUserById(data.id)
    if (rows.length === 0 ) return res.sendStatus(401);
    res.locals.user = rows[0]

    next();
	
} catch (error) {
	console.log(error)
    console.log("Erro en userAuth")
    res.status(500).send("Error in authenttication")
}
}