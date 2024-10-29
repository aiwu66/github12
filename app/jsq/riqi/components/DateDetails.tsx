import { Card } from "@/components/ui/card";
import { DateResult } from '../types';

interface DateDetailsProps {
  result: DateResult;
}

export default function DateDetails({ result }: DateDetailsProps) {
  const details = [
    {
      title: "季度信息",
      items: [
        { label: "跨越季度数", value: `${result.quarters}个季度` }
      ]
    },
    {
      title: "季节分布",
      items: [
        { label: "春季", value: `${result.seasons.spring}天` },
        { label: "夏季", value: `${result.seasons.summer}天` },
        { label: "秋季", value: `${result.seasons.autumn}天` },
        { label: "冬季", value: `${result.seasons.winter}天` }
      ]
    },
    {
      title: "年份信息",
      items: [
        { label: "跨越年数", value: `${result.years}年` },
        { label: "闰年数量", value: `${result.leapYears}个` }
      ]
    },
    {
      title: "周信息",
      items: [
        { label: "完整周数", value: `${result.weeks}周` },
        { label: "剩余天数", value: `${result.totalDays % 7}天` }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {details.map((section) => (
        <Card key={section.title} className="p-6">
          <h3 className="text-lg font-medium mb-4">{section.title}</h3>
          <div className="space-y-4">
            {section.items.map((item) => (
              <div key={item.label} className="flex justify-between items-center">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </Card>
      ))}

      <div className="text-sm text-muted-foreground space-y-1 p-4 bg-muted/50 rounded-lg">
        <p>* 季节划分基于气象学标准：</p>
        <p>- 春季：3-5月</p>
        <p>- 夏季：6-8月</p>
        <p>- 秋季：9-11月</p>
        <p>- 冬季：12-2月</p>
      </div>
    </div>
  );
}