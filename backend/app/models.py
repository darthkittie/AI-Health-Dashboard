from pydantic import BaseModel

class UserDataInput(BaseModel):
    name: str
    age: int
    weight: int
    sleep_hours: int
    exercise_minutes: int

class AdviceResponse(BaseModel):
    advice: str 