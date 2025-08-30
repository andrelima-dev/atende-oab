import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function SectorAnalytics() {
  const allSectors = [
    { name: "Atendimento ao Público", rating: 4.5, total: 234, progress: 90 },
    { name: "Protocolo", rating: 4.2, total: 189, progress: 84 },
    { name: "Secretaria", rating: 3.8, total: 156, progress: 76 },
    { name: "Tesouraria", rating: 4.1, total: 143, progress: 82 },
    { name: "Biblioteca", rating: 4.3, total: 98, progress: 86 },
    { name: "Tecnologia da Informação", rating: 3.9, total: 87, progress: 78 },
    { name: "Recursos Humanos", rating: 4.0, total: 76, progress: 80 },
    { name: "Presidência", rating: 4.4, total: 264, progress: 88 },
  ]

  const sectorDetails = {
    esa: {
      name: "ESA - Escola Superior de Advocacia",
      rating: 4.6,
      total: 312,
      departments: [
        { name: "Coordenação Acadêmica", rating: 4.7, total: 89 },
        { name: "Secretaria ESA", rating: 4.5, total: 76 },
        { name: "Biblioteca Jurídica", rating: 4.6, total: 67 },
        { name: "Auditório", rating: 4.4, total: 80 },
      ],
    },
    ti: {
      name: "Tecnologia da Informação",
      rating: 3.9,
      total: 87,
      departments: [
        { name: "Suporte Técnico", rating: 4.1, total: 34 },
        { name: "Desenvolvimento", rating: 3.8, total: 28 },
        { name: "Infraestrutura", rating: 3.7, total: 25 },
      ],
    },
    ted: {
      name: "TED - Tribunal de Ética e Disciplina",
      rating: 4.3,
      total: 156,
      departments: [
        { name: "Secretaria TED", rating: 4.4, total: 67 },
        { name: "Protocolo TED", rating: 4.2, total: 45 },
        { name: "Arquivo", rating: 4.3, total: 44 },
      ],
    },
    financeiro: {
      name: "Financeiro",
      rating: 4.1,
      total: 198,
      departments: [
        { name: "Tesouraria", rating: 4.1, total: 89 },
        { name: "Contabilidade", rating: 4.0, total: 67 },
        { name: "Cobrança", rating: 4.2, total: 42 },
      ],
    },
  }

  const SectorOverview = ({ sectors }: { sectors: any[] }) => (
    <div className="space-y-4">
      {sectors.map((sector, index) => (
        <div key={index} className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">{sector.name}</span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">{sector.total} avaliações</span>
              <div className="flex items-center gap-1">
                <span className="text-sm font-semibold text-gray-900">{sector.rating}</span>
                <span className="text-yellow-500">★</span>
              </div>
            </div>
          </div>
          <Progress value={sector.progress} className="h-2" />
        </div>
      ))}
    </div>
  )

  const SectorDetail = ({ sector }: { sector: any }) => (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-gray-900">{sector.name}</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">{sector.total} avaliações</span>
            <div className="flex items-center gap-1">
              <span className="text-lg font-bold text-gray-900">{sector.rating}</span>
              <span className="text-yellow-500 text-lg">★</span>
            </div>
          </div>
        </div>
        <Progress value={(sector.rating / 5) * 100} className="h-3" />
      </div>

      <div className="space-y-3">
        <h4 className="font-medium text-gray-900">Departamentos</h4>
        {sector.departments.map((dept: any, index: number) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">{dept.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">{dept.total} avaliações</span>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-semibold text-gray-900">{dept.rating}</span>
                  <span className="text-yellow-500">★</span>
                </div>
              </div>
            </div>
            <Progress value={(dept.rating / 5) * 100} className="h-2" />
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Análise por Setores</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="geral" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="geral">Geral</TabsTrigger>
            <TabsTrigger value="esa">ESA</TabsTrigger>
            <TabsTrigger value="ti">T.I.</TabsTrigger>
            <TabsTrigger value="ted">TED</TabsTrigger>
            <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
          </TabsList>

          <TabsContent value="geral" className="mt-4">
            <SectorOverview sectors={allSectors} />
          </TabsContent>

          <TabsContent value="esa" className="mt-4">
            <SectorDetail sector={sectorDetails.esa} />
          </TabsContent>

          <TabsContent value="ti" className="mt-4">
            <SectorDetail sector={sectorDetails.ti} />
          </TabsContent>

          <TabsContent value="ted" className="mt-4">
            <SectorDetail sector={sectorDetails.ted} />
          </TabsContent>

          <TabsContent value="financeiro" className="mt-4">
            <SectorDetail sector={sectorDetails.financeiro} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
