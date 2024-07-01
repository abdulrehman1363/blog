# Blog Posts Application

## Description

This repository contains the backend server and frontend application for the blog posts application.

### Server

The backend server provides API endpoints for managing blog posts.

#### Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd server
2. **Install Dependencies:**
   ```bash
   npm install
3. **Running the Server:**
   ```bash
   npm start
#### Important
Add .env file in the root of server folder and these keys in that file 

3. **.env**
   ```bash
   MONGO_URI=mongodb://127.0.0.1:27017/blogposts
   JWT_SECRET_KEY=blogposts
   PORT=5000
   OPEN_AI_KEY=

### Front-end 

#### Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd front-end
2. **Install Dependencies:**
   ```bash
   npm install
3. **Running the Server:**
   ```bash
   npm run dev 

