import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Star } from "lucide-react";

interface Evaluation {
  id: string;
  sector: string;
  rating: number;
  date: string;
  comment?: string;
}

interface RecentEvaluationsProps {
  evaluations: Evaluation[];
}

export const RecentEvaluations = ({ evaluations }: RecentEvaluationsProps) => {
  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "bg-green-100 text-green-800";
    if (rating >= 3.5) return "bg-yellow-100 text-yellow-800";
    if (rating >= 2.5) return "bg-orange-100 text-orange-800";
    return "bg-red-100 text-red-800";
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-primary">Avaliações Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {evaluations.map((evaluation) => (
            <div
              key={evaluation.id}
              className="flex items-center justify-between p-4 rounded-lg bg-muted/30 transition-smooth hover:bg-muted/50"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Badge variant="outline" className="text-primary border-primary/30">
                    {evaluation.sector}
                  </Badge>
                  <Badge className={getRatingColor(evaluation.rating)}>
                    {evaluation.rating.toFixed(1)}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex gap-1">
                    {renderStars(Math.floor(evaluation.rating))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {evaluation.date}
                  </span>
                </div>
                
                {evaluation.comment && (
                  <p className="text-sm text-muted-foreground mt-2 italic">
                    "{evaluation.comment}"
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};