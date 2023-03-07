import postSchema from "../schemas/posts.schema.js";
import urlMetadata from "url-metadata";
import { getMetadata, insertMetadata } from "../repositories/posts.repository.js";

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

export async function scrapMetadata(_, res, next){
  const {url} = res.locals.postData

  try {
    const metadata = await getMetadata(url);
    if (metadata.rowCount === 0 ) {
      
      await urlMetadata(url)
        .then(async (meta) => {
          console.log(meta.title)

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
    }
    next();
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
}