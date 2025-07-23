from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from . import models, database, gemini_api
import asyncio
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get DB session

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "AI Health Dashboard Backend is running."}

# Placeholder for health advice endpoint

@app.post("/get_advice", response_model=models.AdviceResponse)
async def get_advice(user_data: models.UserDataInput, db: Session = Depends(get_db)):
    # Store user data
    db_user = database.UserData(
        name=user_data.name,
        age=user_data.age,
        weight=user_data.weight,
        sleep_hours=user_data.sleep_hours,
        exercise_minutes=user_data.exercise_minutes
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    # Prepare prompt for Gemini
    prompt = (
        f"A user named {user_data.name}, age {user_data.age}, weight {user_data.weight}kg, "
        f"sleeps {user_data.sleep_hours} hours per night and exercises {user_data.exercise_minutes} minutes per day. "
        "Give 3 general wellness tips tailored to this user."
    )
    try:
        advice = await gemini_api.get_health_advice(prompt)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    # Store advice
    db_advice = database.AdviceHistory(user_id=db_user.id, advice=advice)
    db.add(db_advice)
    db.commit()

    return {"advice": advice} 