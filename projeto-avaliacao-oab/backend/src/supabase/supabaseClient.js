// src/supabase/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl) throw new Error('VITE_SUPABASE_URL não está definida')
if (!supabaseAnonKey) throw new Error('VITE_SUPABASE_ANON_KEY não está definida')

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const handleSupabaseError = (error) => {
  if (error) throw new Error(error.message)
}

export const fetchUsersWithOAB = async () => {
  const { data, error } = await supabase
    .from('AvaliaOAB')
    .select('*')
    .order('name')
  
  handleSupabaseError(error)
  return data
}