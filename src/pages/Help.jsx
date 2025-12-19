function Help() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-6">
      <h2 className="mb-3 text-2xl font-semibold">Help</h2>
      <ul className="space-y-3 text-sm text-slate-300">
        <li>
          <span className="font-semibold">Home:</span> view anime airing
          today/this week and browse the schedule.
        </li>
        <li>
          <span className="font-semibold">Watchlist:</span> see shows you&apos;ve
          saved (we&apos;ll connect this to the database later).
        </li>
        <li>
          <span className="font-semibold">About:</span> learn about what this
          project does and which APIs it uses.
        </li>
      </ul>
    </main>
  );
}

export default Help;
