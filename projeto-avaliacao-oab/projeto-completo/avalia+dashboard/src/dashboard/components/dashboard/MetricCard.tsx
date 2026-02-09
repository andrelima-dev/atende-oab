import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { TrendingUp, TrendingDown, Minus, Star, Users, BarChart3, CheckCircle2 } from "lucide-react";

interface MetricCardProps {
  title: string;
  value?: number;
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
        return <TrendingUp className="h-4 w-4 text-emerald-500" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-slate-400" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-emerald-600 bg-emerald-50 border-emerald-200";
      case "down":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-slate-600 bg-slate-50 border-slate-200";
    }
  };

  const getCardGradient = () => {
    switch (color) {
      case "secondary":
        return "from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border-orange-100 dark:border-orange-800";
      case "success":
        return "from-emerald-50 to-cyan-50 dark:from-emerald-900/20 dark:to-cyan-900/20 border-emerald-100 dark:border-emerald-800";
      case "warning":
        return "from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-100 dark:border-yellow-800";
      default:
        return "from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-100 dark:border-blue-800";
    }
  };

  const getIconBg = () => {
    switch (color) {
      case "secondary":
        return "bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-800/30 dark:to-amber-800/30";
      case "success":
        return "bg-gradient-to-br from-emerald-100 to-cyan-100 dark:from-emerald-800/30 dark:to-cyan-800/30";
      case "warning":
        return "bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-800/30 dark:to-orange-800/30";
      default:
        return "bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-800/30 dark:to-indigo-800/30";
    }
  };

  const getIcon = () => {
    switch (color) {
      case "secondary":
        return <Users className="w-6 h-6 text-orange-600 dark:text-orange-400" />;
      case "success":
        return <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />;
      case "warning":
        return <Star className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />;
      default:
        return <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />;
    }
  };

  const getValueColor = () => {
    switch (color) {
      case "secondary":
        return "text-orange-600 dark:text-orange-400";
      case "success":
        return "text-emerald-600 dark:text-emerald-400";
      case "warning":
        return "text-yellow-600 dark:text-yellow-400";
      default:
        return "text-blue-600 dark:text-blue-400";
    }
  };

  const formattedValue = value !== undefined 
    ? (Number.isInteger(value) ? value : value.toFixed(1))
    : null;

  return (
    <Card className={`bg-gradient-to-br ${getCardGradient()} border shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 rounded-2xl overflow-hidden`}>
      <div className="absolute inset-0 opacity-40 dark:opacity-20">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white dark:bg-slate-800 rounded-full blur-3xl -mr-20 -mt-20"></div>
      </div>
      
      <CardHeader className={formattedValue !== null ? "pb-2 relative" : "pb-0 relative"}>
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-300">
            {title}
          </CardTitle>
          <div className={`${getIconBg()} p-2 rounded-lg`}>
            {getIcon()}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className={formattedValue !== null ? "relative" : "relative pt-2"}>
        <div className={formattedValue !== null ? "space-y-3" : ""}>
          <div>
            {formattedValue !== null ? (
              <>
                <div className={`text-4xl font-bold ${getValueColor()} tabular-nums`}>
                  {formattedValue}
                  {color === "warning" && <span className="text-2xl ml-1">⭐</span>}
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">
                  {subtitle}
                </p>
              </>
            ) : (
              <div className={`text-2xl font-bold ${getValueColor()}`}>
                {subtitle}
              </div>
            )}
          </div>
          
          {trendValue && (
            <Badge variant="outline" className={`${getTrendColor()} border w-fit font-semibold text-xs`}>
              <div className="flex items-center gap-1.5">
                {getTrendIcon()}
                <span>{trendValue}</span>
              </div>
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
