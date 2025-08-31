
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl) throw new Error('SUPABASE_URL não está definida no arquivo .env do backend');
if (!supabaseServiceKey) throw new Error('SUPABASE_SERVICE_KEY não está definida no arquivo .env do backend');

export const supabase = createClient(supabaseUrl, supabaseServiceKey);


export const handleSupabaseError = (error) => {
  if (error) {
    console.error('Erro no Supabase:', error.message);
    throw new Error(error.message);
  }
};

export const fetchTodasAvaliacoes = async () => {
  const { data, error } = await supabase
    .from('avaliacoes_oab')
    .select('*')
    .order('created_at', { ascending: false });
  
  handleSupabaseError(error);
  return data;
};