import { NavLink, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Watchlist from './pages/Watchlist.jsx';
import About from './pages/About.jsx';
import Help from './pages/Help.jsx';

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Navigation bar */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📺</span>
            <div>
              <h1 className="text-lg font-semibold">Anime Release Tracker</h1>
              <p className="text-xs text-slate-400">
                Stay on top of new episodes
              </p>
            </div>
          </div>

          <ul className="flex gap-4 text-sm">
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `hover:text-emerald-300 ${
                    isActive ? 'text-emerald-300 font-semibold' : 'text-slate-200'
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/watchlist"
                className={({ isActive }) =>
                  `hover:text-emerald-300 ${
                    isActive ? 'text-emerald-300 font-semibold' : 'text-slate-200'
                  }`
                }
              >
                Watchlist
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `hover:text-emerald-300 ${
                    isActive ? 'text-emerald-300 font-semibold' : 'text-slate-200'
                  }`
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/help"
                className={({ isActive }) =>
                  `hover:text-emerald-300 ${
                    isActive ? 'text-emerald-300 font-semibold' : 'text-slate-200'
                  }`
                }
              >
                Help
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>

      {/* Page content */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />
      </Routes>
    </div>
  );
}

export default App;
