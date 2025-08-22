import React from "react";

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center shadow">
      <h2 className="text-xl font-semibold">Dashboard</h2>
      <div className="flex items-center space-x-4">
        <span>Bem-vindo, Admin</span>
        <img src="https://i.pravatar.cc/40" alt="avatar" className="rounded-full w-10 h-10"/>
      </div>
    </header>
  );
}
