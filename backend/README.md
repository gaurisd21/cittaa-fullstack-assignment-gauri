# Cittaa Backend

Django backend for the Cittaa full-stack application.  
Includes REST APIs and JWT-based authentication for secure access.

---

## Tech Stack

- **Framework:** Django (Python)  
- **Authentication:** JSON Web Tokens (JWT)  
- **Dependencies:** Listed in `requirements.txt`  

---

## Project Structure

backend/
├── manage.py
├── requirements.txt
├── core/ # Django project root
├── apps/ # Django apps (models, views, etc.)
└── ...

yaml
Copy code

---

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/cittaa-fullstack-assignment.git
cd cittaa-fullstack-assignment/backend
2. Create and activate a virtual environment
bash
Copy code
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
3. Install dependencies
bash
Copy code
pip install -r requirements.txt
4. Apply migrations
bash
Copy code
python manage.py migrate
5. Run the server
bash
Copy code
python manage.py runserver
Backend runs at: http://127.0.0.1:8000

Authentication (JWT)
Tokens are generated on login

Include JWT in Authorization header for protected API routes

Ensures secure access to backend endpoints

Notes
Python ≥ 3.9 required

.gitignore ensures sensitive files and virtual environment are not tracked