import { getAllPosts, insertPost } from "../repositories/posts.repository.js";


export async function createPost(_, res){
    const {url, description} = res.locals.postData;
    const {id} = res.locals.user;
    const metadataId = res.locals.metadataId;

    await insertPost(url, id, description, metadataId);

    res.sendStatus(201);

    try {
        
    } catch (error) {
        console.log("error in createPost")
        console.log(error);
        res.status(500).send(error.message)
    }
}

export async function getPosts(_, res){
    // const {id} = res.locals.user;
  

    const {rows} = await getAllPosts();

    res.status(200).send(rows);

    try {
        
    } catch (error) {
        console.log("error in getPosts")
        console.log(error);
        res.status(500).send(error.message)
    }
}