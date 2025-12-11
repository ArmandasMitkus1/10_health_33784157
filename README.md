# Health & Fitness Tracker – DWA Final Lab

This is my Dynamic Web Applications final lab project: a **health & fitness tracking app** built with **Node.js, Express, EJS and MySQL**.

Users can register, log in, add workout entries, view their workout history, and see a visual summary of their training using charts.

---

## 1. Features

- **Home page** with navigation to all main features.
- **About page** describing the purpose of the app.
- **User authentication**
  - Register new users.
  - Log in / log out securely using sessions.
- **Workout logging**
  - Add workouts with date, type, duration and notes.
  - Data stored persistently in a MySQL database.
- **Logs & Search**
  - View all workouts for the logged-in user.
  - Data is queried from the `Workout` table.
- **Charts (Advanced Feature)**
  - Data visualisation using Chart.js.
  - Aggregates total workout duration per workout type and displays it as a bar chart.

---

## 2. Technology Stack

- **Backend:** Node.js, Express
- **View engine:** EJS
- **Database:** MySQL (`health` database)
- **ORM/Driver:** `mysql2/promise`
- **Sessions:** `express-session`
- **Password hashing:** `bcrypt`
- **Charts:** Chart.js (via CDN in `charts.ejs`)

---

## 3. Setup and Installation (Local)

### 3.1. Prerequisites

- Node.js (v16+ recommended)
- MySQL server
- Git

### 3.2. Clone the repository

```bash
git clone https://github.com/your-username/10_health_XXXXXXXX.git
cd 10_health_XXXXXXXX
Replace XXXXXXXX with my 8-digit student ID.

3.3. Install dependencies
bash
Copy code
npm install
This will install all required Node modules.

4. Environment Variables
This project uses a .env file in the root directory.

For local development, use:

env
Copy code
HEALTH_HOST='localhost'
HEALTH_USER='health_app'
HEALTH_PASSWORD='qwertyuiop'
HEALTH_DATABASE='health'
HEALTH_BASE_PATH='http://localhost:8000'
SESSION_SECRET='a_strong_random_secret'
For marking, the database user health_app with password qwertyuiop and database health will be created as described in the brief.

5. Database Setup
5.1. Create the database and tables
From the project root, run:

bash
Copy code
mysql -u health_app -p < create_db.sql
This will:

Create the health database if it does not exist.

Create the User and Workout tables.

5.2. Insert test data (including default login)
bash
Copy code
mysql -u health_app -p < insert_test_data.sql
This will insert the default gold user required for marking, plus any other test data defined in the script.

6. Running the Application
Start the app with:

bash
Copy code
node index.js
The server will listen on:

text
Copy code
http://localhost:8000
For deployment on the Goldsmiths server, the app is proxied via the /usr/428/ path (or equivalent), and HEALTH_BASE_PATH is configured accordingly in .env.

7. Default Login for Marking
The app is configured with the required default user:

Username: gold

Password: smiths123ABC$ (or smiths if specified in insert_test_data.sql)

This user is added via insert_test_data.sql or can be created via the /register page.

8. Main Routes
Public:

GET / – Home page

GET /about – About page

GET /register – User registration form

GET /login – Login form

Authenticated:

GET /logs – View workout logs for the current user

GET /add_workout – Form to add a new workout

POST /add_workout – Save a new workout to the database

GET /charts – View Chart.js visualisation of workouts

GET /logout – Log out and destroy session

9. Files and Structure (Key Files)
index.js
Main application entry point (Express, sessions, DB pool, routes).

routes/auth.js
Handles registration, login and logout.

routes/workouts.js
Handles add workout, logs, and charts (data visualisation).

views/

index.ejs – Home page

about.ejs – About page

login.ejs – Login form

register.ejs – Registration form

add_workout.ejs – Add workout form

logs.ejs – Workout logs table

charts.ejs – Chart.js visualisation page

public/main.css
Basic styling for the app.

create_db.sql
Creates the health database and tables.

insert_test_data.sql
Inserts the default user gold and any other initial data.

links.txt
Contains URLs of the deployed app pages (home, about, login, register, logs, add_workout, charts).

report.docx / report.pdf
Documentation following the required structure:
Outline, Architecture, Data Model, User Functionality, Advanced Techniques, AI Declaration.

10. Deployed URL (Goldsmiths Server)
The deployed app is accessible at:

text
Copy code
https://www.doc.gold.ac.uk/usr/428/
(See links.txt for direct links to all important pages.)

