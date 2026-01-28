<a name="readme-top"></a>

<br />
<div align="center">
  <a href="https://github.com/your_username/repo_name">
    <img src="https://cdn-icons-png.flaticon.com/512/1041/1041916.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Microservices Chat Application</h3>

  <p align="center">
    A scalable, real-time messaging platform built with Node.js Microservices, RabbitMQ, and Next.js.
    <br />
    <a href="#demo">View Demo</a>
    ·
    <a href="https://github.com/your_username/repo_name/issues">Report Bug</a>
    ·
    <a href="https://github.com/your_username/repo_name/issues">Request Feature</a>
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#tech-stack">Tech Stack</a></li>
    <li><a href="#architecture">Architecture</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#environment-variables">Environment Variables</a></li>
    <li><a href="#api-reference">API Reference</a></li>
  </ol>
</details>

---

## 📸 About The Project

<div align="center">
  <img src="https://via.placeholder.com/800x400?text=Chat+App+Dashboard+Screenshot" alt="Project Screenshot" width="100%">
</div>
<br>

This project is a fully functional **Real-Time Chat Application** designed to demonstrate a robust **Microservices Architecture**. Unlike traditional monolithic apps, this system decouples user management, messaging, and notifications into isolated services that communicate asynchronously.

**Key capabilities include:**
* **Security:** Passwordless login system using Email OTPs.
* **Scalability:** Service-to-service communication handled via RabbitMQ message brokers.
* **Performance:** Redis-powered caching strategies for rate limiting and temporary data storage.
* **Media:** Seamless image sharing capabilities integrated with Cloudinary.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## 🛠️ Tech Stack

### **Backend**
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)
![RabbitMQ](https://img.shields.io/badge/Rabbitmq-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)

### **Frontend**
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## 🏗️ Architecture

The application is structured into three distinct microservices:

1.  **👤 User Service** (`/backend/user`)
    * **Responsibility:** Authentication (Login/Verify), User Profile management.
    * **Tech:** Express, MongoDB, Redis (for OTPs).
    * **Events:** Publishes `send-otp` events to RabbitMQ.

2.  **💬 Chat Service** (`/backend/chat`)
    * **Responsibility:** Real-time messaging, Chat room management, Media uploads.
    * **Tech:** Express, MongoDB, Multer + Cloudinary.
    * **Communication:** Calls User Service API internally to hydrate user data.

3.  **📧 Mail Service** (`/backend/mail`)
    * **Responsibility:** Background email processing.
    * **Tech:** Nodemailer, AMQPLib.
    * **Events:** Consumes `send-otp` events from RabbitMQ.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
* Node.js (v18+)
* MongoDB (Local or Atlas)
* Redis (Local or Cloud)
* RabbitMQ (Local or Docker)

### Installation

1.  **Clone the repo**
    ```sh
    git clone [https://github.com/your_username/chat-app.git](https://github.com/your_username/chat-app.git)
    cd chat-app
    ```

2.  **Install Backend Dependencies** (Run in `backend/user`, `backend/chat`, and `backend/mail`)
    ```sh
    cd backend/user && npm install
    cd ../chat && npm install
    cd ../mail && npm install
    ```

3.  **Install Frontend Dependencies**
    ```sh
    cd ../../frontend && npm install
    ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## 🔑 Environment Variables

Create `.env` files in the respective directories.

### Backend Services

**📂 backend/user/.env**
```env
PORT=5000
MONGO_URI=mongodb+srv://...
JWT_SECRET=super_secret
REDIS_URL=redis://localhost:6379
Rabbitmq_Host=localhost
Rabbitmq_Username=guest
Rabbitmq_Password=guest
📂 backend/chat/.envCode snippetPORT=5002
MONGO_URI=mongodb+srv://...
JWT_SECRET=super_secret
USER_SERVICE=http://localhost:5000/
Cloud_Name=...
Api_Key=...
Api_Secret=...
📂 backend/mail/.envCode snippetRabbitmq_Host=localhost
Rabbitmq_Username=guest
Rabbitmq_Password=guest
USER=email@gmail.com
PASSWORD=app_password
### Frontend

**📂 frontend/.env.local**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
<p align="right">(<a href="#readme-top">back to top</a>)</p>📡 API ReferenceUser ServiceMethodEndpointDescriptionAuthPOST/api/v1/loginRequest OTP for Login❌POST/api/v1/verifyVerify OTP & Get Token❌GET/api/v1/meGet Profile Details✅POST/api/v1/update/userUpdate Display Name✅Chat ServiceMethodEndpointDescriptionAuthPOST/api/v1/chat/newInitialize a Chat✅GET/api/v1/chat/allFetch All Chats✅POST/api/v1/messageSend Message (Text/Img)✅GET/api/v1/message/:idGet Chat History✅<p align="right">(<a href="#readme-top">back to top</a>)</p>🤝 ContributingContributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.Fork the ProjectCreate your Feature Branch (git checkout -b feature/AmazingFeature)Commit your Changes (git commit -m 'Add some AmazingFeature')Push to the Branch (git push origin feature/AmazingFeature)Open a Pull Request<p align="right">(<a href="#readme-top">back to top</a>)</p>

Redis Error: Ensure Redis is running on port 6379.

Axios 404/Connection Refused: If the Chat service cannot reach the User service, check the USER_SERVICE URL in .env and ensure the User service is running on port 5000.🤝 ContributingFork the ProjectCreate your Feature Branch (git checkout -b feature/AmazingFeature)Commit your Changes (git commit -m 'Add some AmazingFeature')Push to the Branch (git push origin feature/AmazingFeature)Open a Pull Request📝 LicenseDistributed under the ISC License.
