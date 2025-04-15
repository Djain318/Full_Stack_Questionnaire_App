from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base, Question, UserResponse
import json

# Create engine for SQLite
engine = create_engine("sqlite:///./instance/database.db", echo=True)

# Create all tables (if not already created)
Base.metadata.create_all(bind=engine)

# Session factory
SessionLocal = sessionmaker(bind=engine)

# Define the function to load and insert data
def seed_ques_data():
    with SessionLocal() as session:
        # Load data from the JSON file
        with open("questionnaire_config.json", "rt") as f:
            data = json.load(f)

        # Loop through each question and insert into DB
        for question in data["questions"]:
            q = Question(
                id=question["id"],
                text=question["text"],
                type=question["type"],
                options=question.get("options"),
                next_map=question.get("next_map"),
                category=question.get("category")
            )
            session.add(q)

        session.commit()

# Optional: run the seeding function
if __name__ == "__main__":
    seed_ques_data()
