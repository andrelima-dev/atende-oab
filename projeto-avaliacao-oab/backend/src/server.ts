// backend/src/server.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

// ... (código de inicialização do Supabase continua o mesmo)
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
if (!supabaseUrl || !supabaseKey) { throw new Error("Credenciais do Supabase não encontradas"); }
const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();
app.use(cors());
app.use(express.json());

// ROTA PARA SALVAR AVALIAÇÕES
app.post('/api/avaliacoes', async (req, res) => {
  try {
    const { nome, oab, processo, setor, notas, comentario } = req.body;
    const novaAvaliacao = {
      nome_advogado: nome,
      numero_ordem: oab,
      processo: processo,
      setor: setor,
      nota_atendimento: notas.suporte_tecnico,
      nota_clareza: notas.clareza_resolucao,
      nota_agilidade: notas.agilidade_atendimento,
      nota_cordialidade: notas.cordialidade,
      nota_eficiencia: notas.eficiencia,
      comentario: comentario,
    };

    const { data, error } = await supabase.from('avaliacoes_oab').insert([novaAvaliacao]).select();
    if (error) throw error;
    res.status(201).json({ success: true, data: data });
  } catch (error: any) {
    console.error("❌ Erro ao salvar avaliação:", error);
    res.status(400).json({ success: false, error: error.message });
  }
});

// ... (outras rotas como /api/health, /api/admin/login e GET /api/avaliacoes podem continuar aqui)

app.listen(process.env.PORT || 3001, () => {
  console.log(`🚀 Servidor backend rodando na porta ${process.env.PORT || 3001}`);
});