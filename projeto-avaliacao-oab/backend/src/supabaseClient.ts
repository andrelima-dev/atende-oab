import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY; // Corrigido

if (!supabaseUrl || !supabaseKey) {
  throw new Error("ERRO: As variáveis SUPABASE_URL e SUPABASE_SERVICE_KEY não foram encontradas no arquivo .env");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
