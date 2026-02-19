
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Star, UserCircle2, Zap, MessageSquare } from "lucide-react";

interface Evaluation {
  id: number;
  advogado: string;
  sector: string;
  rating: number;
  comment?: string;
  date: string;
  numeroOrdem: string;
}

interface RecentEvaluationsProps {
  evaluations: Evaluation[];
}

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1.5">
    {[...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 transition-colors ${index < Math.round(rating) ? "text-amber-400 fill-amber-400" : "text-slate-300"}`}
      />
    ))}
    <span className="text-sm font-bold text-slate-700 ml-1">{rating.toFixed(1)}</span>
  </div>
);

const getRatingColor = (rating: number) => {
  if (rating >= 4.5) return 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800';
  if (rating >= 3.5) return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
  if (rating >= 2.5) return 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800';
  return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
};

const getRatingBadgeColor = (rating: number) => {
  if (rating >= 4.5) return 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300';
  if (rating >= 3.5) return 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300';
  if (rating >= 2.5) return 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300';
  return 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300';
};

const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  } catch {
    return dateString;
  }
};

export const RecentEvaluations = ({ evaluations }: RecentEvaluationsProps) => {
  const now = new Date();
  const recentEvaluations = evaluations.filter(ev => {
    const evDate = new Date(ev.date);
    return (now.getTime() - evDate.getTime()) <= 24 * 60 * 60 * 1000;
  });

  return (
    <Card className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900/70 dark:to-slate-800/50 shadow-xl border-slate-100 dark:border-slate-700 rounded-2xl overflow-hidden transition-colors duration-300">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800/50 dark:to-blue-900/30 pb-6 border-b border-slate-100 dark:border-slate-700">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-800/40 dark:to-cyan-800/40 rounded-lg">
            <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <CardTitle className="text-lg font-bold text-slate-800 dark:text-slate-100">Avaliações Recentes</CardTitle>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{recentEvaluations.length} avaliações</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {recentEvaluations.length > 0 ? (
            recentEvaluations.map((evaluation) => (
              <div key={evaluation.id} className={`p-4 rounded-xl border-2 transition-all hover:shadow-md ${getRatingColor(evaluation.rating)}`}>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-800/40 dark:to-indigo-800/40 flex-shrink-0">
                    <UserCircle2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="min-w-0">
                        <p className="font-bold text-slate-800 dark:text-slate-100 truncate">{evaluation.advogado}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">OAB: {evaluation.numeroOrdem}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full font-semibold text-xs whitespace-nowrap ${getRatingBadgeColor(evaluation.rating)}`}>
                        {evaluation.rating >= 4 ? '⭐ Excelente' : evaluation.rating >= 3 ? '👍 Bom' : '⚠️ Baixo'}
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
                      <StarRating rating={evaluation.rating} />
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700/50 rounded-md font-medium">{evaluation.sector}</span>
                        <span>{formatDate(evaluation.date)}</span>
                      </div>
                    </div>
                    {evaluation.comment && (
                      <div className="mt-3 p-3 bg-white/60 dark:bg-slate-800/30 rounded-lg border border-slate-200 dark:border-slate-700">
                        <div className="flex gap-2">
                          <MessageSquare className="h-4 w-4 text-slate-400 dark:text-slate-500 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                            {evaluation.comment}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <Zap className="h-12 w-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
              <p className="text-slate-500 dark:text-slate-400 font-medium">Nenhuma avaliação recente encontrada.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
