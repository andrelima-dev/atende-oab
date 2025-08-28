// frontend-admin/src/components/AdvancedCharts.tsx
import { 
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area, ScatterChart, Scatter, FunnelChart, Funnel, LabelList
} from 'recharts';

// Tipo para dados de tendência
type TrendData = {
  periodo: string;
  avaliacoes: number;
  media: number;
  crescimento: number;
};

// Tipo para dados de funil de satisfação
type FunnelData = {
  name: string;
  value: number;
  fill: string;
};

// Gráfico de Tendência Combinado
export const TrendChart = ({ data }: { data: TrendData[] }) => (
  <ResponsiveContainer width="100%" height={350}>
    <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
      <XAxis dataKey="periodo" stroke="#a0bfe0" />
      <YAxis yAxisId="left" stroke="#a0bfe0" />
      <YAxis yAxisId="right" orientation="right" stroke="#10b981" />
      <Tooltip
        contentStyle={{
          backgroundColor: '#1E293B',
          border: '1px solid #334155',
          borderRadius: '12px',
          color: '#e0e0e0'
        }}
      />
      <Legend />
      <Bar yAxisId="left" dataKey="avaliacoes" fill="#3B82F6" name="Volume" radius={[4, 4, 0, 0]} />
      <Line 
        yAxisId="right" 
        type="monotone" 
        dataKey="media" 
        stroke="#10B981" 
        strokeWidth={3}
        dot={{ fill: '#10B981', strokeWidth: 2, r: 5 }}
        name="Média"
      />
      <Line 
        yAxisId="right" 
        type="monotone" 
        dataKey="crescimento" 
        stroke="#F59E0B" 
        strokeWidth={2}
        strokeDasharray="5 5"
        dot={{ fill: '#F59E0B', strokeWidth: 2, r: 3 }}
        name="Crescimento %"
      />
    </ComposedChart>
  </ResponsiveContainer>
);

// Gráfico de Área - Evolução de Satisfação
export const SatisfactionAreaChart = ({ data }: { data: any[] }) => (
  <ResponsiveContainer width="100%" height={300}>
    <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
      <defs>
        <linearGradient id="satisfacaoGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
          <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
      <XAxis dataKey="name" stroke="#a0bfe0" />
      <YAxis domain={[0, 5]} stroke="#a0bfe0" />
      <Tooltip
        contentStyle={{
          backgroundColor: '#1E293B',
          border: '1px solid #334155',
          borderRadius: '12px',
          color: '#e0e0e0'
        }}
      />
      <Area
        type="monotone"
        dataKey="media"
        stroke="#10B981"
        strokeWidth={2}
        fillOpacity={1}
        fill="url(#satisfacaoGradient)"
      />
    </AreaChart>
  </ResponsiveContainer>
);

// Gráfico de Dispersão - Relação Volume x Qualidade
export const VolumeQualityScatter = ({ data }: { data: any[] }) => (
  <ResponsiveContainer width="100%" height={300}>
    <ScatterChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
      <XAxis 
        type="number" 
        dataKey="total" 
        name="Volume" 
        stroke="#a0bfe0"
        label={{ value: 'Volume de Avaliações', position: 'insideBottom', offset: -10 }}
      />
      <YAxis 
        type="number" 
        dataKey="media" 
        name="Média" 
        stroke="#a0bfe0"
        domain={[0, 5]}
        label={{ value: 'Média de Satisfação', angle: -90, position: 'insideLeft' }}
      />
      <Tooltip 
        cursor={{ strokeDasharray: '3 3' }}
        contentStyle={{
          backgroundColor: '#1E293B',
          border: '1px solid #334155',
          borderRadius: '12px',
          color: '#e0e0e0'
        }}
        formatter={(value: any, name: string) => [
          typeof value === 'number' ? value.toFixed(2) : value,
          name === 'total' ? 'Volume' : 'Média'
        ]}
        labelFormatter={(label) => `Setor: ${label}`}
      />
      <Scatter name="Setores" dataKey="media" fill="#3B82F6">
        {data.map((entry, index) => (
          <Scatter key={`cell-${index}`} fill={
            entry.media >= 4.5 ? '#10B981' :
            entry.media >= 4.0 ? '#3B82F6' :
            entry.media >= 3.0 ? '#F59E0B' : '#EF4444'
          } />
        ))}
      </Scatter>
    </ScatterChart>
  </ResponsiveContainer>
);

// Funil de Satisfação
export const SatisfactionFunnel = ({ data }: { data: FunnelData[] }) => (
  <ResponsiveContainer width="100%" height={300}>
    <FunnelChart>
      <Tooltip
        contentStyle={{
          backgroundColor: '#1E293B',
          border: '1px solid #334155',
          borderRadius: '12px',
          color: '#e0e0e0'
        }}
      />
      <Funnel
        dataKey="value"
        data={data}
        isAnimationActive
      >
        <LabelList position="center" fill="#fff" stroke="none" />
      </Funnel>
    </FunnelChart>
  </ResponsiveContainer>
);

