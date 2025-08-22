import { useState, useEffect } from 'react';


import Card from './components/Card'; 
import AvaliacoesChart from './components/charts/AvaliacoesChart';

import './App.css';


interface User {
  id: number;
  name: string;
  email: string;
  submittedAt: string;
}

// Interface para definir o formato dos dados que o gráfico espera
interface ChartData {
  avaliacoes: User[];
}

function App() {
  const [users, setUsers] = useState<User[]>([]);

  // Simula a busca de dados quando o componente é montado
  useEffect(() => {
    const fetchUsers = () => {
      // Usando dados de exemplo (mock)
      const mockUsers: User[] = [
        { id: 1, name: 'André Hunter', email: 'andre@example.com', submittedAt: '2025-08-22' },
        { id: 2, name: 'Maria Silva', email: 'maria@example.com', submittedAt: '2025-08-21' },
        { id: 3, name: 'João Souza', email: 'joao@example.com', submittedAt: '2025-08-20' },
      ];
      setUsers(mockUsers);
    };

    fetchUsers();
  }, []); 

  
  const chartData: ChartData = {
    avaliacoes: users
  };
  // ==================================================================

  return (
    <div className="App">
      <header>
        <h1>Dashboard de Avaliações</h1>
      </header>

      <main>
        <section>
          <h2>Gráfico de Respostas</h2>
          {/* Passando os dados formatados corretamente para o gráfico */}
          <AvaliacoesChart data={chartData} />
        </section>

        <section>
          <h2>Usuários Recentes</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            {/* O erro "Não é possível localizar o módulo './components/Card'"
              provavelmente vem de um erro de exportação DENTRO do arquivo Card.tsx.
            */}
            {users.map(user => (
              <Card
                key={user.id}
                // Lembre-se de passar as props que seu componente Card precisa.
                // Exemplo: user={user}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;