import { supabase } from "./_supabaseClient.js";

async function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => {
      if (!data) return resolve({});
      try {
        const json = JSON.parse(data);
        resolve(json);
      } catch (err) {
        reject(err);
      }
    });
    req.on("error", reject);
  });
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { data, error } = await supabase
      .from("watchlist")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase GET error:", error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ items: data });
  }

  if (req.method === "POST") {
    try {
      const body = await readBody(req);
      const { anilist_id, title, poster_url } = body;

      if (!anilist_id || !title) {
        return res
          .status(400)
          .json({ error: "Missing anilist_id or title" });
      }

      const { data, error } = await supabase
        .from("watchlist")
        .insert([{ anilist_id, title, poster_url }])
        .select()
        .single();

      if (error) {
        console.error("Supabase POST error:", error);
        return res.status(500).json({ error: error.message });
      }

      return res.status(201).json({ item: data });
    } catch (err) {
      console.error("Error parsing POST body:", err);
      return res.status(400).json({ error: "Invalid JSON body" });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({ error: "Method not allowed" });
}
