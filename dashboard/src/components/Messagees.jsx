import React from 'react';
import ChatBox from './ChatBox';
import Sidebar from './Sidebar';

const Messagees = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Patient Messages</h1>
        <ChatBox />
      </div>
    </div>
  );
};

export default Messagees;