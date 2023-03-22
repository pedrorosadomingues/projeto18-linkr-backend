import postSchema from "../schemas/posts.schema.js";
import urlMetadata from "url-metadata";
import { getMetadata, getPostById, insertMetadata } from "../repositories/posts.repository.js";
import commentSchema from "../schemas/comment.schema.js";

export function validatePost(req, res, next){
    const {url, description} = req.body
    try {
        const validation = postSchema.validate({url, description});
    
    
        if (validation.error) {
          console.log('Error on signin validation: ', validation.error.message);
          return res.sendStatus(422);
        }
        res.locals.postData = {url, description}

        next();
      } catch (error) {
        console.log('Error on server: ', error);
        return response.sendStatus(500);
      }
}

export async function validateComment(req, res, next){
  const {comment} = req.body
  const {postId} = req.params
  console.log(comment)
  try {
      const validation = commentSchema.validate({comment});
      if (validation.error) return res.sendStatus(422);
      res.locals.comment = {comment}

      const post = await getPostById(postId);
      if (post.rowCount === 0) return res.sendStatus(404);
     
      res.locals.post = post.rows[0]

      next();
    } catch (error) {
      console.log('Error on server: ', error);
      return response.sendStatus(500);
    }
}


export async function findPost(req, res, next){
  const {postId} = req.body

  try {

      const data = await getPostById(postId);
     
      res.locals.post = data.rows[0]

      next();
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
}

export async function scrapMetadata(_, res, next){
  const {url} = res.locals.postData

  try {
    const metadata = await getMetadata(url);
    if (metadata.rowCount === 0 ) {
      
      await urlMetadata(url)
        .then(async (meta) => {

        

          meta.title? "" : meta.title = "Not Found"
          meta.description? "" : meta.description = "Not Found"
          meta.url? "" : meta.url = "Not Found"
          meta.image? "" : meta.image = "Not Found"


          const { rows } = await insertMetadata(
            meta.title,
            meta.description,
            meta.url,
            meta.image
          );
          res.locals.metadataId = rows[0].id;
          
        })
    } else {
      res.locals.metadataId = metadata.rows[0].id;
      console.log(res.metadataId)
    }
    next();
  } catch (err) {
    console.log("Erro em scrapMetadata")
    res.status(500).send(err.message);
  }
}

