import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeCollection } from '../utils/api';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadEntries() {
      try {
        const apiUrl = import.meta.env.VITE_CODESPACE_NAME
          ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard`
          : 'http://localhost:8000/api/leaderboard';
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Failed to load leaderboard');
        }
        const payload = await response.json();
        setEntries(normalizeCollection(payload));
      } catch (err) {
        setError(err.message || 'Unable to load leaderboard');
      } finally {
        setLoading(false);
      }
    }

    loadEntries();
  }, []);

  if (loading) {
    return <div className="container py-4">Loading leaderboard...</div>;
  }

  if (error) {
    return <div className="container py-4 text-danger">{error}</div>;
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Leaderboard</h2>
      <ol className="list-group list-group-numbered">
        {entries.map((entry) => (
          <li className="list-group-item d-flex justify-content-between align-items-start" key={entry._id || entry.userId}>
            <div>
              <div className="fw-bold">User {entry.userId}</div>
              <div className="text-muted">Score: {entry.score}</div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Leaderboard;
