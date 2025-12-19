function About() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-6">
      <h2 className="mb-3 text-2xl font-semibold">About Anime Release Tracker</h2>
      <p className="mb-3 text-sm text-slate-300">
        Anime Release Tracker is a web app that helps fans stay on top of new
        episodes across different streaming platforms and time zones.
      </p>
      <p className="mb-3 text-sm text-slate-400">
        Instead of checking multiple sites like MyAnimeList, AniList, and
        Crunchyroll, this app centralizes release information into a single
        calendar view and lets you build a personal watchlist.
      </p>
      <p className="text-sm text-slate-400">
        Data sources: Jikan API (MyAnimeList data) and AniList GraphQL API.
      </p>
    </main>
  );
}

export default About;
