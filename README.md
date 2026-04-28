# LiveDocs 📝
> Write together. In real-time.

LiveDocs is a full-stack, real-time collaborative document editor that allows multiple users to create, edit, and share documents simultaneously. Inspired by the core functionalities of Google Docs, it provides an instant-syncing experience with a clean, modern SaaS-style user interface.

## 🌟 Features

* **Real-time Collaboration:** Edit documents live with others using WebSockets. Changes appear instantly across all connected clients.
* **Smart Auto-Save:** Implements an optimized debounced auto-save mechanism that efficiently syncs your work to the cloud without overloading the database.
* **Shareable Document Links:** Instantly generate and copy unique document IDs or full URLs to invite collaborators with a single click.
* **Modern UI/UX:** A beautifully crafted, responsive Light Theme featuring smooth animations, glassmorphism-inspired hover effects, and crisp typography (`Inter` & `Poppins`).
* **Rich Text Editing:** Integrated Quill.js providing a robust toolbar for formatting text, adding lists, code blocks, and more.
* **Document Management:** Easily delete documents directly from the workspace when they are no longer needed.

## 🛠️ Tech Stack

**Frontend:**
* [React.js](https://reactjs.org/) (Vite)
* [React Router DOM](https://reactrouter.com/) (Routing)
* [Socket.io-client](https://socket.io/) (Real-time communication)
* [Quill.js](https://quilljs.com/) (Rich text editor)
* [Lucide React](https://lucide.dev/) (Icons)

**Backend:**
* [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
* [Socket.io](https://socket.io/) (WebSocket Server)
* [MongoDB](https://www.mongodb.com/) (Database)
* [Mongoose](https://mongoosejs.com/) (ODM)

---

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites
Make sure you have the following installed:
* [Node.js](https://nodejs.org/) (v16 or higher)
* [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas URI)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/livedocs.git
cd livedocs
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder and add your MongoDB connection string:
```env
MONGODB_URI=mongodb://localhost:27017/livedocs
PORT=3001
```

Start the backend server:
```bash
npm start
# Server should now be running on http://localhost:3001
```

### 3. Frontend Setup
Open a new terminal window, navigate to the frontend directory, and install dependencies:
```bash
cd frontend
npm install
```

Start the React development server:
```bash
npm run dev
# The app should now be running on http://localhost:5173
```

---

## 📂 Project Structure

```text
livedocs/
│
├── backend/               # Express & Socket.io Server
│   ├── models/            # Mongoose schemas (Document.js)
│   ├── server.js          # Entry point & Socket logic
│   └── package.json
│
└── frontend/              # React Client
    ├── src/
    │   ├── components/    # UI Components (Home.jsx, Editor.jsx, Topbar.jsx)
    │   ├── App.jsx        # Main routing
    │   ├── index.css      # Global styles & themes
    │   └── main.jsx       # React DOM render
    └── package.json
```

## 🌐 API Routes & Socket Events

### REST API
* `DELETE /documents/:id` - Deletes a specific document from the database.

### Socket Events
* `get-document` (Client -> Server): Request document data by ID.
* `load-document` (Server -> Client): Sends initial document state.
* `send_changes` (Client -> Server): Emits Delta changes to the server.
* `receive_changes` (Server -> Client): Broadcasts changes to other users in the room.
* `save-document` (Client -> Server): Triggers a database update for the document.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check [issues page](#) if you want to contribute.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License
This project is licensed under the MIT License.
