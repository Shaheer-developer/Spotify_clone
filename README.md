# 🎵 Full Stack Spotify Clone

A complete music streaming application featuring a user-facing frontend, a comprehensive admin panel for content management, and a robust backend.

## 📂 Project Structure

This project is organized as a monorepo with three main directories:

* **frontend/**: The user interface for browsing and listening to music.
* **admin_panel/**: Dashboard for administrators to upload songs and manage albums.
* **backend/**: API server handling database connections, file uploads (Cloudinary), and data retrieval.

---

## 🚀 Tech Stack

### **Frontend & Admin Panel**
* **Core:** React (v18), Vite
* **Styling:** Tailwind CSS, PostCSS
* **Routing:** React Router DOM
* **HTTP Client:** Axios
* **Notifications:** React Toastify (Admin Panel)

### **Backend**
* **Server:** Node.js, Express.js
* **Database:** MongoDB (via Mongoose)
* **Storage:** Cloudinary (for image and audio file storage)
* **File Handling:** Multer
* **Environment:** Dotenv, Cors

---

## 🛠 Features

* **Music Player:** Play, pause, and control music tracks.
* **Album Management:** Group songs into albums.
* **Admin Dashboard:**
    * **Add Songs:** Upload audio files and cover art directly to Cloudinary.
    * **Add Albums:** Create new albums with descriptions and background colors.
    * **List Views:** View and manage all existing songs and albums.
* **Responsive Design:** Optimized for various screen sizes using Tailwind CSS.

---

## ⚙️ Installation & Setup

### 1. Backend Setup
The backend serves the API for both the frontend and admin panel.

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `backend/` folder and add your credentials:
    ```env
    PORT=4000
    MONGODB_URI=your_mongodb_connection_string
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret
    ```
4.  Start the server:
    ```bash
    npm start
    # or for development with nodemon
    npm run server
    ```

### 2. Admin Panel Setup
1.  Navigate to the admin panel directory:
    ```bash
    cd admin_panel
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```

### 3. Frontend Setup
1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the application:
    ```bash
    npm run dev
    ```

---

## 🔗 API Endpoints (Examples)

The backend provides RESTful endpoints managed by `song.controller.js` and `album.controller.js`.

* `POST /api/song/add` - Upload a new song
* `GET /api/song/list` - Retrieve all songs
* `POST /api/album/add` - Create a new album
* `GET /api/album/list` - Retrieve all albums

---

## 🤝 Contributing

1.  Fork the repository
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request
