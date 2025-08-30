
import express from 'express';
import type { Request, Response, NextFunction } from 'express';


import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
if (!supabaseUrl || !supabaseKey) { 
  throw new Error("Credenciais do Supabase não encontradas"); 
}
const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();
const JWT_SECRET = process.env.JWT_SECRET || 'sua-chave-secreta-muito-segura';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

app.use(cors());
app.use(express.json());

interface AuthenticatedRequest extends Request {
  user?: any;
}

const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.post('/api/admin/login', async (req: Request, res: Response) => {
  try {
    const { password } = req.body;
    
    if (password !== ADMIN_PASSWORD) {
      return res.status(401).json({ success: false, error: 'Senha incorreta' });
    }

    const token = jwt.sign(
      { role: 'admin', timestamp: Date.now() }, 
      JWT_SECRET, 
      { expiresIn: '8h' }
    );

    res.json({ success: true, token });
  } catch (error: any) {
    console.error("❌ Erro no login:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/avaliacoes', async (req: Request, res: Response) => {
  try {
    const { nome, oab, processo, setor, notas, comentario } = req.body;
    
    if (!nome || !oab || !processo || !setor || !notas) {
      return res.status(400).json({ 
        success: false, 
        error: 'Dados obrigatórios não fornecidos' 
      });
    }

    const novaAvaliacao = {
      nome_advogado: nome,
      numero_ordem: oab,
      processo: processo,
      setor: setor,
      nota_atendimento: notas.suporte_tecnico || notas.atendimento,
      nota_clareza: notas.clareza_resolucao || notas.clareza,
      nota_agilidade: notas.agilidade_atendimento || notas.agilidade,
      nota_cordialidade: notas.cordialidade,
      nota_eficiencia: notas.eficiencia,
      comentario: comentario || '',
      created_at: new Date().toISOString(), // Garante que a data de criação seja adicionada
    };

    const { data, error } = await supabase
      .from('avaliacoes_oab')
      .insert([novaAvaliacao])
      .select();

    if (error) throw error;

    console.log('✅ Avaliação salva:', data);
    res.status(201).json({ success: true, data: data });
  } catch (error: any) {
    console.error("❌ Erro ao salvar avaliação:", error);
    res.status(400).json({ success: false, error: error.message });
  }
});

app.get('/api/avaliacoes', authenticateToken, async (req: Request, res: Response) => {
    try {
      const { data, error } = await supabase
        .from('avaliacoes_oab')
        .select('*')
        .order('created_at', { ascending: false });
  
      if (error) throw error;
      
      res.status(200).json({ success: true, data: data });
    } catch (error: any) {
      console.error("❌ Erro ao buscar avaliações:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Servidor backend rodando na porta ${PORT}`);
});

