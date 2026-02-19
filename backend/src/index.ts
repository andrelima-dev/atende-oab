import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import avaliacoesRoutes from './routes/avaliacoes';
import authRoutes from './routes/auth';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares - CORS com suporte a múltiplas portas em desenvolvimento
const corsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    // Em desenvolvimento, aceitar localhost em qualquer porta
    if (!origin || origin.includes('localhost') || origin.includes('127.0.0.1')) {
      callback(null, true);
    } else if (origin === process.env.FRONTEND_URL) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'API Atende OAB está funcionando!' });
});

app.use('/api/auth', authRoutes);
app.use('/api/avaliacoes', avaliacoesRoutes);

// Middleware de erro (deve ser o último)
app.use(errorHandler);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📊 API Avaliações: http://localhost:${PORT}/api/avaliacoes`);
});
