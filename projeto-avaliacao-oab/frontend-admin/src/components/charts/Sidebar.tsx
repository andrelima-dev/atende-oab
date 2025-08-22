import React from "react";
import { Home, BarChart2, Settings } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="bg-gray-900 text-gray-100 w-64 min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-8">Painel Admin</h1>
      <nav className="space-y-4">
        <a href="#" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-800">
          <Home size={20}/> <span>Início</span>
        </a>
        <a href="#" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-800">
          <BarChart2 size={20}/> <span>Estatísticas</span>
        </a>
        <a href="#" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-800">
          <Settings size={20}/> <span>Configurações</span>
        </a>
      </nav>
    </aside>
  );
}
