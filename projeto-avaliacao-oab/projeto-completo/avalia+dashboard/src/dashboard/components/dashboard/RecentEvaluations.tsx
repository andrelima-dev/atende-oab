import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Star, UserCircle2 } from "lucide-react";

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

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`h-4 w-4 ${
            index < Math.round(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
      <span className="text-xs font-medium text-gray-600 ml-1">{rating.toFixed(1)}</span>
    </div>
  );
};

export const RecentEvaluations = ({ evaluations }: RecentEvaluationsProps) => {
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    } catch {
      return dateString;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold text-primary">Avaliações Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {evaluations.length > 0 ? (
            evaluations.map((evaluation, index) => (
              <React.Fragment key={evaluation.id}>
                
                <div className="flex items-start gap-4">
                  
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 mt-1">
                    <UserCircle2 className="h-6 w-6 text-slate-500" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-800">{evaluation.advogado}</p>
                        <p className="text-xs text-gray-500">OAB: {evaluation.numeroOrdem}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary">{evaluation.sector}</Badge>
                        <p className="text-xs text-gray-400 whitespace-nowrap">{formatDate(evaluation.date)}</p>
                      </div>
                    </div>

                    <div className="mt-2">
                      <StarRating rating={evaluation.rating} />
                    </div>

                    {evaluation.comment && (
                      <p className="mt-3 text-sm text-gray-700 leading-relaxed">
                        “{evaluation.comment}”
                      </p>
                    )}
                  </div>
                </div>

                {index < evaluations.length - 1 && (
                  <hr className="my-4 border-gray-200" />
                )}

              </React.Fragment>
            ))
          ) : (
            <p className="text-center text-gray-500">Nenhuma avaliação recente encontrada.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};