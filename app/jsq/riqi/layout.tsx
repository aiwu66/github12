import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '日期计算器 - 在线日期间隔计算_时间差计算器',
  description: '提供精确的日期间隔计算功能，支持多种日期格式，可计算工作日、周末等详细信息。包含日期转换和节假日计算功能。',
  keywords: '日期计算器,日期间隔计算,时间差计算器,工作日计算,日期转换',
};

export default function DateCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}