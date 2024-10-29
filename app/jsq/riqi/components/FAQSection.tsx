import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "如何计算工作日天数？",
    answer: `工作日计算方法：
1. 总天数减去周末天数
2. 扣除法定节假日
3. 考虑调休安排
4. 特殊情况：
   - 年假
   - 病假
   - 调休
   - 加班`
  },
  {
    question: "日期间隔计算是否包含首尾日期？",
    answer: `日期间隔计算规则：
1. 默认包含结束日期
2. 可以通过选项调整是否包含
3. 示例：
   - 3月1日到3月3日（包含）= 3天
   - 3月1日到3月3日（不包含）= 2天
4. 建议根据实际需求选择`
  },
  {
    question: "如何处理跨年份的日期计算？",
    answer: `跨年计算方法：
1. 自动处理闰年
2. 考虑月份天数差异
3. 精确计算：
   - 年份差
   - 月份差
   - 天数差
4. 支持任意年份跨度`
  },
  {
    question: "为什么有时候月份计算结果看起来不准确？",
    answer: `月份计算说明：
1. 每月天数不同（28-31天）
2. 特殊情况：
   - 月底跨月
   - 闰年2月
3. 计算规则：
   - 优先保证年月的准确性
   - 剩余天数单独计算
4. 建议参考具体天数`
  },
  {
    question: "季度和季节是如何划分的？",
    answer: `时间划分标准：
1. 季度划分：
   - Q1: 1-3月
   - Q2: 4-6月
   - Q3: 7-9月
   - Q4: 10-12月
2. 季节划分：
   - 春季: 3-5月
   - 夏季: 6-8月
   - 秋季: 9-11月
   - 冬季: 12-2月`
  },
  {
    question: "如何处理不同时区的日期计算？",
    answer: `时区处理方法：
1. 默认使用本地时区
2. 建议统一使用：
   - UTC时间
   - 特定时区
3. 注意事项：
   - 夏令时影响
   - 跨日期线
4. 建议标注具体时区`
  }
];

export default function FAQSection() {
  return (
    <Card className="p-6">
      <div className="flex items-center space-x-2 mb-6">
        <HelpCircle className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">常见问题</h2>
      </div>
      
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground whitespace-pre-line">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Card>
  );
}