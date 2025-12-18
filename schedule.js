export default async function handler(req, res) {
  const jikanUrl = "https://api.jikan.moe/v4/schedules";

  try {
    const response = await fetch(jikanUrl);
    if (!response.ok) {
      return res.status(response.status).json({
        error: `Jikan API error: ${response.status}`,
      });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error("Error in /api/schedule:", err);
    return res.status(500).json({ error: "Failed to fetch schedule" });
  }
}
