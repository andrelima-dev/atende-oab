export interface Evaluation {
  id: string;
  sector: string;
  rating: number;
  date: string;
  comment?: string;
}

export interface SectorData {
  name: string;
  average: number;
  evaluations: number;
  color: string;
}

export const mockEvaluations: Evaluation[] = [
  {
    id: "1",
    sector: "Financeiro/Tesouraria",
    rating: 4.8,
    date: "2024-01-15",
    comment: "Excelente atendimento e agilidade nos processos financeiros."
  },
  {
    id: "2",
    sector: "Tecnologia da Informação",
    rating: 4.5,
    date: "2024-01-14",
    comment: "Sistema funcionando bem, suporte técnico eficiente."
  },
  {
    id: "3",
    sector: "TED",
    rating: 4.2,
    date: "2024-01-13",
    comment: "Documentos entregues no prazo, processo bem organizado."
  },
  {
    id: "4",
    sector: "ESA/MA",
    rating: 4.7,
    date: "2024-01-12",
    comment: "Cursos de qualidade e instrutores bem preparados."
  },
  {
    id: "5",
    sector: "Financeiro/Tesouraria",
    rating: 4.3,
    date: "2024-01-11",
    comment: "Processo de pagamento simplificado e rápido."
  },
  {
    id: "6",
    sector: "Tecnologia da Informação",
    rating: 4.1,
    date: "2024-01-10",
    comment: "Boa manutenção dos sistemas, algumas melhorias podem ser feitas."
  },
];

export const mockSectorData: SectorData[] = [
  {
    name: "Financeiro/Tesouraria",
    average: 4.6,
    evaluations: 124,
    color: "hsl(var(--oab-dark-blue))"
  },
  {
    name: "TI",
    average: 4.3,
    evaluations: 89,
    color: "hsl(var(--oab-light-blue))"
  },
  {
    name: "TED",
    average: 4.2,
    evaluations: 156,
    color: "hsl(213, 42%, 63%)"
  },
  {
    name: "ESA/MA",
    average: 4.7,
    evaluations: 98,
    color: "hsl(213, 42%, 73%)"
  },
];

export const calculateOverallAverage = (sectorData: SectorData[]): number => {
  const totalRating = sectorData.reduce((sum, sector) => sum + (sector.average * sector.evaluations), 0);
  const totalEvaluations = sectorData.reduce((sum, sector) => sum + sector.evaluations, 0);
  return totalRating / totalEvaluations;
};

export const getTotalEvaluations = (sectorData: SectorData[]): number => {
  return sectorData.reduce((sum, sector) => sum + sector.evaluations, 0);
};