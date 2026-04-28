require('dotenv').config();
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const cors = require('cors');
const Document = require('./models/Document');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // allow all for dev
    methods: ["GET", "POST"],
  },
});

mongoose.connect(process.env.MONGODB_URI, {
  // options for mongoose connect are not strictly needed in mongoose 6+
}).then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

const defaultValue = "";

io.on('connection', socket => {
  console.log('User connected', socket.id);

  socket.on('get-document', async documentId => {
    const document = await findOrCreateDocument(documentId);
    socket.join(documentId);
    socket.emit('load-document', document.data);
    socket.emit('load-title', document.title);

    socket.on('send_changes', delta => {
      socket.broadcast.to(documentId).emit('receive_changes', delta);
    });

    socket.on('update-title', async title => {
      socket.broadcast.to(documentId).emit('receive-title', title);
      await Document.findByIdAndUpdate(documentId, { title });
    });

    socket.on('save-document', async data => {
      await Document.findByIdAndUpdate(documentId, { data });
    });
  });
});

app.delete('/documents/:id', async (req, res) => {
  try {
    await Document.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Document deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete document" });
  }
});

async function findOrCreateDocument(id) {
  if (id == null) return;
  
  const document = await Document.findById(id);
  if (document) return document;
  return await Document.create({ _id: id, data: defaultValue, title: "Untitled Document" });
}

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
