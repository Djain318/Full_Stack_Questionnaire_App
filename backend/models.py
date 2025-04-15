from sqlalchemy import Column, String, Integer, Text, JSON, ForeignKey, DateTime
from sqlalchemy.orm import DeclarativeBase, relationship
from sqlalchemy.sql import func

# declarative base class
class Base(DeclarativeBase):
    pass

class Question(Base):
    __tablename__ = "questions"

    id = Column(String, primary_key=True) 
    text = Column(Text, nullable=False)
    type = Column(String, nullable=False) 
    options = Column(JSON, nullable=True) 
    next_map = Column(JSON, nullable=True) 
    category = Column(String, nullable=True)

    getUserResponses = relationship("UserResponse", back_populates="getQuestions")

class UserResponse(Base):
    __tablename__ = "user_responses"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(String, nullable=False)
    name = Column(String, nullable=True)
    question_id = Column(String, ForeignKey("questions.id"))
    answer = Column(String, nullable=False)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())

    getQuestions = relationship("Question", back_populates="getUserResponses")
