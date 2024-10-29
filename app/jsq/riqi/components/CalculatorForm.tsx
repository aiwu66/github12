"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Calculator } from "lucide-react";
import { defaultDateParams } from '../constants';

const formSchema = z.object({
  startDate: z.string().min(1, "请选择开始日期"),
  endDate: z.string().min(1, "请选择结束日期"),
  includeEndDate: z.boolean()
}).refine((data) => {
  const start = new Date(data.startDate);
  const end = new Date(data.endDate);
  return start <= end;
}, {
  message: "结束日期必须大于或等于开始日期",
  path: ["endDate"]
});

interface CalculatorFormProps {
  initialParams: typeof defaultDateParams;
  onCalculate: (values: typeof defaultDateParams) => void;
}

export default function CalculatorForm({
  initialParams,
  onCalculate
}: CalculatorFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialParams,
  });

  return (
    <Card className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onCalculate)} className="space-y-6">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>开始日期</FormLabel>
                <FormControl>
                  <Input 
                    type="date" 
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  选择计算的起始日期
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>结束日期</FormLabel>
                <FormControl>
                  <Input 
                    type="date" 
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  选择计算的结束日期
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="includeEndDate"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">包含结束日期</FormLabel>
                  <FormDescription>
                    计算时是否包含结束日期当天
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            <Calculator className="mr-2 h-4 w-4" />
            计算日期间隔
          </Button>
        </form>
      </Form>
    </Card>
  );
}