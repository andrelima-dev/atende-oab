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
    const setor = av.setor || 'Não especificado';
    if (!sectorGroups[setor]) {
      sectorGroups[setor] = [];
    }
    sectorGroups[setor].push(av);
  });

  // Calcular estatísticas por setor
  return Object.entries(sectorGroups).map(([setor, avaliacoesPorSetor]) => {
    const totalAvaliacoes = avaliacoesPorSetor.length;
    const mediaAtendimento = avaliacoesPorSetor.reduce((sum, av) => sum + (av.nota_atendimento || 0), 0) / totalAvaliacoes;
    const mediaQualidade = avaliacoesPorSetor.reduce((sum, av) => sum + (av.nota_qualidade || 0), 0) / totalAvaliacoes;
    const mediaPontualidade = avaliacoesPorSetor.reduce((sum, av) => sum + (av.nota_pontualidade || 0), 0) / totalAvaliacoes;
    const mediaComunicacao = avaliacoesPorSetor.reduce((sum, av) => sum + (av.nota_comunicacao || 0), 0) / totalAvaliacoes;
    const mediaResultado = avaliacoesPorSetor.reduce((sum, av) => sum + (av.nota_resultado || 0), 0) / totalAvaliacoes;
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
  
  // Cores profissionais
  const primary = { r: 30, g: 64, b: 175 }; // Azul OAB
  const accent = { r: 220, g: 38, b: 38 }; // Vermelho
  const darkGray = { r: 55, g: 65, b: 81 };
  const lightGray = { r: 243, g: 244, b: 246 };
  
  // Função para adicionar cabeçalho profissional
  const addHeader = (pageNum: number) => {
    // Barra superior azul
    pdf.setFillColor(primary.r, primary.g, primary.b);
    pdf.rect(0, 0, pageWidth, 25, 'F');
    
    // Accent bar
    pdf.setFillColor(accent.r, accent.g, accent.b);
    pdf.rect(0, 25, pageWidth, 3, 'F');
    
    // Logo OAB
    pdf.setFillColor(255, 255, 255);
    pdf.rect(12, 8, 35, 10, 'F');
    pdf.setTextColor(primary.r, primary.g, primary.b);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('OAB', 29.5, 15.5, { align: 'center' });
    
    // Título do relatório
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('RELATÓRIO DE AVALIAÇÕES', pageWidth / 2, 17, { align: 'center' });
    
    // Número da página
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Pág. ${pageNum}`, pageWidth - 15, 17, { align: 'right' });
  };
  
  // Primeira página
  addHeader(1);
  let yPosition = 38;
  
  // Informações do período
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
                      periodo === '1y' ? 'Último ano' : periodo || 'Período selecionado';
  
  // Box de informações gerais
  pdf.setDrawColor(primary.r, primary.g, primary.b);
  pdf.setLineWidth(0.5);
  pdf.setFillColor(lightGray.r, lightGray.g, lightGray.b);
  pdf.roundedRect(15, yPosition, pageWidth - 30, 18, 2, 2, 'FD');
  
  pdf.setTextColor(darkGray.r, darkGray.g, darkGray.b);
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Período:', 20, yPosition + 6);
  pdf.setFont('helvetica', 'normal');
  pdf.text(periodLabel, 38, yPosition + 6);
  
  pdf.setFont('helvetica', 'bold');
  pdf.text('Gerado em:', 20, yPosition + 11);
  pdf.setFont('helvetica', 'normal');
  pdf.text(geradoEm, 42, yPosition + 11);
  
  pdf.setFont('helvetica', 'bold');
  pdf.text('Total de avaliações:', 20, yPosition + 16);
  pdf.setFont('helvetica', 'normal');
  pdf.text(avaliacoes.length.toString(), 56, yPosition + 16);
  
  yPosition += 25;
  
  // Estatísticas por Setor
  const sectorStats = calculateSectorStats(avaliacoes);
  
  pdf.setTextColor(primary.r, primary.g, primary.b);
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'bold');
  pdf.text('ESTATÍSTICAS POR SETOR', 15, yPosition);
  yPosition += 8;
  
  // Tabela de setores - Cabeçalho
  pdf.setFillColor(primary.r, primary.g, primary.b);
  pdf.rect(15, yPosition - 3, pageWidth - 30, 7, 'F');
  
  const headers = ['Setor', 'Qtd', 'Média', 'Atend.', 'Qualid.', 'Pontual.', 'Comunic.', 'Result.'];
  const colWidths = [42, 14, 16, 16, 16, 16, 16, 16];
  
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(8);
  pdf.setFont('helvetica', 'bold');
  
  let xPos = 15;
  headers.forEach((header, index) => {
    const align = index === 0 ? 'left' : 'center';
    const offset = align === 'left' ? 3 : colWidths[index] / 2;
    pdf.text(header, xPos + offset, yPosition + 1, { align });
    xPos += colWidths[index];
  });
  
  yPosition += 8;
  
  // Linhas de dados
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8);
  
  sectorStats.forEach((stat, idx) => {
    if (yPosition > pageHeight - 30) {
      pdf.addPage();
      addHeader(pdf.internal.pages.length - 1);
      yPosition = 38;
      
      // Repetir cabeçalho da tabela
      pdf.setFillColor(primary.r, primary.g, primary.b);
      pdf.rect(15, yPosition - 3, pageWidth - 30, 7, 'F');
      
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'bold');
      
      xPos = 15;
      headers.forEach((header, index) => {
        const align = index === 0 ? 'left' : 'center';
        const offset = align === 'left' ? 3 : colWidths[index] / 2;
        pdf.text(header, xPos + offset, yPosition + 1, { align });
        xPos += colWidths[index];
      });
      
      yPosition += 8;
      pdf.setFont('helvetica', 'normal');
    }
    
    // Fundo alternado
    if (idx % 2 === 0) {
      pdf.setFillColor(lightGray.r, lightGray.g, lightGray.b);
      pdf.rect(15, yPosition - 2.5, pageWidth - 30, 5, 'F');
    }
    
    // Borda da linha
    pdf.setDrawColor(220, 220, 220);
    pdf.setLineWidth(0.2);
    pdf.line(15, yPosition + 2.5, pageWidth - 15, yPosition + 2.5);
    
    pdf.setTextColor(darkGray.r, darkGray.g, darkGray.b);
    
    const rowData = [
      stat.setor || 'N/A',
      (stat.totalAvaliacoes || 0).toString(),
      (stat.mediaGeral || 0).toFixed(2),
      (stat.mediaAtendimento || 0).toFixed(2),
      (stat.mediaQualidade || 0).toFixed(2),
      (stat.mediaPontualidade || 0).toFixed(2),
      (stat.mediaComunicacao || 0).toFixed(2),
      (stat.mediaResultado || 0).toFixed(2),
    ];
    
    xPos = 15;
    rowData.forEach((data, index) => {
      const align = index === 0 ? 'left' : 'center';
      const offset = align === 'left' ? 3 : colWidths[index] / 2;
      
      // Destacar média geral
      if (index === 2) {
        pdf.setFont('helvetica', 'bold');
        const mediaVal = parseFloat(data);
        if (mediaVal >= 4.5) pdf.setTextColor(34, 197, 94); // Verde
        else if (mediaVal >= 3.5) pdf.setTextColor(primary.r, primary.g, primary.b); // Azul
        else if (mediaVal >= 2.5) pdf.setTextColor(251, 191, 36); // Amarelo
        else pdf.setTextColor(239, 68, 68); // Vermelho
      }
      
      pdf.text(data, xPos + offset, yPosition + 1, { align });
      
      if (index === 2) {
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(darkGray.r, darkGray.g, darkGray.b);
      }
      
      xPos += colWidths[index];
    });
    
    yPosition += 5;
  });
  
  yPosition += 8;
  
  // Detalhes das Avaliações
  if (yPosition > pageHeight - 45) {
    pdf.addPage();
    addHeader(pdf.internal.pages.length - 1);
    yPosition = 38;
  }
  
  pdf.setTextColor(primary.r, primary.g, primary.b);
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'bold');
  pdf.text('DETALHES DAS AVALIAÇÕES', 15, yPosition);
  yPosition += 8;
  
  // Cabeçalho da tabela de detalhes
  pdf.setFillColor(primary.r, primary.g, primary.b);
  pdf.rect(15, yPosition - 3, pageWidth - 30, 7, 'F');
  
  const detailHeaders = ['Advogado', 'OAB', 'Setor', 'At.', 'Ql.', 'Pt.', 'Cm.', 'Rs.', 'Data'];
  const detailColWidths = [35, 20, 28, 12, 12, 12, 12, 12, 19];
  
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(7.5);
  pdf.setFont('helvetica', 'bold');
  
  xPos = 15;
  detailHeaders.forEach((header, index) => {
    const align = index < 3 ? 'left' : 'center';
    const offset = align === 'left' ? 2 : detailColWidths[index] / 2;
    pdf.text(header, xPos + offset, yPosition + 1, { align });
    xPos += detailColWidths[index];
  });
  
  yPosition += 8;
  
  // Linhas de detalhes
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(7);
  
  avaliacoes.slice(0, 40).forEach((av, idx) => {
    if (yPosition > pageHeight - 15) {
      pdf.addPage();
      addHeader(pdf.internal.pages.length - 1);
      yPosition = 38;
      
      // Repetir cabeçalho
      pdf.setFillColor(primary.r, primary.g, primary.b);
      pdf.rect(15, yPosition - 3, pageWidth - 30, 7, 'F');
      
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(7.5);
      pdf.setFont('helvetica', 'bold');
      
      xPos = 15;
      detailHeaders.forEach((header, index) => {
        const align = index < 3 ? 'left' : 'center';
        const offset = align === 'left' ? 2 : detailColWidths[index] / 2;
        pdf.text(header, xPos + offset, yPosition + 1, { align });
        xPos += detailColWidths[index];
      });
      
      yPosition += 8;
      pdf.setFont('helvetica', 'normal');
    }
    
    // Fundo alternado
    if (idx % 2 === 0) {
      pdf.setFillColor(lightGray.r, lightGray.g, lightGray.b);
      pdf.rect(15, yPosition - 2, pageWidth - 30, 4.5, 'F');
    }
    
    pdf.setTextColor(darkGray.r, darkGray.g, darkGray.b);
    
    const detailData = [
      (av.nome_advogado || 'N/A').substring(0, 18),
      (av.numero_ordem || 'N/A').substring(0, 12),
      (av.setor || 'N/A').substring(0, 14),
      (av.nota_atendimento || 0).toFixed(1),
      (av.nota_qualidade || 0).toFixed(1),
      (av.nota_pontualidade || 0).toFixed(1),
      (av.nota_comunicacao || 0).toFixed(1),
      (av.nota_resultado || 0).toFixed(1),
      av.createdAt ? new Date(av.createdAt).toLocaleDateString('pt-BR') : 'N/A',
    ];
    
    xPos = 15;
    detailData.forEach((data, index) => {
      const align = index < 3 ? 'left' : 'center';
      const offset = align === 'left' ? 2 : detailColWidths[index] / 2;
      pdf.text(data, xPos + offset, yPosition + 1, { align });
      xPos += detailColWidths[index];
    });
    
    yPosition += 4.5;
  });
  
  // Rodapé profissional em todas as páginas
  const totalPages = (pdf as any).internal.pages.length - 1;
  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i);
    
    // Linha do rodapé
    pdf.setDrawColor(200, 200, 200);
    pdf.setLineWidth(0.3);
    pdf.line(15, pageHeight - 15, pageWidth - 15, pageHeight - 15);
    
    // Informações do rodapé
    pdf.setTextColor(120, 120, 120);
    pdf.setFontSize(7);
    pdf.setFont('helvetica', 'normal');
    pdf.text('OAB - Sistema de Avaliações', 15, pageHeight - 10);
    pdf.text(`${i}/${totalPages}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
    pdf.text(new Date().toLocaleDateString('pt-BR'), pageWidth - 15, pageHeight - 10, { align: 'right' });
  }
  
  // Salvar PDF
  const fileName = `Relatorio_OAB_${periodLabel.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
  pdf.save(fileName);
};
