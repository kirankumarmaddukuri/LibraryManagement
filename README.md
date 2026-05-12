# 📚 Library Book Management System

A full-stack application for managing a library's books, members, and issue/return processes. Built with **Spring Boot** for the backend and **React** for the frontend.

## 🚀 Features

- **Book Management**: Add new books and view the complete catalog.
- **Member Registration**: Register new members to the library system.
- **Issue & Return System**: 
  - Issue available books to registered members.
  - Enforces a business rule limiting members to a maximum of **3 active book issues**.
  - Tracks issue dates and return dates.
- **Real-Time UI**: The React frontend seamlessly fetches and updates data without page reloads.

## 🛠️ Technology Stack

### Backend
- **Java 17**
- **Spring Boot 3.2.x** (Web, Data JPA, Validation)
- **PostgreSQL** (Database)
- **Maven**

### Frontend
- **React 18**
- **Vite** (Build Tool)
- **Axios** (API Requests)
- **Vanilla CSS** (Light Mode Premium UI)

---

## ⚙️ Getting Started

### Prerequisites
- [Java 17+](https://adoptium.net/)
- [Maven](https://maven.apache.org/)
- [Node.js 20+](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)

### 1. Database Setup
1. Open your PostgreSQL server (e.g., using pgAdmin or psql).
2. Create a new database named `library_db`:
   ```sql
   CREATE DATABASE library_db;
   ```
3. The backend is configured to use `postgres` as both the username and password on `localhost:5432`. If your credentials differ, update `backend/src/main/resources/application.properties`.

### 2. Running the Backend (Spring Boot)
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Run the application using Maven:
   ```bash
   mvn spring-boot:run
   ```
3. The REST API will be available at `http://localhost:8080`. (JPA will automatically create the required database tables on startup).

### 3. Running the Frontend (React)
1. Open a separate terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to the URL provided by Vite (typically `http://localhost:5173`).

---

## 📡 API Endpoints Reference

The backend exposes a fully RESTful API on `http://localhost:8080`.

| Method | Endpoint | Description |
|--------|----------|-------------|
| **GET** | `/books` | Retrieve all books |
| **GET** | `/books/available` | Retrieve only available books |
| **GET** | `/books/search?query=...` | Search books by title or author |
| **POST** | `/books` | Add a new book |
| **GET** | `/members` | Retrieve all members |
| **POST** | `/members` | Register a new member |
| **GET** | `/members/{id}/issues` | Get all issues for a specific member |
| **POST** | `/issues/issue` | Issue a book to a member |
| **PUT** | `/issues/return/{issueId}` | Return an issued book |

---

## 💡 Business Rules Implemented
- A book can only be issued if its `availability` status is true.
- A single member cannot have more than **3 active issues** at any given time.
- Returning a book automatically makes it available again for other members.

