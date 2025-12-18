export default async function handler(req, res) {
  const { q } = req.query;

  if (!q || !q.trim()) {
    return res.status(400).json({ error: "Missing q query parameter" });
  }

  const query = `
    query ($search: String) {
      Page(page: 1, perPage: 8) {
        media(search: $search, type: ANIME) {
          id
          title {
            english
            romaji
          }
          coverImage {
            large
          }
          episodes
          status
          averageScore
        }
      }
    }
  `;

  try {
    const response = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { search: q },
      }),
    });

    if (!response.ok) {
      return res.status(response.status).json({
        error: `AniList API error: ${response.status}`,
      });
    }

    const json = await response.json();
    const media = json?.data?.Page?.media || [];

    return res.status(200).json({ results: media });
  } catch (err) {
    console.error("Error in /api/search:", err);
    return res.status(500).json({ error: "Failed to search AniList" });
  }
}