// Hook personalizado para calcular dados de tendência
export const useTrendData = (avaliacoes: any[]) => {
  const last12Months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (11 - i));
    return {
      mes: date.getMonth(),
      ano: date.getFullYear(),
      nome: date.toLocaleDateString('pt-BR', { month: 'short' })
    };
  });

  return last12Months.map((periodo, index) => {
    const avaliacoesPeriodo = avaliacoes.filter(aval => {
      const dataAval = new Date(aval.data_criacao);
      return dataAval.getMonth() === periodo.mes && dataAval.getFullYear() === periodo.ano;
    });

    const total = avaliacoesPeriodo.length;
    const media = total > 0 ? 
      avaliacoesPeriodo.reduce((acc, aval) => 
        acc + (aval.nota_atendimento + aval.nota_clareza + aval.nota_agilidade + 
               aval.nota_cordialidade + aval.nota_eficiencia) / 5, 0
      ) / total : 0;

    // Calcular crescimento em relação ao período anterior
    const periodoAnterior = index > 0 ? 
      last12Months.slice(0, index).find(p => {
        const avalsPrevias = avaliacoes.filter(aval => {
          const dataAval = new Date(aval.data_criacao);
          return dataAval.getMonth() === p.mes && dataAval.getFullYear() === p.ano;
        });
        return avalsPrevias.length > 0;
      }) : null;

    let crescimento = 0;
    if (periodoAnterior) {
      const totalAnterior = avaliacoes.filter(aval => {
        const dataAval = new Date(aval.data_criacao);
        return dataAval.getMonth() === periodoAnterior.mes && 
               dataAval.getFullYear() === periodoAnterior.ano;
      }).length;
      
      crescimento = totalAnterior > 0 ? ((total - totalAnterior) / totalAnterior) * 100 : 0;
    }

    return {
      periodo: periodo.nome,
      avaliacoes: total,
      media: Number(media.toFixed(1)),
      crescimento: Number(crescimento.toFixed(1))
    };
  });
};

// Hook para dados do funil de satisfação
export const useFunnelData = (avaliacoes: any[]): FunnelData[] => {
  if (avaliacoes.length === 0) return [];

  const ranges = [
    { name: 'Excelente (4.5-5.0)', min: 4.5, max: 5, fill: '#10B981' },
    { name: 'Muito Bom (4.0-4.4)', min: 4.0, max: 4.4, fill: '#3B82F6' },
    { name: 'Bom (3.5-3.9)', min: 3.5, max: 3.9, fill: '#6366F1' },
    { name: 'Regular (3.0-3.4)', min: 3.0, max: 3.4, fill: '#F59E0B' },
    { name: 'Baixo (<3.0)', min: 0, max: 2.9, fill: '#EF4444' }
  ];

  return ranges.map(range => {
    const count = avaliacoes.filter(aval => {
      const media = (aval.nota_atendimento + aval.nota_clareza + aval.nota_agilidade + 
                    aval.nota_cordialidade + aval.nota_eficiencia) / 5;
      return media >= range.min && media <= range.max;
    }).length;

    return {
      name: range.name,
      value: count,
      fill: range.fill
    };
  }).filter(item => item.value > 0);
};

// Componente de Métricas Avançadas
export const AdvancedMetrics = ({ avaliacoes }: { avaliacoes: any[] }) => {
  if (avaliacoes.length === 0) return null;

  // Calcular NPS (Net Promoter Score) simulado
  const nps = avaliacoes.reduce((acc, aval) => {
    const media = (aval.nota_atendimento + aval.nota_clareza + aval.nota_agilidade + 
                  aval.nota_cordialidade + aval.nota_eficiencia) / 5;
    if (media >= 4.5) return acc + 1; // Promotores
    if (media <= 3.0) return acc - 1; // Detratores
    return acc; // Neutros
  }, 0);

  const npsScore = Math.round((nps / avaliacoes.length) * 100);

  // Calcular tempo médio de resposta (simulado)
  const tempoMedioResposta = Math.round(Math.random() * 24 + 1); // 1-24 horas

  // Taxa de resolução no primeiro contato (simulada)
  const taxaResolucao = Math.round(Math.random() * 20 + 75); // 75-95%

  return (
    <div className="advanced-metrics">
      <div className="metric-item">
        <div className="metric-label">NPS Score</div>
        <div className={`metric-value ${npsScore >= 50 ? 'positive' : npsScore >= 0 ? 'neutral' : 'negative'}`}>
          {npsScore}
        </div>
      </div>
      <div className="metric-item">
        <div className="metric-label">Tempo Médio de Resposta</div>
        <div className="metric-value">{tempoMedioResposta}h</div>
      </div>
      <div className="metric-item">
        <div className="metric-label">Taxa de Resolução</div>
        <div className="metric-value">{taxaResolucao}%</div>
      </div>
    </div>
  );
};