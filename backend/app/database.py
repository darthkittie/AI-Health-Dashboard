from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import datetime

DATABASE_URL = "sqlite:///./health_dashboard.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class UserData(Base):
    __tablename__ = "user_data"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    age = Column(Integer)
    weight = Column(Integer)
    sleep_hours = Column(Integer)
    exercise_minutes = Column(Integer)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class AdviceHistory(Base):
    __tablename__ = "advice_history"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer)
    advice = Column(Text)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

# Create tables
Base.metadata.create_all(bind=engine) 