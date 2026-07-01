import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeCollection } from '../utils/api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadTeams() {
      try {
        const apiUrl = import.meta.env.VITE_CODESPACE_NAME
          ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams`
          : 'http://localhost:8000/api/teams';
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Failed to load teams');
        }
        const payload = await response.json();
        setTeams(normalizeCollection(payload));
      } catch (err) {
        setError(err.message || 'Unable to load teams');
      } finally {
        setLoading(false);
      }
    }

    loadTeams();
  }, []);

  if (loading) {
    return <div className="container py-4">Loading teams...</div>;
  }

  if (error) {
    return <div className="container py-4 text-danger">{error}</div>;
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Teams</h2>
      <div className="row g-3">
        {teams.map((team) => (
          <div className="col-md-6" key={team._id || team.name}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{team.name}</h5>
                <p className="card-text">{team.description}</p>
                <p className="card-text text-muted">Members: {team.members?.length || 0}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Teams;
