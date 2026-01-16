💬 Microservices Chat AppA scalable, real-time chat application built with a Microservices Architecture. This project decouples user management, messaging, and notifications into separate services, orchestrated via RabbitMQ and REST APIs.🚀 Features🏗️ Microservices Architecture: Distinct services for User, Chat, and Mail.🔐 Secure Auth: Passwordless login via Email OTP & JWT.📨 Async Messaging: Decoupled email notifications using RabbitMQ.⚡ High Performance: Redis caching for OTPs and Rate Limiting.📷 Media Sharing: Image uploads via Multer & Cloudinary.🎨 Modern UI: Built with Next.js 16 and Tailwind CSS v4.🛠️ Tech StackBackendTechDescriptionRuntime environmentWeb framework for API servicesStatic typing for reliabilityPrimary database (Mongoose ODM)Caching & Rate limitingMessage broker for microservicesCloud storage for imagesFrontendTechDescriptionReact framework (App Router)UI LibraryUtility-first CSS framework📂 ArchitectureThe application is split into three core services communicating over HTTP and AMQP:👤 User Service (backend/user)Auth, Profile Management, Token Generation.Produces OTP messages to RabbitMQ.💬 Chat Service (backend/chat)Real-time messaging, Chat history, File uploads.Consumes User Service API for profile data.📧 Mail Service (backend/mail)Background worker that consumes RabbitMQ messages to send emails via Nodemailer.⚙️ Environment ConfigurationCreate a .env file in each service directory with the following variables:1. User Service (backend/user/.env)Code snippetPORT=5000
MONGO_URI=mongodb+srv://<your-db-url>
JWT_SECRET=your_super_secret_key
REDIS_URL=redis://localhost:6379
Rabbitmq_Host=localhost
Rabbitmq_Username=guest
Rabbitmq_Password=guest
2. Chat Service (backend/chat/.env)Code snippetPORT=5002
MONGO_URI=mongodb+srv://<your-db-url>
JWT_SECRET=your_super_secret_key
USER_SERVICE=http://localhost:5000/
Cloud_Name=your_cloud_name
Api_Key=your_api_key
Api_Secret=your_api_secret
3. Mail Service (backend/mail/.env)Code snippetRabbitmq_Host=localhost
Rabbitmq_Username=guest
Rabbitmq_Password=guest
USER=your_email@gmail.com
PASSWORD=your_app_password
4. Frontend (frontend/.env.local)Code snippetNEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
▶️ Running Locally1. Install DependenciesRun this in the root of each service (user, chat, mail, frontend):Bashnpm install
2. Start ServicesYou can run each service in a separate terminal:User ServiceBashcd backend/user && npm run dev
# Runs on http://localhost:5000
Chat ServiceBashcd backend/chat && npm run dev
# Runs on http://localhost:5002
Mail ServiceBashcd backend/mail && npm run dev
# Listens for RabbitMQ events
FrontendBashcd frontend && npm run dev
# Runs on http://localhost:3000
🔌 API ReferenceUser ServiceMethodEndpointDescriptionPOST/api/v1/loginRequest Login OTPPOST/api/v1/verifyVerify OTP & Get TokenGET/api/v1/meGet ProfileChat ServiceMethodEndpointDescriptionPOST/api/v1/chat/newCreate ChatGET/api/v1/chat/allGet My ChatsPOST/api/v1/messageSend Message (Text/Image)GET/api/v1/message/:idGet Chat History
🛠️ Troubleshooting Common Issues
RabbitMQ Connection Failed: Ensure your local RabbitMQ service is running. If using Docker, try docker run -d --hostname my-rabbit --name some-rabbit -p 5672:5672 -p 15672:15672 rabbitmq:3-management.

Cloudinary Error: Ensure Cloud_Name, Api_Key, and Api_Secret are correct in backend/chat/.env.

Redis Error: Ensure Redis is running on port 6379.

Axios 404/Connection Refused: If the Chat service cannot reach the User service, check the USER_SERVICE URL in .env and ensure the User service is running on port 5000.🤝 ContributingFork the ProjectCreate your Feature Branch (git checkout -b feature/AmazingFeature)Commit your Changes (git commit -m 'Add some AmazingFeature')Push to the Branch (git push origin feature/AmazingFeature)Open a Pull Request📝 LicenseDistributed under the ISC License.
