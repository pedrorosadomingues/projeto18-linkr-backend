import { allFollowings, followRepository, getIsFollowingRepository, unfollowRepository } from "../repositories/followers.repository.js";
import { findUserById, getUsersRepository } from "../repositories/users.repository.js";
import { CREATED, INTERNAL_SERVER_ERROR, OK } from "../utils/Codes.util.js";

export async function countFollowings(request, response) {
  const user = response.locals.user;

  try {
    const {rows} = await allFollowings(user.id);

    return response.status(OK).send(rows);
  } catch (error) {
    console.log(error);

    return response.sendStatus(INTERNAL_SERVER_ERROR);
  }
};

export async function follow(request, response) {
  const { followed } = request.body;
  // console.log(request.body)

  const user = response.locals.user;

  try {
    await followRepository(followed, user.id);

    return response.sendStatus(CREATED);
  } catch (error) {
    console.log(error);

    return response.sendStatus(INTERNAL_SERVER_ERROR);
  }
};

export async function unfollow(request, response) {
  const { id } = request.params;
  // console.log(request.params)

  const user = response.locals.user;

  try {
    await unfollowRepository(id, user.id);

    return response.sendStatus(CREATED);
  } catch (error) {
    console.log(error);

    return response.sendStatus(INTERNAL_SERVER_ERROR);
  }
};

export async function isFollowing(request, response) {
  const { id } = request.body;
  //console.log('body from isfollowing: ', request.body);

  //console.log('')

  const user = response.locals.user;

  try {
    const data = await getIsFollowingRepository(id, user.id);
    //console.log('ISFOLLOWING:', data.rows);

    return response.status(OK).send({isFollowing: data.rows.length > 0});
  } catch (error) {
    console.log(error);

    return response.sendStatus(INTERNAL_SERVER_ERROR);
  }
};