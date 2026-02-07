import jsPDF from 'jspdf';

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

interface SectorStats {
  setor: string;
  totalAvaliacoes: number;
  mediaGeral: number;
  mediaAtendimento: number;
  mediaQualidade: number;
  mediaPontualidade: number;
  mediaComunicacao: number;
  mediaResultado: number;
}

export const calculateSectorStats = (avaliacoes: Avaliacao[]): SectorStats[] => {
  const sectorGroups: { [key: string]: Avaliacao[] } = {};

  // Agrupar por setor
  avaliacoes.forEach(av => {
    if (!sectorGroups[av.setor]) {
      sectorGroups[av.setor] = [];
    }
    sectorGroups[av.setor].push(av);
  });

  // Calcular estatísticas por setor
  return Object.entries(sectorGroups).map(([setor, avaliacoesPorSetor]) => {
    const totalAvaliacoes = avaliacoesPorSetor.length;
    const mediaAtendimento = avaliacoesPorSetor.reduce((sum, av) => sum + av.nota_atendimento, 0) / totalAvaliacoes;
    const mediaQualidade = avaliacoesPorSetor.reduce((sum, av) => sum + av.nota_qualidade, 0) / totalAvaliacoes;
    const mediaPontualidade = avaliacoesPorSetor.reduce((sum, av) => sum + av.nota_pontualidade, 0) / totalAvaliacoes;
    const mediaComunicacao = avaliacoesPorSetor.reduce((sum, av) => sum + av.nota_comunicacao, 0) / totalAvaliacoes;
    const mediaResultado = avaliacoesPorSetor.reduce((sum, av) => sum + av.nota_resultado, 0) / totalAvaliacoes;
    const mediaGeral = (mediaAtendimento + mediaQualidade + mediaPontualidade + mediaComunicacao + mediaResultado) / 5;

    return {
      setor,
      totalAvaliacoes,
      mediaGeral: Math.round(mediaGeral * 100) / 100,
      mediaAtendimento: Math.round(mediaAtendimento * 100) / 100,
      mediaQualidade: Math.round(mediaQualidade * 100) / 100,
      mediaPontualidade: Math.round(mediaPontualidade * 100) / 100,
      mediaComunicacao: Math.round(mediaComunicacao * 100) / 100,
      mediaResultado: Math.round(mediaResultado * 100) / 100,
    };
  }).sort((a, b) => b.mediaGeral - a.mediaGeral);
};

