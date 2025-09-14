import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: number;
  subtitle: string;
  trend?: "up" | "down" | "stable";
  trendValue?: string;
  color?: "primary" | "secondary" | "success" | "warning";
}

export const MetricCard = ({
  title,
  value,
  subtitle,
  trend = "stable",
  trendValue,
  color = "primary",
}: MetricCardProps) => {
  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500 dark:text-green-400" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500 dark:text-red-400" />;
      default:
        return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900";
      case "down":
        return "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900";
      default:
        return "text-muted-foreground bg-muted";
    }
  };

  const getValueColor = () => {
    switch (color) {
      case "secondary":
        return "text-secondary";
      case "success":
        return "text-green-600 dark:text-green-400";
      case "warning":
        return "text-orange-600 dark:text-orange-400";
      default:
        return "text-primary";
    }
  };

  const formattedValue = Number.isInteger(value)
    ? value
    : value.toFixed(1);

  return (
    <Card className="shadow-card transition-smooth hover:shadow-elevated">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <div className={`text-3xl font-bold ${getValueColor()}`}>
              {formattedValue}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {subtitle}
            </p>
          </div>
          {trendValue && (
            <Badge variant="outline" className={`${getTrendColor()} border-transparent`}>
              <div className="flex items-center gap-1">
                {getTrendIcon()}
                <span className="text-xs font-medium">{trendValue}</span>
              </div>
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
