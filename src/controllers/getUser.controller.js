import { getUsersRepository } from "../repositories/users.repository.js";
import { INTERNAL_SERVER_ERROR, OK } from "../utils/Codes.util.js";


export async function getUser(_, res){
try {
	res.status(200).send(res.locals.user)
} catch (error) {
	console.log(error)
    res.status(500).send(error.message)
}
}

export async function getUsers(request, response) {
  const {name} = request.body;
  console.log(request.body)

  try {
    const data = await getUsersRepository(name);
    console.log('USERS:', data.rows);

    return response.status(OK).send(data.rows);
  } catch (error) {
    console.log(error);

    return response.sendStatus(INTERNAL_SERVER_ERROR);
  }
};