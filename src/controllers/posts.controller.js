import { deletePostRepository, getAllPosts, insertPost, updatePostRepository } from "../repositories/posts.repository.js";
import { CREATED, INTERNAL_SERVER_ERROR, NO_CONTENT } from "../utils/Codes.util.js";


export async function createPost(_, res){
    const {url, description} = res.locals.postData;
    const {id} = res.locals.user;
    const metadataId = res.locals.metadataId;

    console.log(id)

    await insertPost(url, id, description, metadataId);

    res.sendStatus(201);

    try {
        
    } catch (error) {
        console.log("error in createPost")
        console.log(error);
        res.status(500).send("error on create post")
    }
}

export async function getPosts(_, res){
   

    const {rows} = await getAllPosts();

    res.status(200).send(rows);

    try {
        
    } catch (error) {
        console.log("error in getPosts")
        res.status(500).send(error.message)
    }
}

export async function deletePost(request, response) {
  try {
    const {id: postId} = request.params;
    const {id: userId} = response.locals.user;

    await deletePostRepository(postId, userId);

    return response.sendStatus(NO_CONTENT);
  } catch (error) {
    console.log(error);

    return response.sendStatus(INTERNAL_SERVER_ERROR);
  }
};

export async function updatePost(request, response) {
  try {
    const {text} = request.body;
    const {id: postId} = request.params;
    const {id: userId} = response.locals.user;

    console.log(text)

    await updatePostRepository(postId, userId, text);

    return response.sendStatus(CREATED);
  } catch (error) {
    console.log(error);

    return response.sendStatus(INTERNAL_SERVER_ERROR);
  }
};