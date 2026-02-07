import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Award, TrendingUp, Users, Star } from 'lucide-react';
import { calculateSectorStats } from '../../lib/exportUtils';

interface Avaliacao {
  id: string;
  nome_advogado: string;
  numero_ordem: string;
  processo: string;
  setor: string;
  nota_atendimento: number;
  nota_qualidade: number;
  nota_pontualidade: number;
  nota_comunicacao: number;
  nota_resultado: number;
  comentario: string;
  createdAt: string;
}

interface SectorAnalysisProps {
  avaliacoes: Avaliacao[];
}

export const SectorAnalysis: React.FC<SectorAnalysisProps> = ({ avaliacoes }) => {
  const sectorStats = calculateSectorStats(avaliacoes);

  const getRatingColor = (media: number) => {
    if (media >= 4.5) return 'bg-emerald-50 dark:bg-emerald-900/20';
    if (media >= 3.5) return 'bg-blue-50 dark:bg-blue-900/20';
    if (media >= 2.5) return 'bg-yellow-50 dark:bg-yellow-900/20';
    return 'bg-red-50 dark:bg-red-900/20';
  };

  const getRatingBadge = (media: number) => {
    if (media >= 4.5) return { color: 'bg-emerald-500', label: '⭐ Excelente' };
    if (media >= 3.5) return { color: 'bg-blue-500', label: '👍 Bom' };
    if (media >= 2.5) return { color: 'bg-yellow-500', label: '⚠️ Médio' };
    return { color: 'bg-red-500', label: '❌ Baixo' };
  };

  const getMediaColor = (media: number) => {
    if (media >= 4.5) return 'text-emerald-700 dark:text-emerald-400';
    if (media >= 3.5) return 'text-blue-700 dark:text-blue-400';
    if (media >= 2.5) return 'text-yellow-700 dark:text-yellow-400';
    return 'text-red-700 dark:text-red-400';
  };

  return (
    <div className="space-y-6">
      {/* Resumo Geral */}
      <Card className="border-0 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 dark:from-slate-800 dark:via-indigo-900/20 dark:to-purple-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-800 dark:text-slate-100">
            <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            Análise de Setores
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-indigo-200 dark:border-indigo-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Total de Setores</p>
                <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{sectorStats.length}</p>
              </div>
              <Users className="w-8 h-8 text-indigo-600 dark:text-indigo-400 opacity-50" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Total de Avaliações</p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{avaliacoes.length}</p>
              </div>
              <Star className="w-8 h-8 text-blue-600 dark:text-blue-400 opacity-50" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-purple-200 dark:border-purple-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Média Geral</p>
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {avaliacoes.length > 0
                    ? (
                        avaliacoes.reduce(
                          (sum, av) =>
                            sum +
                            (av.nota_atendimento +
                              av.nota_qualidade +
                              av.nota_pontualidade +
                              av.nota_comunicacao +
                              av.nota_resultado) /
                              5,
                          0
                        ) / avaliacoes.length
                      ).toFixed(2)
                    : '0.00'}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600 dark:text-purple-400 opacity-50" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ranking de Setores */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-slate-800 dark:text-slate-100">Ranking de Setores por Avaliação</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sectorStats.map((stat: any, index: number) => {
              const badge = getRatingBadge(stat.mediaGeral);
              const bgColor = getRatingColor(stat.mediaGeral);
              const textColor = getMediaColor(stat.mediaGeral);
              
              return (
                <div
                  key={stat.setor}
                  className={`${bgColor} rounded-lg p-4 border border-slate-200 dark:border-slate-600 transition-all hover:shadow-md`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 font-bold text-sm text-slate-700 dark:text-slate-300">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800 dark:text-slate-100">{stat.setor}</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {stat.totalAvaliacoes} avaliação{stat.totalAvaliacoes > 1 ? 'ões' : ''}
                        </p>
                      </div>
                    </div>
                    <Badge className={`${badge.color} text-white font-semibold px-3 py-1`}>
                      {badge.label}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="bg-white dark:bg-slate-800/50 rounded p-2">
                      <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Média Geral</p>
                      <p className={`text-lg font-bold ${textColor}`}>{stat.mediaGeral.toFixed(2)}</p>
                    </div>
                    <div className="bg-white dark:bg-slate-800/50 rounded p-2">
                      <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Atendimento</p>
                      <p className="text-lg font-bold text-slate-700 dark:text-slate-300">{stat.mediaAtendimento.toFixed(2)}</p>
                    </div>
                    <div className="bg-white dark:bg-slate-800/50 rounded p-2">
                      <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Qualidade</p>
                      <p className="text-lg font-bold text-slate-700 dark:text-slate-300">{stat.mediaQualidade.toFixed(2)}</p>
                    </div>
                    <div className="bg-white dark:bg-slate-800/50 rounded p-2">
                      <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Pontualidade</p>
                      <p className="text-lg font-bold text-slate-700 dark:text-slate-300">{stat.mediaPontualidade.toFixed(2)}</p>
                    </div>
                    <div className="bg-white dark:bg-slate-800/50 rounded p-2">
                      <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Comunicação</p>
                      <p className="text-lg font-bold text-slate-700 dark:text-slate-300">{stat.mediaComunicacao.toFixed(2)}</p>
                    </div>
                    <div className="bg-white dark:bg-slate-800/50 rounded p-2">
                      <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Resultado</p>
                      <p className="text-lg font-bold text-slate-700 dark:text-slate-300">{stat.mediaResultado.toFixed(2)}</p>
                    </div>
                  </div>

                  {/* Barra de progresso visual */}
                  <div className="mt-3 h-2 bg-slate-300 dark:bg-slate-600 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        stat.mediaGeral >= 4.5
                          ? 'bg-emerald-500'
                          : stat.mediaGeral >= 3.5
                          ? 'bg-blue-500'
                          : stat.mediaGeral >= 2.5
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${(stat.mediaGeral / 5) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Gráfico Comparativo */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-slate-800 dark:text-slate-100">Comparativo de Critérios por Setor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-600">
                  <th className="text-left py-3 px-2 text-slate-700 dark:text-slate-300 font-semibold">Setor</th>
                  <th className="text-center py-3 px-2 text-slate-700 dark:text-slate-300 font-semibold">Qtd</th>
                  <th className="text-center py-3 px-2 text-slate-700 dark:text-slate-300 font-semibold">Média</th>
                  <th className="text-center py-3 px-2 text-slate-700 dark:text-slate-300 font-semibold">Atend.</th>
                  <th className="text-center py-3 px-2 text-slate-700 dark:text-slate-300 font-semibold">Qualid.</th>
                  <th className="text-center py-3 px-2 text-slate-700 dark:text-slate-300 font-semibold">Pontual.</th>
                  <th className="text-center py-3 px-2 text-slate-700 dark:text-slate-300 font-semibold">Comunic.</th>
                  <th className="text-center py-3 px-2 text-slate-700 dark:text-slate-300 font-semibold">Result.</th>
                </tr>
              </thead>
              <tbody>
                {sectorStats.map((stat: any) => {
                  const textColor = getMediaColor(stat.mediaGeral);
                  return (
                    <tr key={stat.setor} className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="py-3 px-2 font-medium text-slate-700 dark:text-slate-300">{stat.setor}</td>
                      <td className="text-center py-3 px-2 text-slate-600 dark:text-slate-400">{stat.totalAvaliacoes}</td>
                      <td className={`text-center py-3 px-2 font-bold ${textColor}`}>{stat.mediaGeral.toFixed(2)}</td>
                      <td className="text-center py-3 px-2 text-slate-600 dark:text-slate-400">{stat.mediaAtendimento.toFixed(2)}</td>
                      <td className="text-center py-3 px-2 text-slate-600 dark:text-slate-400">{stat.mediaQualidade.toFixed(2)}</td>
                      <td className="text-center py-3 px-2 text-slate-600 dark:text-slate-400">{stat.mediaPontualidade.toFixed(2)}</td>
                      <td className="text-center py-3 px-2 text-slate-600 dark:text-slate-400">{stat.mediaComunicacao.toFixed(2)}</td>
                      <td className="text-center py-3 px-2 text-slate-600 dark:text-slate-400">{stat.mediaResultado.toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
