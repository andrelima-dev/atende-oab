// backend/src/server.ts
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';


dotenv.config();


const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("ERRO CRÍTICO: Credenciais do Supabase não encontradas no arquivo .env");
}
const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();
const port = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());


app.post('/api/login', (req, res) => {
  const { password } = req.body;

  
  console.log("===================================");
  console.log("🕵️ TENTATIVA DE LOGIN RECEBIDA 🕵️");
  console.log("Senha recebida do frontend:", password);
  console.log("Senha esperada do .env:", process.env.DASHBOARD_PASSWORD);
  console.log("As senhas são iguais?", password === process.env.DASHBOARD_PASSWORD);
  console.log("===================================");

  if (password === process.env.DASHBOARD_PASSWORD) {
  
    const token = jwt.sign({ user: 'admin' }, process.env.JWT_SECRET!, { expiresIn: '8h' });
    res.json({ success: true, token: token });
  } else {
    // Senha incorreta
    res.status(401).json({ success: false, message: "Senha inválida" });
  }
});


const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Formato: "Bearer TOKEN"

  if (token == null) return res.sendStatus(401); // Se não enviou token, barra a entrada

  jwt.verify(token, process.env.JWT_SECRET!, (err: any, user: any) => {
    if (err) return res.sendStatus(403); // Se o token for inválido, barra a entrada
    next(); // Se o token for válido, deixa passar
  });
};

// --- ROTA PARA SALVAR AVALIAÇÃO (PÚBLICA) ---
app.post('/api/avaliacoes', async (req, res) => {
  const { processo, notas, comentario } = req.body;
  const novaAvaliacao = {
    processo: processo,
    nota_atendimento: notas.suporte_tecnico,
    nota_clareza: notas.clareza_resolucao,
    nota_agilidade: notas.agilidade_atendimento,
    comentario: comentario,
    setor: 'Informática'
  };
  
  const { data, error } = await supabase.from('avaliacoes').insert([novaAvaliacao]).select();
  if (error) {
    console.error("❌ Erro ao salvar no Supabase:", error);
    return res.status(500).json({ success: false, message: "Erro ao salvar no banco de dados." });
  }
  res.status(201).json({ success: true, message: "Avaliação salva com sucesso!", data: data });
});

// --- ROTA PARA BUSCAR AVALIAÇÕES (PROTEGIDA) ---
app.get('/api/avaliacoes', authenticateToken, async (req, res) => {
  const { data, error } = await supabase.from('avaliacoes').select('*').order('created_at', { ascending: false });
  if (error) {
    console.error("❌ Erro ao buscar avaliações:", error);
    return res.status(500).json({ success: false, message: "Erro ao buscar dados." });
  }
  res.status(200).json({ success: true, data: data });
});


// --- INICIALIZAÇÃO DO SERVIDOR ---
app.listen(port, () => {
  console.log(`🚀 Servidor backend rodando em http://localhost:${port}`);
});