import { useState, useEffect } from "react";
import { UserCard } from "./components/UserCard";
import { Chart } from "./components/Chart";

interface User {
  id: number;
  name: string;
  email: string;
  submittedAt: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);

  // Simula fetch de usuários que enviaram o formulário
  useEffect(() => {
    const fetchUsers = async () => {
      // Aqui você pode conectar ao seu backend ou API real
      const data: User[] = [
        { id: 1, name: "Marcos André", email: "marcos@email.com", submittedAt: "2025-08-22" },
        { id: 2, name: "Camylle Raquel", email: "camylle@email.com", submittedAt: "2025-08-21" },
        { id: 3, name: "Raiglelson Barbosa", email: "raiglelson@email.com", submittedAt: "2025-08-20" },
      ];
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-blue-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-6">Dashboard de Formulários</h1>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-blue-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold">Total de Usuários</h2>
          <p className="text-3xl mt-2">{users.length}</p>
        </div>
        <div className="bg-blue-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold">Última Submissão</h2>
          <p className="text-2xl mt-2">
            {users.length > 0 ? users[users.length - 1].submittedAt : "-"}
          </p>
        </div>
        <div className="bg-blue-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold">Exemplo de Estatística</h2>
          <p className="text-2xl mt-2">75% completaram o formulário</p>
        </div>
      </div>

      {/* Gráfico */}
      <div className="bg-blue-800 p-6 rounded-xl shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Submissões por Data</h2>
        <Chart users={users} />
      </div>

      {/* Lista de Usuários */}
      <div className="bg-blue-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Usuários que enviaram formulários</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {users.map(user => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
