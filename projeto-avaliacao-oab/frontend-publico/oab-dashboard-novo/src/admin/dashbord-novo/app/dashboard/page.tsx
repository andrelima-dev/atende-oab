import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";




type Avaliacao = {
  id: number;
  nome_advogado: string;
  setor: string;
  nota_atendimento: number;
  nota_clareza: number;
  nota_agilidade: number;
  nota_cordialidade: number;
  nota_eficiencia: number;
  data_criacao: string;
};

export default function DashboardNovo() {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("avaliacoes_oab")
        .select("*")
        .order("data_criacao", { ascending: false });

      if (error) console.error("Erro ao buscar dados:", error);
      else setAvaliacoes(data || []);
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Avaliações Recentes</h1>
      <ul>
        {avaliacoes.map((av) => (
          <li key={av.id} className="p-3 border-b">
            {av.nome_advogado} - {av.setor} - Nota Atendimento: {av.nota_atendimento}
          </li>
        ))}
      </ul>
    </div>
  );
}
