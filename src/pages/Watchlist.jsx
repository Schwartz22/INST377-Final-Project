import { useEffect, useState } from "react";

function Watchlist() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  // Load watchlist from your backend
  useEffect(() => {
    async function loadWatchlist() {
      try {
        const response = await fetch("/api/watchlist");
        const json = await response.json();

        if (response.ok) {
          setItems(json.items || []);
        } else {
          console.error("Watchlist GET error:", json.error);
        }
      } catch (err) {
        console.error("Error loading watchlist:", err);
      } finally {
        setLoading(false);
      }
    }

    loadWatchlist();
  }, []);

  // Temporary "add test item" button to prove POST works
  async function handleAddTest() {
    setAdding(true);
    try {
      const response = await fetch("/api/watchlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          anilist_id: 1,
          title: "Test Anime (Demo)",
          poster_url: null,
        }),
      });

      const json = await response.json();

      if (response.ok) {
        setItems((prev) => [json.item, ...prev]);
      } else {
        console.error("Watchlist POST error:", json.error);
      }
    } catch (err) {
      console.error("Error adding watchlist item:", err);
    } finally {
      setAdding(false);
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <h2 className="mb-2 text-2xl font-semibold">My Watchlist</h2>
      <p className="mb-4 text-sm text-slate-400">
        This page shows anime saved in a shared Supabase watchlist table. Later
        you can connect this to &quot;Add to Watchlist&quot; buttons from the
        search results.
      </p>

      <button
        onClick={handleAddTest}
        disabled={adding}
        className="mb-4 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-emerald-400 disabled:opacity-60"
      >
        {adding ? "Adding..." : "Add Test Anime to Watchlist"}
      </button>

      {loading && <p className="text-sm text-slate-400">Loading watchlist…</p>}

      {!loading && items.length === 0 && (
        <p className="text-sm text-slate-400">
          No anime in watchlist yet. Use the button above (for now) or add from
          search (future).
        </p>
      )}

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-slate-800 bg-slate-950/60 p-4"
          >
            <div className="mb-3 h-40 w-full rounded-lg bg-slate-800 flex items-center justify-center text-xs text-slate-400">
              {item.poster_url ? (
                <img
                  src={item.poster_url}
                  alt={item.title}
                  className="h-full w-full rounded-lg object-cover"
                />
              ) : (
                <span>No image</span>
              )}
            </div>
            <h3 className="text-sm font-semibold">{item.title}</h3>
            <p className="text-xs text-slate-400">
              AniList ID: {item.anilist_id}
            </p>
            <p className="mt-1 text-[10px] text-slate-500">
              Added: {new Date(item.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Watchlist;
