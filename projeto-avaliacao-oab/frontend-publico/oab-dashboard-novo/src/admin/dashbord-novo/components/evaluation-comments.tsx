"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type EvaluationCommentsProps = {
  avaliacoes: any[];
};

export function EvaluationComments({ avaliacoes }: EvaluationCommentsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSector, setSelectedSector] = useState("all");

  const sectors = ["all", ...Array.from(new Set(avaliacoes.map(a => a.setor)))];

  const filteredComments = avaliacoes.filter(avaliacao => {
    // Garante que a busca funcione mesmo com campos nulos
    const commentText = (avaliacao.comentario || "").toLowerCase();
    const lawyerName = (avaliacao.nome_advogado || "").toLowerCase();
    const searchText = searchTerm.toLowerCase();

    const matchesSearch = commentText.includes(searchText) || lawyerName.includes(searchText);
    const matchesSector = selectedSector === "all" || avaliacao.setor === selectedSector;
    
    // Mostra apenas avaliações que têm um comentário
    return avaliacao.comentario && matchesSearch && matchesSector;
  });

  return (
    <Card className="bg-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-gray-900">Comentários das Avaliações</CardTitle>
        <div className="text-sm text-gray-500">{filteredComments.length} comentário(s)</div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 mb-4">
          <Input 
            placeholder="Buscar por comentário ou advogado..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select value={selectedSector} onValueChange={setSelectedSector}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Todos os setores" />
            </SelectTrigger>
            <SelectContent>
              {sectors.map(sector => (
                <SelectItem key={sector} value={sector}>{sector === 'all' ? 'Todos os setores' : sector}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {filteredComments.length > 0 ? (
            filteredComments.map(comment => (
              <div key={comment.id} className="border-b border-gray-100 pb-3 last:border-b-0">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-800">"{comment.comentario}"</p>
                    <p className="text-xs text-gray-500 mt-1">
                      - <strong>{comment.nome_advogado}</strong> em <strong>{comment.setor}</strong>
                    </p>
                  </div>
                  <div className="text-xs text-gray-400">
                    {new Date(comment.created_at).toLocaleDateString("pt-BR")}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>Nenhum comentário encontrado com os filtros aplicados.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}