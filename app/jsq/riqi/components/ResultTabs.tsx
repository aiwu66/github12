"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Calculator, Calendar, ListChecks } from 'lucide-react';
import ResultSummary from './ResultSummary';
import DateDetails from './DateDetails';
import WorkdayAnalysis from './WorkdayAnalysis';
import { DateResult } from '../types';

interface ResultTabsProps {
  result: DateResult;
}

export default function ResultTabs({ result }: ResultTabsProps) {
  return (
    <Card className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-lg font-semibold">计算结果</h2>
      </div>

      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="summary" className="text-sm sm:text-base">
            <Calculator className="h-4 w-4 mr-2" />
            计算结果
          </TabsTrigger>
          <TabsTrigger value="details" className="text-sm sm:text-base">
            <Calendar className="h-4 w-4 mr-2" />
            日期详情
          </TabsTrigger>
          <TabsTrigger value="workdays" className="text-sm sm:text-base">
            <ListChecks className="h-4 w-4 mr-2" />
            工作日分析
          </TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="mt-0">
          <ResultSummary result={result} />
        </TabsContent>

        <TabsContent value="details" className="mt-0">
          <DateDetails result={result} />
        </TabsContent>

        <TabsContent value="workdays" className="mt-0">
          <WorkdayAnalysis result={result} />
        </TabsContent>
      </Tabs>
    </Card>
  );
}