import { Card } from "@/components/ui/card";
import { DateResult } from '../types';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import { formatDate } from '../utils';

interface WorkdayAnalysisProps {
  result: DateResult;
}

const COLORS = ['#2563eb', '#16a34a', '#dc2626'];

export default function WorkdayAnalysis({ result }: WorkdayAnalysisProps) {
  const pieData = [
    { name: '工作日', value: result.workdays },
    { name: '周末', value: result.weekends },
    { name: '节假日', value: result.holidays?.count || 0 }
  ].filter(item => item.value > 0);

  const barData = [
    { name: '总工作日', value: result.businessDays.total },
    { name: '实际工作日', value: result.businessDays.excludingHolidays },
    { name: '周末天数', value: result.weekends },
    { name: '节假日天数', value: result.holidays?.count || 0 }
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">工作日分布</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, value }) => `${name}: ${value}天`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">工作日统计</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" name="天数" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {result.holidays && result.holidays.count > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">节假日明细</h3>
          <div className="space-y-2">
            {result.holidays.dates.map((date, index) => {
              const dateString = date.toISOString().split('T')[0];
              return (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-muted-foreground">{formatDate(date)}</span>
                  <span className="font-medium text-primary">
                    {result.holidays?.names[dateString]}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">时区信息</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">本地时间</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">开始日期</p>
                <p className="font-medium">{result.timeZones?.startDateLocal}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">结束日期</p>
                <p className="font-medium">{result.timeZones?.endDateLocal}</p>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-2">UTC时间</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">开始日期</p>
                <p className="font-medium">{result.timeZones?.startDateUTC}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">结束日期</p>
                <p className="font-medium">{result.timeZones?.endDateUTC}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="text-sm text-muted-foreground space-y-1 p-4 bg-muted/50 rounded-lg">
        <p>* 工作日不包含周末和法定节假日</p>
        <p>* 已考虑调休安排，部分周末可能为工作日</p>
        <p>* 节假日信息仅供参考，以国务院发布的具体安排为准</p>
        <p>* 时区信息基于浏览器本地时区设置</p>
      </div>
    </div>
  );
}