import { useCallback, useEffect, useState, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import Topbar from './Topbar';

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['bold', 'italic', 'underline'],
  [{ color: [] }, { background: [] }],
  [{ script: 'sub' }, { script: 'super' }],
  [{ align: [] }],
  ['image', 'blockquote', 'code-block'],
  ['clean'],
];

export default function Editor() {
  const { id: documentId } = useParams();
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();
  const [title, setTitle] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const saveTimeoutRef = useRef(null);

  // Setup Socket.IO connection
  useEffect(() => {
    const s = io('http://localhost:3001');
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  // Join Document Room
  useEffect(() => {
    if (socket == null || quill == null) return;

    socket.once('load-document', (document) => {
      quill.setContents(document);
      quill.enable();
    });

    socket.once('load-title', (documentTitle) => {
      setTitle(documentTitle);
    });

    socket.emit('get-document', documentId);
  }, [socket, quill, documentId]);

  // Sync Title Changes (Incoming)
  useEffect(() => {
    if (socket == null) return;

    const handler = (newTitle) => {
      setTitle(newTitle);
    };

    socket.on('receive-title', handler);
    return () => socket.off('receive-title', handler);
  }, [socket]);

  // Sync Title Changes (Outgoing)
  const handleTitleChange = (newTitle) => {
    setTitle(newTitle);
    if (socket == null) return;
    socket.emit('update-title', newTitle);
  };

  // Sync Document Changes (Incoming)
  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta) => {
      quill.updateContents(delta);
    };

    socket.on('receive_changes', handler);
    return () => socket.off('receive_changes', handler);
  }, [socket, quill]);

  // Sync Document Changes (Outgoing) & Debounced Auto-Save
  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta, oldDelta, source) => {
      if (source !== 'user') return;
      socket.emit('send_changes', delta);
      setIsSaving(true);
      
      // Debounce the save operation
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      
      saveTimeoutRef.current = setTimeout(() => {
        socket.emit('save-document', quill.getContents());
        setIsSaving(false);
      }, 1500); // Save 1.5s after user stops typing
    };

    quill.on('text-change', handler);
    return () => quill.off('text-change', handler);
  }, [socket, quill]);

  // Initialize Quill
  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;
    wrapper.innerHTML = '';

    const editor = document.createElement('div');
    wrapper.append(editor);

    const q = new Quill(editor, {
      theme: 'snow',
      modules: { toolbar: TOOLBAR_OPTIONS },
    });
    
    q.disable();
    q.setText('Loading...');
    setQuill(q);
  }, []);

  return (
    <div className="app-container">
      <Topbar 
        title={title} 
        onTitleChange={handleTitleChange} 
        isSaving={isSaving} 
        documentId={documentId}
      />
      <div className="editor-wrapper" ref={wrapperRef}></div>
    </div>
  );
}
