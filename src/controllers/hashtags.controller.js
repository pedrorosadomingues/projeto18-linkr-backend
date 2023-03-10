import { getAllHashtags, insertHashtags } from "../repositories/hashtags.repository.js";

export async function getTrendingHashtags(req, res) {
  try {
    const hashtags = await getAllHashtags();

    if (hashtags.rowCount === 0) {
        return res.status(404).send("Hashtags not found");
      }

    res.send(hashtags);

  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function addHashtags(req, res) {
  try {

    await insertHashtags(req.body);

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function getPostsByHashtag(req, res) {
  try {
    const posts = await filterPostsByHashtag(req.params.hashtag);

    if (posts.rowCount === 0) {
        return res.status(404).send("Posts not found");
      }

    res.send(posts);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
