import { Card } from "@/components/ui/card";
import { DateResult } from '../types';
import { formatDate } from '../utils';
import { 
  Calendar,
  Clock,
  CalendarDays,
  CalendarRange
} from 'lucide-react';

interface ResultSummaryProps {
  result: DateResult;
}

export default function ResultSummary({ result }: ResultSummaryProps) {
  const summaryCards = [
    {
      title: "总天数",
      value: `${result.totalDays}天`,
      icon: Calendar,
      description: "包含首尾日期的总天数"
    },
    {
      title: "年月日",
      value: `${result.years}年${result.months}月${result.days}天`,
      icon: Clock,
      description: "精确的时间间隔"
    },
    {
      title: "工作日",
      value: `${result.workdays}天`,
      icon: CalendarDays,
      description: "不含周末的工作日数"
    },
    {
      title: "周数",
      value: `${result.weeks}周${result.totalDays % 7}天`,
      icon: CalendarRange,
      description: "完整的周数和剩余天数"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.title} className="p-4 hover:shadow-md transition-all duration-300">
              <div className="flex items-start space-x-3">
                <div className="rounded-lg p-2 bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">{card.title}</div>
                  <div className="text-lg font-bold text-primary">
                    {card.value}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {card.description}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="p-4">
        <h3 className="text-sm font-medium mb-3">日期信息</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">开始日期</span>
            <span>{formatDate(result.startDate)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">结束日期</span>
            <span>{formatDate(result.endDate)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">计算方式</span>
            <span>{result.includeEndDate ? '包含结束日期' : '不包含结束日期'}</span>
          </div>
        </div>
      </Card>

      <div className="text-sm text-muted-foreground space-y-1 p-4 bg-muted/50 rounded-lg">
        <p>* 工作日不包含周六日，未考虑法定节假日</p>
        <p>* 月份按照实际天数计算，考虑闰年</p>
        <p>* 建议根据实际需求选择是否包含结束日期</p>
      </div>
    </div>
  );
}