💬 Microservices Chat Application
A modern, scalable chat application built with a Microservices Architecture. This project separates concerns into distinct services for user management, messaging, and email notifications, communicating via RabbitMQ and REST APIs.

🚀 Features
Microservices Architecture: Backend split into User, Chat, and Mail services.

Authentication: Secure passwordless login using Email OTP (One-Time Password).

Message Queue: Asynchronous email delivery using RabbitMQ.

Caching & Rate Limiting: Uses Redis for OTP storage and API rate limiting.

Media Support: Image sharing in chats using Cloudinary and Multer.

Internal Communication: Service-to-service communication via HTTP (Axios) and Message Queues.

Frontend: Built with Next.js 16, React 19, and Tailwind CSS v4.

🛠️ Tech Stack
Backend
Runtime: Node.js, Express.js

Language: TypeScript

Databases: MongoDB (Mongoose), Redis

Message Broker: RabbitMQ (amqplib)

Storage: Cloudinary

Tools: Nodemailer, JWT, Axios, Concurrently

Frontend
Framework: Next.js (App Router)

Styling: Tailwind CSS

Language: TypeScript

📂 Architecture Overview
The backend is divided into three distinct folders/services:

User Service (backend/user):

Handles User Auth (Login/Verify), Profile management, and Token generation.

Produces messages to RabbitMQ (send-otp queue).

Uses Redis for caching OTPs and rate limiting.

Chat Service (backend/chat):

Handles Chat creation, Messaging, and retrieving chat history.

Communicates with User Service via REST API to fetch user details.

Handles file uploads (images) to Cloudinary.

Mail Service (backend/mail):

Consumes messages from RabbitMQ.

Sends emails using Nodemailer.

⚙️ Environment Variables
You must set up .env files in four locations.

1. User Service (backend/user/.env)
Code snippet

PORT=5000
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_secret_key
REDIS_URL=redis://localhost:6379
Rabbitmq_Host=localhost
Rabbitmq_Username=guest
Rabbitmq_Password=guest
2. Chat Service (backend/chat/.env)
Code snippet

PORT=5002
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_secret_key
USER_SERVICE=http://localhost:5000/
Cloud_Name=your_cloud_name
Api_Key=your_api_key
Api_Secret=your_api_secret
3. Mail Service (backend/mail/.env)
Code snippet

Rabbitmq_Host=localhost
Rabbitmq_Username=guest
Rabbitmq_Password=guest
USER=your_email@gmail.com
PASSWORD=your_email_app_password
4. Frontend (frontend/.env.local)
Code snippet

NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
🚀 Getting Started
Prerequisites
Ensure you have the following installed locally or via Docker:

Node.js & npm

MongoDB

Redis

RabbitMQ

Installation
Clone the repository

Bash

git clone https://github.com/your-username/chat-app.git
cd chat-app
Install Dependencies You need to install dependencies for all 4 folders.

Bash

# Root Backend
cd backend && npm install

# User Service
cd user && npm install

# Chat Service
cd ../chat && npm install

# Mail Service
cd ../mail && npm install

# Frontend
cd ../../frontend && npm install
▶️ Running the Application
Option 1: Run Backend Services Individually
Open 3 separate terminals:

Terminal 1 (User Service):

Bash

cd backend/user
npm run dev
Terminal 2 (Chat Service):

Bash

cd backend/chat
npm run dev
Terminal 3 (Mail Service):

Bash

cd backend/mail
npm run dev
Option 2: Run Frontend
Terminal 4:

Bash

cd frontend
npm run dev
The frontend will be available at http://localhost:3000.

🔌 API Endpoints
User Service (/api/v1)
POST /login - Request OTP for email login.

POST /verify - Verify OTP and get JWT.

GET /me - Get current user profile.

POST /update/user - Update user name.

Chat Service (/api/v1)
POST /chat/new - Create a new chat or fetch existing one.

GET /chat/all - Get all chats for the logged-in user.

POST /message - Send a text or image message (multipart/form-data).

GET /message/:chatId - Get messages for a specific chat.

🛠️ Troubleshooting Common Issues
RabbitMQ Connection Failed: Ensure your local RabbitMQ service is running. If using Docker, try docker run -d --hostname my-rabbit --name some-rabbit -p 5672:5672 -p 15672:15672 rabbitmq:3-management.

Cloudinary Error: Ensure Cloud_Name, Api_Key, and Api_Secret are correct in backend/chat/.env.

Redis Error: Ensure Redis is running on port 6379.

Axios 404/Connection Refused: If the Chat service cannot reach the User service, check the USER_SERVICE URL in .env and ensure the User service is running on port 5000.
