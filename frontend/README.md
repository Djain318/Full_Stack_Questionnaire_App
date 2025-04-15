# Frontend – Dynamic Questionnaire App

This is the frontend for a dynamic, multi-step questionnaire web application built using **React**, **Redux Toolkit**, **Material UI**, and **Vite**. It interacts with a FastAPI backend to display and track user answers based on branching logic.

---

## 🚀 Features

- Multi-step questionnaire with animated transitions
- Dynamic questions fetched from backend
- Answer history navigation (Next/Prev)
- Global state management using Redux Toolkit
- User-friendly UI with Material UI
- Responsive progress indicator

---

## 📁 Project Structure

```
src/
├── components/
│   ├── UserInfoPage.jsx        # Initial form for entering username and user ID
│   └── QuestionPage.jsx        # Dynamic questionnaire page
├── redux/
│   ├── store.js                # Redux store setup
│   └── questionnaireSlice.js  # Redux slice for state handling
├── routes/
│   └── appRoutes.jsx           # App routing config
├── utils/
│   └── apiHandling.jsx         # API communication logic
├── App.jsx                     # Root component with router
└── main.jsx                    # Entry point
```

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Djain318/Full_Stack_Questionnaire_App.git
cd frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create `.env` File

In the `frontend` directory, create a file named `.env` and add:

```env
VITE_BASE_URL='URL_OF_YOUR_BACKEND_SERVER'


Example:

VITE_BASE_URL='http://localhost:8000'
```

### 5. Run the App

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🧠 Tech Stack

- React + Vite
- Redux Toolkit
- Material UI
- Axios
- Framer Motion (optional for transitions)

---

## 📬 Feedback

For any suggestions or improvements, feel free to open an issue or pull request.
