// src/App.jsx
import { useEffect, useState } from 'react'
import { fetchUsersWithOAB } from './supabase/supabaseClient'
import './App.css'

function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  const loadUsers = async () => {
    try {
      const data = await fetchUsersWithOAB()
      setUsers(data)
    } catch (error) {
      console.error('Erro:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  if (loading) return <div>Carregando usuários...</div>

  return (
    <div className="App">
      <h1>Lista de Usuários</h1>
      <div>
        {users.map(user => (
          <div key={user.id}>
            <p><strong>{user.name}</strong> - OAB: {user.oab_number}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App