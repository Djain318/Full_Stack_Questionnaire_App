# Backend README for Questionnaire Application

This backend is built using **FastAPI**, **SQLAlchemy**, and **SQLite** to manage the questions and store user responses for the questionnaire application.

## 📁 Project Structure

```
├── main.py                    # FastAPI app and API routes
├── database.py                # DB engine, session, and seeding logic
├── models.py                  # SQLAlchemy models for DB tables
├── questionnaire_config.json  # JSON config defining dynamic question flow
├── requirements.txt           # Python dependencies
```

---

## ⚙️ Setup and Installation

1. **Clone the Repository**

```bash
git clone https://github.com/Djain318/Full_Stack_Questionnaire_App.git
cd backend
```

2. **Create and Activate a Virtual Environment**

```bash
python3 -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
```

3. **Install Dependencies**

```bash
pip install -r requirements.txt
```

4. **Run the Application**

```bash
uvicorn main:app --reload
```

This will start the FastAPI app at:  
📍 `http://127.0.0.1:8000`  
📚 Swagger UI: `http://127.0.0.1:8000/docs`

---

## 🧠 What the Backend Does

- Dynamically serves questions from a DB, driven by branching logic.
- Records user responses and returns the next question based on the previous answer.
- Persists questions and user answers in SQLite using SQLAlchemy.
- Seeds questions from `questionnaire_config.json` into DB on first run.

---

## 🔌 API Endpoints

### 1. `GET /getQuestion`

- **Returns**: List of all questions in the DB.
- **Response**:
```json
[
  {
    "id": "q1",
    "text": "Which language do you like?",
    "type": "mcq",
    "options": ["python", "java", "javascript"],
    "next_map": {"python": "q2_py", "java": "q2_java", "javascript": "q2_js"},
    "category": "language"
  }
]
```

---

### 2. `GET /questions?user_id=your_id`

- **Purpose**: Get the next question for the given user.
- **Query param**: `user_id` (string)
- **Response**:
If next question is found:
```json
{
  "id": "q2_py",
  "text": "What Python framework do you like?",
  "type": "mcq",
  "options": ["Django", "Flask", "FastAPI"],
  "next_map": {...},
  "category": "python"
}
```

If completed:
```json
{ "message": "🎉 Questionnaire completed!" }
```

---

### 3. `POST /answers`

- **Purpose**: Submit a user's answer to a question.
- **Body**:
```json
{
  "user_id": "user123",
  "question_id": "q1",
  "answer": "python"
}
```

- **Response**:
```json
{ "message": "✅ Answer saved!" }
```

---

## 🗃️ Database Models

### `Question`

| Field      | Type    | Description                              |
|------------|---------|------------------------------------------|
| id         | string  | Unique question ID                       |
| text       | string  | The question text                        |
| type       | string  | Question type (e.g., mcq)                |
| options    | JSON    | Array of choices (if mcq)                |
| next_map   | JSON    | Mapping of answer ➝ next question ID     |
| category   | string  | Category of the question (optional)      |

---

### `UserResponse`

| Field        | Type      | Description                        |
|--------------|-----------|------------------------------------|
| id           | int       | Primary key                        |
| user_id      | string    | ID of the user                     |
| question_id  | string    | ID of the answered question        |
| answer       | string    | Submitted answer                   |
| timestamp    | datetime  | Submission time (auto-generated)   |

---

## 💽 Database Seeding

- When the app starts, if no questions exist, `database.py` loads `questionnaire_config.json` and inserts questions into the DB.
- The DB file is stored at: `./instance/database.db`

To re-seed manually:
```bash
python database.py
```

---

## 📦 requirements.txt

```
fastapi
uvicorn
sqlalchemy
pydantic
```

---

## 🧪 Test the API

Visit the FastAPI interactive Swagger UI:

🔗 [http://localhost:8000/docs](http://localhost:8000/docs)

You can test all endpoints directly from the browser!

---

## ✅ Summary

This backend powers a dynamic multi-step questionnaire system.  
Each user's response determines the flow of upcoming questions using flexible JSON configuration logic.  
Built using modern Python backend tools with rapid development and testing in mind.
