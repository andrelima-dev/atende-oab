// backend/src/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

// Pega as variáveis de ambiente que o server.ts já carregou
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

// Faz uma verificação para garantir que as chaves existem
if (!supabaseUrl || !supabaseKey) {
  throw new Error("ERRO CRÍTICO: Credenciais do Supabase não encontradas. Verifique o arquivo .env do backend.");
}

// Cria o cliente Supabase usando a chave de SERVIÇO (secreta)
// e o exporta para ser usado em outras partes do nosso backend.
export const supabase = createClient(supabaseUrl, supabaseKey);