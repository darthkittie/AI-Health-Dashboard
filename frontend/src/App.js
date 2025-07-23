import React, { useState } from 'react';

function App() {
  const [form, setForm] = useState({
    name: '',
    age: '',
    weight: '',
    sleep_hours: '',
    exercise_minutes: ''
  });
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAdvice('');
    setError('');
    try {
      const response = await fetch('http://127.0.0.1:8000/get_advice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          age: Number(form.age),
          weight: Number(form.weight),
          sleep_hours: Number(form.sleep_hours),
          exercise_minutes: Number(form.exercise_minutes)
        })
      });
      if (!response.ok) throw new Error('Failed to get advice');
      const data = await response.json();
      setAdvice(data.advice);
    } catch (err) {
      setError('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '40px auto', padding: 24, borderRadius: 8, boxShadow: '0 2px 8px #ccc', background: '#fff' }}>
      <h2>AI Health Dashboard</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="age" type="number" placeholder="Age" value={form.age} onChange={handleChange} required />
        <input name="weight" type="number" placeholder="Weight (kg)" value={form.weight} onChange={handleChange} required />
        <input name="sleep_hours" type="number" placeholder="Sleep Hours (per night)" value={form.sleep_hours} onChange={handleChange} required />
        <input name="exercise_minutes" type="number" placeholder="Exercise Minutes (per day)" value={form.exercise_minutes} onChange={handleChange} required />
        <button type="submit" disabled={loading}>{loading ? 'Getting advice...' : 'Get Health Advice'}</button>
      </form>
      {advice && (
        <div style={{ marginTop: 24, padding: 16, background: '#f6f6f6', borderRadius: 6 }}>
          <h4>Personalized Wellness Tips:</h4>
          <p>{advice}</p>
        </div>
      )}
      {error && <div style={{ color: 'red', marginTop: 16 }}>{error}</div>}
    </div>
  );
}

export default App;
