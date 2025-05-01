import React, { useEffect, useState } from 'react';
import './Mechanics.css';

function Mechanics() {
  const [mechanics, setMechanics] = useState([]);

  useEffect(() => {
    // Fetch mechanics from backend API (placeholder URL)
    fetch('/api/mechanics')
      .then(res => res.json())
      .then(data => setMechanics(data))
      .catch(err => console.error('Error fetching mechanics:', err));
  }, []);

  return (
    <section className="mechanics">
      <h2>Mechanic Profiles</h2>
      {mechanics.length === 0 ? (
        <p>No mechanics available at the moment.</p>
      ) : (
        <div className="mechanic-list">
          {mechanics.map((mechanic) => (
            <article key={mechanic.id} className="mechanic-card">
              <img src={mechanic.photo || 'https://via.placeholder.com/150'} alt={mechanic.name} />
              <h3>{mechanic.name}</h3>
              <p>Specialty: {mechanic.specialty}</p>
              <p>Rating: {mechanic.rating} / 5</p>
              <button className="btn-primary" disabled>View Profile</button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Mechanics;
