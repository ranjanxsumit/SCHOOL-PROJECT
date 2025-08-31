# 🏫 School Management Mini-Project

A full-stack web application to manage and display school listings. Built with Next.js, React Hook Form, MySQL, and Cloudinary for image hosting. Users can add schools with details like name, address, contact info, and an image, which is uploaded and stored securely.

--- <img width="1855" height="895" alt="image" src="https://github.com/user-attachments/assets/d328198a-b39f-4078-b94b-1f364031216e" />

<img width="1652" height="864" alt="image" src="https://github.com/user-attachments/assets/d51d7ab4-0260-4a1a-9d8c-fc735c5b092e" />

<img width="1643" height="895" alt="image" src="https://github.com/user-attachments/assets/a98f74c5-1b6f-4b1f-9ec5-3a261bf890bd" />




## 📌 Project Overview

This project fulfills the assignment requirements by implementing:

- ✅ A **form page** to input and store school data (`addSchool.jsx`)
- ✅ A **display page** to fetch and show school listings (`showSchools.jsx`)
- ✅ **MySQL integration** for persistent storage
- ✅ **Image upload** to a local folder (`/public/schoolImages`)
- ✅ **Responsive design** for both desktop and mobile
- ✅ **Form validation** using `react-hook-form`

---

## 🗃️ Database Schema

Table: `schools`

| Field      | Type         | Description              |
|------------|--------------|--------------------------|
| id         | INT          | Auto-increment primary key |
| name       | TEXT         | School name              |
| address    | TEXT         | Full address             |
| city       | TEXT         | City                     |
| state      | TEXT         | State                    |
| contact    | BIGINT       | Contact number           |
| image      | TEXT         | Image filename           |
| email_id   | TEXT         | School email             |

---

## 📄 Pages

### 1. `addSchool.jsx`
- Form to input school details
- Validates email, contact number, and required fields
- Uploads image to `/public/schoolImages`
- Submits data to `/api/addSchool`

### 2. `showSchools.jsx`
- Fetches school data from `/api/getSchools`
- Displays name, address, city, and image
- Styled like an ecommerce product grid
- Fully responsive

---

## 🚀 Getting Started

🚀 Features
Add new schools with form validation

Upload school images to Cloudinary

Store school data in MySQL

View all schools in a responsive listing

Live image preview before submission

Deployed on Render for production

🛠️ Tech Stack
Layer	Tools & Libraries
Frontend	Next.js, React, Tailwind CSS, React Hook Form
Backend	Node.js (API routes), Cloudinary SDK, Formidable
Database	MySQL (via mysql2)
Deployment	Render (Web Service)
Image Hosting	Cloudinary

📦 Dependencies

Core
json
"next": "15.5.2",
"react": "19.1.0",
"react-dom": "19.1.0",
"react-hook-form": "^7.62.0",
"mysql2": "^3.14.3",
"cloudinary": "^1.37.1",
"formidable": "^2.0.1"
Dev
json
"eslint": "^9",
"eslint-config-next": "15.5.2",
"tailwindcss": "^4",
"typescript": "^5",
"@types/react": "^19",
"@types/node": "^20"


🌐 Deployment on Render
1. Create a Web Service
Go to Render

Click “New Web Service”

Connect your GitHub repo

Set build command:

bash
npm install && npm run build
Set start command:

bash
npm start
2. Set Environment Variables
Go to your service → Environment tab → add:

env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
DB_HOST=your_mysql_host
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name
These are used in lib/db.js and uploadImage.js to connect to MySQL and Cloudinary.

3. Auto Deploy
Render will auto-deploy on every push to main

You can trigger manual deploys from the dashboard

📁 Project Structure
Code
src/
├── lib/
│   └── db.js               # MySQL connection
├── pages/
│   ├── api/
        ├── getSchool.js
│   │   ├── addSchool.js    # (optional legacy route)
│   │   └── uploadImage.js  # Cloudinary upload + DB insert
│   ├── index.tsx           # Homepage
│   ├── showSchools.js      # School listing page
│   └── addSchool.jsx       # Form to add school
├── styles/
│   └── globals.css         # Tailwind base styles


🧪 Local Development

bash
npm install
npm run dev
Create .env.local with:

.env

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=school_db
📸 Image Upload Flow
User selects image in form

Preview shown via URL.createObjectURL

Image sent to /api/uploadImage

Cloudinary returns secure URL

URL stored in MySQL

Image rendered from Cloudinary in frontend/<your-username>/school-project.git
cd school-project
