import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const location = useLocation();
  
  // Patient ID-ni URL-dən al (məsələn: /chat/patient123)
  const patientId = location.pathname.split('/').pop() || 'unknown';

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(process.env.REACT_APP_BACKEND_URL, {
        withCredentials: true,
      });

      // Serverə giriş et
      socketRef.current.emit('login', { 
        userType: 'patient', 
        userId: `Patient-${patientId}`, 
        roomId: `patient_${patientId}` 
      });
    }

    const socket = socketRef.current;

    socket.on('message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off('message');
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [patientId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (text.trim() && socketRef.current) {
      socketRef.current.emit('sendMessage', { 
        roomId: `patient_${patientId}`, 
        text 
      });
      setText('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Chat with Admin</h1>
      
      <div className="border rounded-lg shadow-lg overflow-hidden">
        <div className="bg-blue-600 text-white p-4">
          <h2 className="text-xl">Your Chat Session</h2>
          <div className="text-sm">Patient ID: {patientId}</div>
        </div>
        
        <div className="h-96 overflow-y-auto p-4 bg-gray-50">
          {messages.map((msg, i) => (
            <div 
              key={i} 
              className={`mb-3 p-3 rounded-lg max-w-xs ${msg.userType === 'patient' ? 'bg-blue-100 ml-auto' : 'bg-gray-100'}`}
            >
              <div className="font-semibold text-sm">
                {msg.userId} {msg.userType === 'patient' && '(You)'}
              </div>
              <div>{msg.text}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <form onSubmit={sendMessage} className="p-4 border-t flex">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border p-2 rounded-l focus:outline-none"
          />
          <button 
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-r hover:bg-blue-700 transition"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;