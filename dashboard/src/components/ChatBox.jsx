import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [roomId, setRoomId] = useState('');
  const [activeRoom, setActiveRoom] = useState('');
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(process.env.REACT_APP_BACKEND_URL, {
        withCredentials: true,
      });
    }

    const socket = socketRef.current;

    socket.on('message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const joinRoom = () => {
    if (roomId && socketRef.current) {
      socketRef.current.emit('login', { 
        userType: 'admin', 
        userId: 'Admin', 
        roomId 
      });
      setActiveRoom(roomId);
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (text.trim() && socketRef.current && activeRoom) {
      socketRef.current.emit('sendMessage', { roomId: activeRoom, text });
      setText('');
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Patient Chat</h2>
      
      {!activeRoom ? (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter Patient ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="border p-2 rounded mr-2"
          />
          <button 
            onClick={joinRoom}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Start Chat
          </button>
        </div>
      ) : (
        <>
          <div className="mb-2 text-sm text-gray-600">
            Chatting with patient: <span className="font-semibold">{activeRoom}</span>
          </div>
          <div className="h-64 overflow-y-auto border p-4 mb-4 bg-gray-50 rounded">
            {messages.map((msg, i) => (
              <div 
                key={i} 
                className={`mb-2 p-2 rounded max-w-xs ${msg.userType === 'admin' ? 'bg-blue-100 ml-auto' : 'bg-gray-100'}`}
              >
                <div className="font-semibold text-sm">
                  {msg.userId} {msg.userType === 'admin' && '(You)'}
                </div>
                <div>{msg.text}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={sendMessage} className="flex">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 border p-2 rounded-l"
            />
            <button 
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
            >
              Send
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default ChatBox;