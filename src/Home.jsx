import { useEffect, useState } from "react";

function Home() {
  // Jikan schedule state
  const [schedule, setSchedule] = useState([]);
  const [scheduleLoading, setScheduleLoading] = useState(true);

  // AniList search state
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  // Fetch schedule from YOUR backend
  useEffect(() => {
    async function fetchSchedule() {
      try {
        const response = await fetch("/api/schedule");
        const data = await response.json();
        setSchedule(data.data || []); // Jikan returns { data: [...] }
      } catch (error) {
        console.error("Error fetching schedule:", error);
      } finally {
        setScheduleLoading(false);
      }
    }

    fetchSchedule();
  }, []);

  // Handle AniList search through YOUR backend
  async function handleSearch(e) {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setSearchLoading(true);
    setSearchResults([]);

    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(searchTerm)}`
      );
      const json = await response.json();

      if (response.ok) {
        setSearchResults(json.results || []);
      } else {
        console.error("Search API error:", json.error);
      }
    } catch (err) {
      console.error("Error searching AniList:", err);
    } finally {
      setSearchLoading(false);
    }
  }

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-6">
      {/* SEARCH SECTION */}
      <section>
        <h2 className="mb-2 text-2xl font-semibold">Search Anime</h2>
        <p className="mb-4 text-sm text-slate-400">
          Search titles using the AniList API. Later, you&apos;ll be able to add
          shows to your watchlist.
        </p>

        <form
          onSubmit={handleSearch}
          className="flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <input
            type="text"
            placeholder="Search for anime (e.g. Attack on Titan)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-emerald-400 disabled:opacity-60"
            disabled={searchLoading}
          >
            {searchLoading ? "Searching..." : "Search"}
          </button>
        </form>

        {searchResults.length > 0 && (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {searchResults.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-slate-800 bg-slate-950/60 p-4"
              >
                <img
                  src={item.coverImage?.large}
                  alt={item.title.english || item.title.romaji}
                  className="mb-3 h-40 w-full rounded-lg object-cover"
                />
                <h3 className="text-sm font-semibold">
                  {item.title.english || item.title.romaji}
                </h3>
                <p className="text-xs text-slate-400">
                  Episodes: {item.episodes || "?"} • Status:{" "}
                  {item.status || "Unknown"}
                </p>
                {item.averageScore && (
                  <p className="mt-1 text-xs text-emerald-300">
                    Score: {item.averageScore}/100
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* SCHEDULE SECTION */}
      <section>
        <h2 className="mb-2 text-2xl font-semibold">Airing Today</h2>
        <p className="mb-4 text-sm text-slate-400">
          Data pulled from the Jikan (MyAnimeList) API through our backend.
        </p>

        {scheduleLoading && (
          <p className="text-sm text-slate-400">Loading anime…</p>
        )}

        {!scheduleLoading && schedule.length === 0 && (
          <p className="text-sm text-slate-400">No anime found.</p>
        )}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {schedule.slice(0, 9).map((show) => (
            <div
              key={show.mal_id}
              className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 hover:border-emerald-400 transition"
            >
              <img
                src={show.images.jpg.image_url}
                alt={show.title}
                className="mb-3 h-40 w-full rounded-lg object-cover"
              />
              <h3 className="text-sm font-semibold">{show.title}</h3>
              <p className="text-xs text-slate-400">
                {show.broadcast?.string || "Time unknown"}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;
