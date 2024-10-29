export const defaultDateParams = {
  startDate: '',
  endDate: '',
  includeEndDate: true
};

export const dateFormats = [
  {
    name: '年月日',
    example: '2024-03-21',
    description: '标准日期格式'
  },
  {
    name: '中文格式',
    example: '2024年3月21日',
    description: '中文日期表示'
  },
  {
    name: '斜线格式',
    example: '2024/03/21',
    description: '使用斜线分隔'
  }
];

export const dateUnits = [
  {
    name: '天',
    description: '24小时为一天'
  },
  {
    name: '周',
    description: '7天为一周'
  },
  {
    name: '月',
    description: '每月28-31天不等'
  },
  {
    name: '季度',
    description: '3个月为一季度'
  },
  {
    name: '年',
    description: '12个月为一年'
  }
];