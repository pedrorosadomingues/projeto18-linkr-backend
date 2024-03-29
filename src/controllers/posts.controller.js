import { commentPostRepository, deleteLike, deletePostRepository, getAllPosts, getAllShares, getPostsFromUserRepository, insertLike, insertPost, insertShare, updatePostRepository } from "../repositories/posts.repository.js";
import { CREATED, INTERNAL_SERVER_ERROR, NO_CONTENT } from "../utils/Codes.util.js";


export async function createPost(_, res) {
  const { url, description } = res.locals.postData;
  const { id } = res.locals.user;
  const metadataId = res.locals.metadataId;

  try {
    await insertPost(url, id, description, metadataId);

    res.sendStatus(201);
  } catch (error) {
    console.log("error in createPost")
    console.log(error);
    res.status(500).send("error on create post")
  }
}

export async function getPosts(_, res) {
  const { id } = res.locals.user;

  const { rows: postRows } = await getAllPosts(id);
  const { rows: sharesRows } = await getAllShares(id);

  //console.log('sharesRows', sharesRows)

  const feed = [...postRows, ...sharesRows].sort((a, b) => b.created_at - a.created_at);

  res.status(200).send(feed);

  try {

  } catch (error) {
    console.log("error in getPosts")
    res.status(500).send(error.message)
  }
}

export async function getPostsFromUser(req, res) {
  const { id } = req.params;

  const { rows } = await getPostsFromUserRepository(id);

  res.status(200).send(rows);

  try {

  } catch (error) {
    console.log("error in getPostsFromUser")
    res.status(500).send(error.message)
  }
}

export async function deletePost(request, response) {
  try {
    const { id: postId } = request.params;
    const { id: userId } = response.locals.user;

    await deletePostRepository(postId, userId);

    return response.sendStatus(NO_CONTENT);
  } catch (error) {
    console.log(error);

    return response.sendStatus(INTERNAL_SERVER_ERROR);
  }
};

export async function updatePost(request, response) {
  try {
    const { text } = request.body;
    const { id: postId } = request.params;
    const { id: userId } = response.locals.user;

    //console.log(text)

    await updatePostRepository(postId, userId, text);

    return response.sendStatus(CREATED);
  } catch (error) {
    console.log(error);

    return response.sendStatus(INTERNAL_SERVER_ERROR);
  }
};

export async function likePost(_, res) {

  const user = res.locals.user;
  const post = res.locals.post;

  try {
    await insertLike(user.id, post.id);

    res.sendStatus(200);

  } catch (error) {
    console.log(error);
    res.status(500).send(error.message)
  }
}

export async function unlikePost(_, res) {

  const user = res.locals.user;
  const post = res.locals.post;


  try {
    await deleteLike(user.id, post.id);

    res.sendStatus(200);

  } catch (error) {
    console.log(error);
    res.status(500).send(error.message)
  }
}

export async function sharePost(_, res) {

  const user = res.locals.user;
  const post = res.locals.post;
  //console.log('USER NAME', user.name)
  //console.log('USER ID', user.id)
  //console.log('****************************************')

  try {
    await insertShare(user.id, user.name, post.id);

    res.sendStatus(200);

  } catch (error) {
    console.log(error);
    res.status(500).send(error.message)
  }
}

export async function getShares(_, res) {
  const { id } = res.locals.user;

  const { rows } = await getAllShares(id);

  res.status(200).send(rows);

  try {

  } catch (error) {
    console.log("error in getPosts")
    res.status(500).send(error.message)
  }
}

export async function commentPost(_, res) {

  const user = res.locals.user;
  const post = res.locals.post;
  const {comment} = res.locals.comment;

  try {
    await commentPostRepository(post.id, user.id, comment);

    res.sendStatus(201);

  } catch (error) {
    console.log(error);
    res.status(500).send(error.message)
  }
}