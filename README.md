📝 JOTTER – File Manager Backend

A robust backend system for Jotter File Manager, built with Node.js, Express.js, TypeScript, and MongoDB.
This backend powers secure file uploads, folder organization, storage management, and user authentication, including Google OAuth login.

📋 Table of Contents

Features

Tech Stack

Installation

Configuration

Project Structure

API Endpoints

Authentication

File & Folder Management

Error Handling

Development Scripts

Contributing

License

✨ Features
🔐 User Management

User Registration & Login – Secure authentication system

Google OAuth Integration – Login with Google accounts

Password Management – Change password & forgot password with OTP

Profile Management – Update username and profile picture

Account Management – Delete account and reset database

📂 File Management

Upload & Organize Files – Upload multiple files, organize in folders

Search & Filter – Search files by keyword, filter by type or date

Rename & Delete Files – Manage file names and deletion

Favorites – Mark files as favorite & retrieve favorites

Recent & Duplicate Files – Track recent uploads and detect duplicates

📁 Folder Management

Create, delete, and retrieve folders

Retrieve files within folders

Support for nested folders

⚡ Utilities

Storage Details – Track storage usage per user

Text File Management – Update text file content and titles

Profile Pictures – Upload and manage user profile images

Date Filtering – Filter files by date ranges

🛠️ Tech Stack

Runtime: Node.js

Language: TypeScript

Framework: Express.js

Database: MongoDB

Authentication: Passport.js (JWT & Google OAuth)

File Upload: Multer

Email Service: Nodemailer

Password Hashing: bcrypt

Validation: OTP for email verification

📦 Installation
Prerequisites

Node.js v14+

npm or yarn

MongoDB (local or Atlas)

Google OAuth credentials

Steps
# Clone repository
git clone https://github.com/mjunayed2003/Storage-Management-System/
cd jotter-backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Run development server
npm run dev

# Build for production
npm run build
npm start

⚙️ Configuration

Create .env file in the project root (use .env.example as template):

PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
SENDER_EMAIL=noreply@jotter.com

ALLOWED_ORIGINS=http://localhost:3000
MAX_FILE_SIZE=104857600
UPLOAD_DIR=./uploads







🔌 API Endpoints
Authentication
Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	Login user
GET	/api/auth/google	Google OAuth login
GET	/api/auth/google/callback	Google OAuth callback
POST	/api/auth/logout	Logout user
File Management
Method	Endpoint	Description
POST	/api/files/upload	Upload files to folder
GET	/api/files	Get all files in folder
GET	/api/files/recent	Get recent files
GET	/api/files/favorites	Get favorite files
GET	/api/files/search	Search files by keyword
GET	/api/files/filter	Filter files by type
GET	/api/files/duplicates	Find duplicate files
PUT	/api/files/:id/rename	Rename file
PUT	/api/files/:id/favorite	Toggle favorite status
DELETE	/api/files/:id	Delete file
Folder Management
Method	Endpoint	Description
POST	/api/folders	Create folder
GET	/api/folders	Get all folders
GET	/api/folders/:id/files	Get files in folder
DELETE	/api/folders/:id	Delete folder
User Management
Method	Endpoint	Description
GET	/api/users/profile	Get user profile
PUT	/api/users/username	Change username
PUT	/api/users/password	Change password
POST	/api/users/forgot-password	Request password reset
POST	/api/users/verify-otp	Verify OTP
POST	/api/users/reset-password	Reset password
POST	/api/users/profile-pic	Upload profile picture
POST	/api/users/logout	Logout user
DELETE	/api/users/account	Delete account
Storage & Utilities
Method	Endpoint	Description
GET	/api/storage	Get storage details
PUT	/api/files/:id/text	Update text file content
🔐 Authentication

JWT Tokens: Include in Authorization: Bearer <token> header, expires in 7 days

Google OAuth: Login via Google, profile synced automatically

Password Security: Passwords hashed with bcrypt, OTP verification for reset

📤 File & Folder Management

Upload multiple file types and organize in folders

Filter and search files

Manage folders (nested supported)

Detect duplicates and recent uploads

Track user storage and favorites

⚠️ Error Handling

All API errors follow this format:

{
  "success": false,
  "message": "Error description",
  "statusCode": 400,
  "error": "ErrorType"
}

🚀 Development Scripts
npm run dev        # Development with hot reload
npm run build      # Build production code
npm start          # Start production server
npm run type-check # TypeScript type checking
npm run lint       # Linting with ESLint
