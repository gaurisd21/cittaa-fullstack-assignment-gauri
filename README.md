# 🌐 Cittaa Fullstack Assignment

This repository contains a **full-stack web application** built with **Django** for the backend and **Next.js** for the frontend.  
It demonstrates authentication using **JWT**, RESTful APIs, and a responsive UI styled with **Tailwind CSS**.

---

## 🏗️ Tech Stack

### Backend
- Framework: Django (Python)
- Authentication: JSON Web Tokens (JWT)
- Package Management: `pip` + `requirements.txt`
- API: REST Framework

### Frontend
- Framework: Next.js (React)
- Styling: Tailwind CSS
- Package Management: npm / yarn
- Config: `.gitignore`, `package.json`, `postcss.config.js`, `tsconfig.json`, etc.

---

## 📁 Project Structure

cittaa-fullstack-assignment/
│
├── backend/ # Django backend project
│ ├── manage.py
│ ├── requirements.txt
│ ├── core/ # Django project root
│ ├── apps/ # Django apps (models, views, etc.)
│ └── ...
│
├── frontend/ # Next.js frontend project
│ ├── src/ # Source files
│ ├── public/ # Static assets
│ ├── package.json
│ ├── tailwind.config.js
│ └── ...
│
└── README.md

yaml
Copy code

---

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/cittaa-fullstack-assignment.git
cd cittaa-fullstack-assignment
2. Backend Setup
bash
Copy code
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
Backend runs at: http://127.0.0.1:8000

3. Frontend Setup
bash
Copy code
cd ../frontend
npm install
npm run dev
Frontend runs at: http://localhost:3000

.next/ and node_modules/ are excluded from version control to avoid large uploads.

🔐 Authentication (JWT)
Tokens are generated on successful login.

Include JWT in the Authorization header for protected API routes.

Validates user access securely.

🧰 Notes
Ensure Python ≥ 3.9 and Node.js ≥ 18 are installed.

Install backend dependencies with pip install -r requirements.txt

Install frontend dependencies with npm install
