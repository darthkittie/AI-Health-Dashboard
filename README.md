# AI Health Dashboard

## Backend Setup (Python/FastAPI)

1. **Install dependencies:**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. **Set up Gemini API key:**
   - Create a `.env` file in the `backend/` directory:
     ```env
     GEMINI_API_KEY=your_gemini_api_key_here
     ```

3. **Run the FastAPI server:**
   ```bash
   uvicorn app.main:app --reload
   ```

The backend will be available at `http://127.0.0.1:8000/`.

---

Frontend setup instructions will be added next.
