import { getAllPosts, insertPost } from "../repositories/posts.repository.js";


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