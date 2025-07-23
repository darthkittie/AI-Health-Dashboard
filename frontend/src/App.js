import React, { useState } from 'react';
import './App.css';

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
    <div className="dashboard-bg">
      <header className="dashboard-header">
        <h1>🩺 AI Health Dashboard</h1>
        <p className="dashboard-subtitle">Get personalized wellness tips powered by AI</p>
      </header>
      <main className="dashboard-main">
        <form className="dashboard-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Age</label>
            <input name="age" type="number" value={form.age} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Weight (kg)</label>
            <input name="weight" type="number" value={form.weight} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Sleep Hours (per night)</label>
            <input name="sleep_hours" type="number" value={form.sleep_hours} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Exercise Minutes (per day)</label>
            <input name="exercise_minutes" type="number" value={form.exercise_minutes} onChange={handleChange} required />
          </div>
          <button className="dashboard-btn" type="submit" disabled={loading}>{loading ? 'Getting advice...' : 'Get Health Advice'}</button>
        </form>
        {advice && (
          <div className="dashboard-advice">
            <h3>Personalized Wellness Tips</h3>
            <p>{advice}</p>
          </div>
        )}
        {error && <div className="dashboard-error">{error}</div>}
      </main>
      <footer className="dashboard-footer">
        <span>Powered by Google Gemini &middot; Made with ❤️ using React & FastAPI</span>
      </footer>
    </div>
  );
}

export default App;