export const exportToPDF = (avaliacoes: Avaliacao[], periodo?: string) => {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // Função para adicionar cabeçalho em cada página
  const addHeader = (pageNum: number) => {
    // Fundo azul no topo
    pdf.setFillColor(25, 75, 150);
    pdf.rect(0, 0, pageWidth, 35, 'F');

    // Logo/Texto OAB simplificado
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    pdf.text('OAB', 15, 20);

    // Linha vermelha decorativa
    pdf.setDrawColor(220, 20, 60);
    pdf.setLineWidth(2);
    pdf.line(15, 25, pageWidth - 15, 25);

    // Informações do relatório no cabeçalho
    pdf.setFontSize(10);
    pdf.setTextColor(200, 200, 200);
    pdf.text('Relatório de Avaliações', pageWidth - 15, 15, { align: 'right' });
    pdf.setFontSize(8);
    pdf.text(`Página ${pageNum}`, pageWidth - 15, 22, { align: 'right' });
  };

  // Página 1: Cabeçalho
  addHeader(1);

  let yPosition = 45;

  // Título
  pdf.setTextColor(25, 75, 150);
  pdf.setFontSize(18);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Relatório de Avaliações - OAB', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 8;

  // Linha decorativa
  pdf.setDrawColor(220, 20, 60);
  pdf.setLineWidth(1);
  pdf.line(20, yPosition, pageWidth - 20, yPosition);
  yPosition += 6;

  // Informações do relatório
  pdf.setTextColor(80, 80, 80);
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  
  const geradoEm = new Date().toLocaleDateString('pt-BR', { 
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const periodLabel = periodo === 'todos' ? 'Todo o período' : 
                      periodo === '7d' ? 'Últimos 7 dias' :
                      periodo === '30d' ? 'Últimos 30 dias' :
                      periodo === '90d' ? 'Últimos 3 meses' :
                      periodo === '1y' ? 'Último ano' : 'Período: ' + periodo;

  pdf.text(`Período: ${periodLabel}`, 20, yPosition);
  pdf.text(`Gerado em: ${geradoEm}`, pageWidth - 20, yPosition, { align: 'right' });
  yPosition += 12;

  // Resumo do período - Caixa profissional
  const summaryBoxHeight = 20;
  pdf.setFillColor(240, 245, 255);
  pdf.rect(15, yPosition - 4, pageWidth - 30, summaryBoxHeight, 'F');

  // Borda da caixa
  pdf.setDrawColor(25, 75, 150);
  pdf.setLineWidth(1.5);
  pdf.rect(15, yPosition - 4, pageWidth - 30, summaryBoxHeight);

  // Título do resumo
  pdf.setTextColor(25, 75, 150);
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'bold');
  pdf.text('RESUMO DO PERÍODO', 20, yPosition + 2);

  // Contagem por setor
  const sectorCounts: { [key: string]: number } = {};
  avaliacoes.forEach(av => {
    sectorCounts[av.setor] = (sectorCounts[av.setor] || 0) + 1;
  });

  // Linha 1: Total de avaliações
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Total de Avaliações no Período: ${avaliacoes.length}`, 20, yPosition + 8);

  // Linha 2: Distribuição por setor em duas colunas
  const sectorEntries = Object.entries(sectorCounts).sort();
  const midpoint = Math.ceil(sectorEntries.length / 2);
  
  let leftText = 'Setores: ';
  let rightText = '';
  
  sectorEntries.forEach((entry, index) => {
    const text = `${entry[0]}: ${entry[1]}`;
    if (index < midpoint) {
      leftText += text + ' | ';
    } else {
      rightText += text + ' | ';
    }
  });
  
  leftText = leftText.slice(0, -3); // Remove último " | "
  rightText = rightText.slice(0, -3);

  pdf.setFontSize(8);
  pdf.text(leftText, 20, yPosition + 12);
  
  if (rightText) {
    pdf.text(rightText, 20, yPosition + 15);
  }

  yPosition += summaryBoxHeight + 6;

  // Seção de Estatísticas por Setor
  pdf.setTextColor(25, 75, 150);
  pdf.setFontSize(13);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Estatísticas por Setor', 20, yPosition);
  yPosition += 7;

  // Cabeçalho da tabela
  pdf.setFillColor(25, 75, 150);
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'bold');
  
  const headers = ['Setor', 'Qtd', 'Média', 'Atend.', 'Qualid.', 'Pontual.', 'Comunic.', 'Resultado'];
  const colWidths = [30, 12, 15, 15, 15, 15, 15, 15];
  let xPos = 15;
  
  // Fundo do cabeçalho
  pdf.rect(15, yPosition - 4, pageWidth - 30, 6, 'F');
  
  headers.forEach((header, index) => {
    pdf.text(header, xPos + colWidths[index] / 2, yPosition + 1, { align: 'center' });
    xPos += colWidths[index];
  });

  yPosition += 8;

  // Linhas de dados
  const sectorStats = calculateSectorStats(avaliacoes);
  pdf.setTextColor(0, 0, 0);
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(9);
  
  sectorStats.forEach((stat, idx) => {
    if (yPosition > pageHeight - 25) {
      pdf.addPage();
      addHeader(Math.ceil((15 + idx + 1) / 20));
      yPosition = 45;

      // Repetir cabeçalho da tabela
      pdf.setFillColor(25, 75, 150);
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'bold');
      xPos = 15;
      
      pdf.rect(15, yPosition - 4, pageWidth - 30, 6, 'F');
      
      headers.forEach((header, index) => {
        pdf.text(header, xPos + colWidths[index] / 2, yPosition + 1, { align: 'center' });
        xPos += colWidths[index];
      });

      yPosition += 8;
      pdf.setTextColor(0, 0, 0);
      pdf.setFont('helvetica', 'normal');
    }

    // Cor alternada
    if (idx % 2 === 0) {
      pdf.setFillColor(240, 245, 255);
      pdf.rect(15, yPosition - 3, pageWidth - 30, 5, 'F');
    }

    const rowData = [
      stat.setor,
      stat.totalAvaliacoes.toString(),
      stat.mediaGeral.toFixed(2),
      stat.mediaAtendimento.toFixed(2),
      stat.mediaQualidade.toFixed(2),
      stat.mediaPontualidade.toFixed(2),
      stat.mediaComunicacao.toFixed(2),
      stat.mediaResultado.toFixed(2),
    ];

    xPos = 15;
    rowData.forEach((data, index) => {
      const align = index === 0 ? 'left' : 'center';
      const xOffset = align === 'left' ? 2 : colWidths[index] / 2;
      pdf.text(data, xPos + xOffset, yPosition + 1, { align });
      xPos += colWidths[index];
    });

    yPosition += 5;
  });

  // Seção de Detalhes de Avaliações
  yPosition += 5;

  if (yPosition > pageHeight - 40) {
    pdf.addPage();
    addHeader(pdf.internal.pages.length - 1);
    yPosition = 45;
  }

  pdf.setTextColor(25, 75, 150);
  pdf.setFontSize(13);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Detalhes de Avaliações', 20, yPosition);
  yPosition += 7;

  // Cabeçalho da tabela de detalhes
  pdf.setFillColor(25, 75, 150);
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(8);
  pdf.setFont('helvetica', 'bold');
  
  const detailHeaders = ['Advogado', 'OAB', 'Setor', 'Atend.', 'Qualid.', 'Pontual.', 'Comunic.', 'Result.', 'Data'];
  const detailColWidths = [24, 14, 18, 12, 12, 12, 12, 12, 16];
  xPos = 10;
  
  pdf.rect(10, yPosition - 3, pageWidth - 20, 5, 'F');
  
  detailHeaders.forEach((header, index) => {
    pdf.text(header, xPos + detailColWidths[index] / 2, yPosition, { align: 'center' });
    xPos += detailColWidths[index];
  });

  yPosition += 6;
  pdf.setTextColor(0, 0, 0);
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(7.5);

  avaliacoes.slice(0, 50).forEach((av, idx) => {
    if (yPosition > pageHeight - 12) {
      pdf.addPage();
      addHeader(pdf.internal.pages.length - 1);
      yPosition = 45;
      
      // Repetir cabeçalho
      pdf.setFillColor(25, 75, 150);
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'bold');
      xPos = 10;
      
      pdf.rect(10, yPosition - 3, pageWidth - 20, 5, 'F');
      
      detailHeaders.forEach((header, index) => {
        pdf.text(header, xPos + detailColWidths[index] / 2, yPosition, { align: 'center' });
        xPos += detailColWidths[index];
      });

      yPosition += 6;
      pdf.setTextColor(0, 0, 0);
      pdf.setFont('helvetica', 'normal');
    }

    if (idx % 2 === 0) {
      pdf.setFillColor(240, 245, 255);
      pdf.rect(10, yPosition - 2.5, pageWidth - 20, 4, 'F');
    }

    const detailData = [
      av.nome_advogado.substring(0, 15),
      av.numero_ordem.substring(0, 10),
      av.setor.substring(0, 10),
      av.nota_atendimento.toString(),
      av.nota_qualidade.toString(),
      av.nota_pontualidade.toString(),
      av.nota_comunicacao.toString(),
      av.nota_resultado.toString(),
      new Date(av.createdAt).toLocaleDateString('pt-BR'),
    ];

    xPos = 10;
    detailData.forEach((data, index) => {
      const align = index === 0 || index === 1 || index === 2 ? 'left' : 'center';
      const xOffset = align === 'left' ? 1 : detailColWidths[index] / 2;
      pdf.text(data, xPos + xOffset, yPosition, { align });
      xPos += detailColWidths[index];
    });

    yPosition += 4;
  });

  // Rodapé com número total de páginas
  const totalPages = (pdf as any).internal.pages.length - 1;
  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i);
    
    // Rodapé
    pdf.setDrawColor(200, 200, 200);
    pdf.setLineWidth(0.5);
    pdf.line(15, pageHeight - 12, pageWidth - 15, pageHeight - 12);
    
    pdf.setFontSize(8);
    pdf.setTextColor(100, 100, 100);
    pdf.text(`Página ${i} de ${totalPages}`, pageWidth / 2, pageHeight - 7, { align: 'center' });
    pdf.text('Sistema de Avaliações OAB', 15, pageHeight - 7);
    pdf.text(new Date().toLocaleDateString('pt-BR'), pageWidth - 15, pageHeight - 7, { align: 'right' });
  }

  // Salvar arquivo
  const fileName = `relatorio_avaliacoes_oab_${periodo || new Date().toISOString().split('T')[0]}.pdf`;
  pdf.save(fileName);
};
