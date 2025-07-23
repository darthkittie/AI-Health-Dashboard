# 🩺 AI Health Dashboard

A modern, user-friendly web dashboard that provides personalized general wellness tips powered by Google Gemini LLM.

---

## ✨ Features
- **Easy-to-use web interface** for entering your health and wellness data
- **AI-powered health advice** tailored to your input
- **Secure backend** with FastAPI and SQLite for storing user data and advice history
- **React frontend** for a smooth, responsive experience
- **Gemini LLM integration** (Google's latest)

---

## 🚀 Quick Start

### 1. Clone the repository
```bash
# In your terminal
https://github.com/your-username/AI-Health-Dashboard.git
cd AI-Health-Dashboard
```

### 2. Backend Setup (Python/FastAPI)
```bash
cd backend
pip install -r requirements.txt
```

- Create a `.env` file in the `backend/` directory:
  ```env
  GEMINI_API_KEY=your_gemini_api_key_here
  ```
- Start the backend server:
  ```bash
  python -m uvicorn app.main:app --reload
  ```
- Visit [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs) for API docs.

### 3. Frontend Setup (React)
```bash
cd ../frontend
npm install
npm start
```
- Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🖥️ Screenshots
> _Add your screenshots here!_

---

## 🛠️ Project Structure
```
AI-Health-Dashboard/
  backend/      # FastAPI backend, Gemini integration, SQLite
  frontend/     # React frontend
  README.md     # This file
```

---

## 🤖 Tech Stack
- **Frontend:** React, JavaScript, Fetch API
- **Backend:** FastAPI, Python, SQLAlchemy, SQLite, httpx
- **AI:** Google Gemini LLM (via API)

---

## 💡 Customization & Extending
- Add more health metrics or advice types
- Connect to other LLMs (OpenAI, Azure, etc.)
- Add user authentication for saved history
- Deploy to the cloud (Vercel, Heroku, etc.)

---

## 🙏 Credits
- [Google Gemini API](https://ai.google.dev/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [React](https://react.dev/)

---

## 📄 License
MIT
