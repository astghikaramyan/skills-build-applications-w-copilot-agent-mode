import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeCollection } from '../utils/api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const apiUrl = import.meta.env.VITE_CODESPACE_NAME
          ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts`
          : 'http://localhost:8000/api/workouts';
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Failed to load workouts');
        }
        const payload = await response.json();
        setWorkouts(normalizeCollection(payload));
      } catch (err) {
        setError(err.message || 'Unable to load workouts');
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, []);

  if (loading) {
    return <div className="container py-4">Loading workouts...</div>;
  }

  if (error) {
    return <div className="container py-4 text-danger">{error}</div>;
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Workouts</h2>
      <div className="row g-3">
        {workouts.map((workout) => (
          <div className="col-md-6" key={workout._id || workout.title}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{workout.title}</h5>
                <p className="card-text">{workout.description}</p>
                <p className="card-text text-muted">{workout.category} • {workout.duration} min • {workout.difficulty}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Workouts;
