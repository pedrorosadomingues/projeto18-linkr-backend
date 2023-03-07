import { getAllHashtags } from "../repositories/hashtags.repository.js";

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
