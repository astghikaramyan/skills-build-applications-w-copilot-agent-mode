import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function HomePage() {
  return (
    <div className="container py-5">
      <div className="p-5 mb-4 bg-light rounded-3">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">OctoFit Tracker</h1>
          <p className="col-md-8 fs-4">
            A modern multi-tier fitness tracking experience for teams and individuals.
          </p>
          <div className="d-flex flex-wrap gap-2">
            <Link className="btn btn-primary btn-lg" to="/users">
              View users
            </Link>
            <Link className="btn btn-outline-secondary btn-lg" to="/about">
              Learn more
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="container py-5">
      <h2>About OctoFit</h2>
      <p className="lead">
        Track workouts, manage teams, and stay motivated with a polished dashboard experience.
      </p>
      <p className="text-muted">
        Configure <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> to target your Codespaces API URL automatically.
      </p>
      <Link className="btn btn-outline-secondary" to="/">
        Back home
      </Link>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            OctoFit Tracker
          </Link>
          <div className="navbar-nav ms-auto">
            <NavLink className="nav-link" to="/users">Users</NavLink>
            <NavLink className="nav-link" to="/teams">Teams</NavLink>
            <NavLink className="nav-link" to="/activities">Activities</NavLink>
            <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
            <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
            <NavLink className="nav-link" to="/about">About</NavLink>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
