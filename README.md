# 🧠 Dynamic Questionnaire App

A dynamic, multi-step questionnaire application with branching logic, built using **React**, **Redux**, and **FastAPI**. The questionnaire adapts based on user responses and supports storing user data, slide transitions using Framer Motion, and centralized API handling.

---

## ✨ Features

- Dynamic questions served from backend JSON config
- State management with Redux Toolkit
- Clean UI with slide transitions
- Framer Motion for smooth navigation
- Centralized API handling
- Environment variable support for backend URL

---

## 🚀 Project Structure

```
root/
├── backend/         # FastAPI app
├── frontend/        # React app with Vite
├── README.md
```

## Clone the Repository

```bash
git clone https://github.com/Djain318/Full_Stack_Questionnaire_App.git
cd Full_Stack_Questionnaire_App
```

---

##  Backend Setup (FastAPI)

### Prerequisites

- Python 3.8+
- pip

### Setup Steps

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

> The backend will run on `http://localhost:8000` by default.

---

## 💻 Frontend Setup (React + Vite)

### Prerequisites

- Node.js >= 16
- npm

### Setup Steps

```bash
cd frontend
npm install
```

### Create `.env` File

Inside the `frontend/` directory, create a `.env` file:

```env
VITE_BASE_URL=http://localhost:8000
```

Replace the URL with your backend server if needed.

### Run the Frontend App

```bash
npm run dev
```
The frontend will be available at `http://localhost:5173`

---

## 🧪 Example Flow

1. User info is submitted from an initial form.
2. Questions appear based on branching logic.
3. Redux stores responses step by step.
4. Final answers are submitted to the backend.

---

## 📂 API Endpoints

- `POST /answers`: receive and store answers
- `GET /questions`: return next question based on user state

---

## 📝 License

MIT License

---

## 🙌 Contributing

Feel free to open issues, discuss features, or contribute by opening PRs. Let's make it better together!

---

## 📬 Contact

Made with ❤️ by Darshan Jain

