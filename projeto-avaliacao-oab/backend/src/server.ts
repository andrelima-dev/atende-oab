import 'dotenv/config'; // GARANTE QUE O .ENV SEJA LIDO PRIMEIRO DE TUDO
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
// ==================================================================
// CORREÇÃO: Adicionando a extensão '.js' ao final da importação local
import { supabase } from './supabaseClient.js';
// ==================================================================

const app = express();
app.use(cors());
app.use(express.json());

// --- ROTA DE LOGIN ---
// É aqui que a mágica acontece
app.post('/login', (req, res) => {
  // Pega a senha que o frontend enviou
  const { password } = req.body;
  
  // Pega a senha correta do seu arquivo .env
  const correctPassword = process.env.DASHBOARD_PASSWORD;

  // DEBUG: VAMOS MOSTRAR NO TERMINAL O QUE ESTÁ ACONTECENDO
  console.log('--- Tentativa de Login ---');
  console.log('Senha recebida do frontend:', password);
  console.log('Senha correta (do .env):', correctPassword);

  // Verifica se a senha do .env foi carregada
  if (!correctPassword) {
    console.error('ERRO GRAVE: A variável DASHBOARD_PASSWORD não foi encontrada no arquivo .env!');
    return res.status(500).json({ message: 'Erro de configuração no servidor.' });
  }

  // Compara a senha recebida com a senha correta
  if (password === correctPassword) {
    console.log('Resultado: SUCESSO. Senha correta.');
    // Se a senha estiver correta, cria um "token" de acesso
    const token = jwt.sign({ user: 'admin' }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    res.json({ token });
  } else {
    console.log('Resultado: FALHA. Senha incorreta.');
    // Se a senha estiver errada, envia um erro
    res.status(401).json({ message: 'Senha incorreta' });
  }
});


// --- OUTRAS ROTAS DO SEU BACKEND ---

// Rota para buscar todas as avaliações
app.get('/avaliacoes', async (req, res) => {
    // Aqui deveria ter a verificação do token (middleware), mas vamos simplificar por agora
    const { data, error } = await supabase.from('avaliacoes').select('*');
    if (error) {
        return res.status(500).json({ error: error.message });
    }
    res.json(data);
});

// Rota para salvar uma nova avaliação (pública)
app.post('/avaliacoes', async (req, res) => {
    const { nome, email, setor, nota, comentario } = req.body;
    const { data, error } = await supabase
        .from('avaliacoes')
        .insert([{ nome, email, setor, nota, comentario }]);

    if (error) {
        return res.status(500).json({ error: error.message });
    }
    res.status(201).json(data);
});


// --- INICIANDO O SERVIDOR ---
const PORT = process.env.PORT || 3334; // Use a porta 3334 ou outra que esteja livre
app.listen(PORT, () => {
  console.log(`Servidor do backend rodando na porta ${PORT}`);
});
