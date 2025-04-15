from fastapi import FastAPI, Query, HTTPException
from datetime import datetime
from sqlalchemy.orm import Session
from database import SessionLocal, seed_ques_data
from models import Question, UserResponse
from pydantic import BaseModel
from typing import List, Optional, Dict
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware

# Pydantic schema
class QuestionOut(BaseModel):
    id: str
    text: str
    type: str
    options: Optional[List[str]] = None 
    next_map: Optional[Dict[str, str]] = None
    category: Optional[str] = None

class AnswerInput(BaseModel):
    user_id: str
    question_id: str
    answer: str

# Lifespan function to initialize DB session at startup
@asynccontextmanager
async def lifespan(app: FastAPI):
    db: Session = SessionLocal()  # Initialize DB session
    # Store the session globally for the app
    app.state.db = db
    
    # Seed data if database is empty
    if db.query(Question).count() == 0:
        seed_ques_data()
    
    print("🎉 DB Session Starts")

    yield  # App runs after this

    # Clean up when app stops
    db.close()
    print("🖲️ DB Session Stop")

app = FastAPI(lifespan=lifespan)

# Enable CORS to avoid frontend cross-origin issues
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict this to specific domains in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Accessing the DB session directly from app.state
@app.get("/getQuestion", response_model=List[QuestionOut])
def get_all_questions():
    db: Session = app.state.db  # Access the DB session
    return db.query(Question).all()

@app.get("/questions")
def get_next_question(user_id: str = Query(...)):
    db: Session = app.state.db  # Using global session from lifespan

    # Fetch last answer from UserResponse table
    last_response = (
        db.query(UserResponse)
        .filter(UserResponse.user_id == user_id)
        .order_by(UserResponse.timestamp.desc())
        .first()
    )

    # If no previous response, return first question (q1)
    if not last_response:
        first_question = db.query(Question).filter(Question.id == "q1").first()
        if not first_question:
            raise HTTPException(status_code=404, detail="First question not found")
        return first_question

    #  Get the answer from last response and map to next question using next_map
    current_question = db.query(Question).filter(Question.id == last_response.question_id).first()
    if not current_question:
        raise HTTPException(status_code=404, detail="Current question not found")

    next_question_id = (current_question.next_map or {}).get(last_response.answer)

    # 4. If next question ID found, fetch and return it
    if next_question_id:
        next_question = db.query(Question).filter(Question.id == next_question_id).first()
        if not next_question:
            return {"message": "🎉 Questionnaire completed!"}
        return next_question

    # If next_question_id not found in next_map
    return {"message": "🎉 Questionnaire completed!"}

@app.post("/answers")
def submit_answer(answer: AnswerInput):
    db: Session = app.state.db

    db.add(UserResponse(
        user_id=answer.user_id,
        question_id=answer.question_id,
        answer=answer.answer,
    ))
    db.commit()

    return {"message": "✅ Answer saved!"}
