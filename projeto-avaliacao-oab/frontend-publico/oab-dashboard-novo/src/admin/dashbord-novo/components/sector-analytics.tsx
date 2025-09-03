import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

type SectorAnalyticsProps = {
  avaliacoes: any[];
};

export function SectorAnalytics({ avaliacoes }: SectorAnalyticsProps) {
  const processSectorData = () => {
    if (!avaliacoes || avaliacoes.length === 0) return [];
    
    const sectorsMap = new Map();

    avaliacoes.forEach(avaliacao => {
      const { setor, nota_atendimento } = avaliacao;
      if (!setor) return;

      if (!sectorsMap.has(setor)) {
        sectorsMap.set(setor, { total: 0, sumRatings: 0, name: setor });
      }
      const current = sectorsMap.get(setor);
      current.total += 1;
      current.sumRatings += nota_atendimento || 0;
    });

    const allSectors = Array.from(sectorsMap.values()).map(sector => {
      const rating = sector.total > 0 ? (sector.sumRatings / sector.total).toFixed(1) : "0.0";
      return {
        name: sector.name,
        rating: parseFloat(rating),
        total: sector.total,
        progress: (parseFloat(rating) / 5) * 100
      };
    });

    return allSectors.sort((a, b) => b.total - a.total);
  };

  const allSectors = processSectorData();

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Análise por Setores</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {allSectors.map((sector, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">{sector.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">{sector.total} avaliações</span>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-semibold text-gray-900">{sector.rating.toFixed(1)}</span>
                    <span className="text-yellow-500">★</span>
                  </div>
                </div>
              </div>
              <Progress value={sector.progress} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}