import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeCollection } from '../utils/api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadActivities() {
      try {
        const apiUrl = import.meta.env.VITE_CODESPACE_NAME
          ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities`
          : 'http://localhost:8000/api/activities';
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Failed to load activities');
        }
        const payload = await response.json();
        setActivities(normalizeCollection(payload));
      } catch (err) {
        setError(err.message || 'Unable to load activities');
      } finally {
        setLoading(false);
      }
    }

    loadActivities();
  }, []);

  if (loading) {
    return <div className="container py-4">Loading activities...</div>;
  }

  if (error) {
    return <div className="container py-4 text-danger">{error}</div>;
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Activities</h2>
      <div className="row g-3">
        {activities.map((activity) => (
          <div className="col-md-6" key={activity._id || activity.type}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title text-capitalize">{activity.type}</h5>
                <p className="card-text">Duration: {activity.duration} min</p>
                {activity.distance ? <p className="card-text">Distance: {activity.distance} mi</p> : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Activities;
