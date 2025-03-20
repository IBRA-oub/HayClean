# 🌍 HayClean

## 📌 Project Overview
HayClean is an innovative and intuitive mobile application designed to facilitate waste management and reporting in neighborhoods. The app strengthens communication between citizens and local authorities while raising awareness about eco-friendly practices for a cleaner and healthier environment.

## 🛠️ Technologies Used
- **🖥️ Backend:**
  - NestJS 🏗️
  - MongoDB 🍃
  - MinIO 📦 (for image storage),
  - JWT 🔑 (authentication security)
- **📱 Frontend:** React Native with Expo 🚀
- **🐳 Containerization:** Docker 🐋

## 👥 User Roles
### 👤 Citizen Functionalities
- 🔐 Secure authentication via JWT
- 🗑️ View waste reports in their city with a **dislike** option
- 🌱 Access environmental information about their city
- 📅 View events created by the municipality with options to **participate** or **cancel participation**
- 🔔 Receive notifications for event participation approval or rejection
- 🏠 View and **edit profile information** or **delete their account**
- 🗺️ Locate available **collection points** on a city map
- 📸 Report waste by:
  - Taking a photo
  - Specifying waste **size, type, and accessibility**
  - Adding additional details (optional)
  - **Automatic location detection**

### 🏛️ Municipality Functionalities
- 📌 View **all waste reports** in the city
- 🔍 Access detailed information for each report
- ✅ **Confirm** waste report processing
- 🗑️ **Manage collection points** (add, delete, edit)
- 📅 **Manage events and environmental information**
- 🔔 Notify citizens who want to participate in events and **accept/reject participation**
- 🏠 View and **edit profile information** or **delete account**
![Screenshot 2025-03-20 133712](https://github.com/user-attachments/assets/bcc96557-96a3-4bdb-bcd9-d3e699de3384)
![Screenshot 2025-03-20 133742](https://github.com/user-attachments/assets/c7e39ce6-ed9c-4e2b-b631-8a4583b212e8)

## 📦 Project Setup
### 🔧 Backend Setup
#### Clone the repository
```bash
git clone https://github.com/IBRA-oub/HayClean.git
cd hayclean/BACKEND
```

#### Install dependencies
```bash
npm install
```

#### Setup Your .env
```bash
MONGODB_URI=YOUR_MONGODB_URI
MINIO_ENDPOINT=YOUR_MINIO_ENDPOINT
MINIO_PORT=YOUR_MINIO_PORT
MINIO_ACCESS_KEY=YOUR_MINIO_ACCESS_KEY
MINIO_SECRET_KEY=YOUR_MINIO_SECRET_KEY
MINIO_ROOT_USER=YOUR_MINIO_ROOT_USER
MINIO_ROOT_PASSWORD=YOUR_MINIO_ROOT_PASSWORD
MINIO_BUCKET_NAME=YOUR_MINIO_BUCKET_NAME
ACCESS_TOKEN_SECRET=YOUR_ACCESS_TOKEN_SECRET
GOOGLE_MAIL_APP_EMAIL = YOUR_GOOGLE_MAIL_APP_EMAIL
GOOGLE_MAIL_APP_PASSWORD =YOUR_GOOGLE_MAIL_APP_PASSWORD
```

#### Build and run the Docker 🐳 containers
```bash
docker-compose up --build
```


### 📱 Frontend Setup
```bash
cd ../FRONTEND
```

#### Install dependencies
```bash
npm install
```

#### Setup Your .env
```bash
EXPO_PUBLIC_API_URL = http://YOUR_IP_ADDRESS:3000
EXPO_PUBLIC_IP_ADDRESS = YOUR_IP_ADDRESS
```

#### Start the application
```bash
npx expo start
```

## 📖 API Documentation
The API documentation is available via Swagger at:
```bash
http://localhost:3000/api
```
and Postman :
```bash
https://documenter.getpostman.com/view/33302675/2sAYkErzok
```

