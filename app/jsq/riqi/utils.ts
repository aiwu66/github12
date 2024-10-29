import { addDays, differenceInDays, getQuarter, isWeekend } from 'date-fns';
import { zhCN } from 'date-fns/locale';

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// 中国法定节假日（示例数据，实际使用时应从API获取或维护完整数据）
const CHINESE_HOLIDAYS = {
  '2024-01-01': '元旦',
  '2024-02-10': '春节',
  '2024-02-11': '春节',
  '2024-02-12': '春节',
  '2024-04-04': '清明节',
  '2024-05-01': '劳动节',
  '2024-06-10': '端午节',
  '2024-09-15': '中秋节',
  '2024-10-01': '国庆节',
  '2024-10-02': '国庆节',
  '2024-10-03': '国庆节',
};

// 调休工作日（示例数据，实际使用时应从API获取或维护完整数据）
const WORKDAY_ADJUSTMENTS = [
  '2024-02-04',
  '2024-02-18',
  '2024-04-07',
  '2024-05-05',
  '2024-09-14',
  '2024-10-06',
];

export const calculateDateDifference = (
  startDate: Date,
  endDate: Date,
  includeEndDate: boolean
): DateResult => {
  // 确保日期是从零点开始计算
  startDate = new Date(startDate.setHours(0, 0, 0, 0));
  endDate = new Date(endDate.setHours(0, 0, 0, 0));

  // 计算总天数
  const totalDays = differenceInDays(endDate, startDate) + (includeEndDate ? 1 : 0);

  // 计算工作日和周末
  let weekdays = 0;
  let weekends = 0;
  let holidays = {
    count: 0,
    dates: [] as Date[],
    names: {} as { [key: string]: string }
  };

  let currentDate = new Date(startDate);
  for (let i = 0; i < totalDays; i++) {
    const dateString = currentDate.toISOString().split('T')[0];
    
    if (CHINESE_HOLIDAYS[dateString]) {
      holidays.count++;
      holidays.dates.push(new Date(currentDate));
      holidays.names[dateString] = CHINESE_HOLIDAYS[dateString];
    }

    if (isWeekend(currentDate) && !WORKDAY_ADJUSTMENTS.includes(dateString)) {
      weekends++;
    } else if (!isWeekend(currentDate) || WORKDAY_ADJUSTMENTS.includes(dateString)) {
      weekdays++;
    }
    
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // 计算实际工作日（扣除节假日）
  const workdays = weekdays - holidays.count;

  // 计算年月日
  let years = endDate.getFullYear() - startDate.getFullYear();
  let months = endDate.getMonth() - startDate.getMonth();
  let days = endDate.getDate() - startDate.getDate();

  if (days < 0) {
    months--;
    const lastMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 0);
    days += lastMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  // 计算季度
  const startQuarter = getQuarter(startDate);
  const endQuarter = getQuarter(endDate);
  const quarters = (endDate.getFullYear() - startDate.getFullYear()) * 4 + 
    (endQuarter - startQuarter);

  // 计算季节分布
  const seasons = {
    spring: 0,
    summer: 0,
    autumn: 0,
    winter: 0
  };

  currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    const month = currentDate.getMonth();
    if (month >= 2 && month <= 4) seasons.spring++;
    else if (month >= 5 && month <= 7) seasons.summer++;
    else if (month >= 8 && month <= 10) seasons.autumn++;
    else seasons.winter++;
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // 计算闰年数量
  let leapYears = 0;
  for (let year = startDate.getFullYear(); year <= endDate.getFullYear(); year++) {
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      leapYears++;
    }
  }

  // 时区信息
  const timeZones = {
    startDateLocal: startDate.toLocaleString('zh-CN'),
    endDateLocal: endDate.toLocaleString('zh-CN'),
    startDateUTC: startDate.toUTCString(),
    endDateUTC: endDate.toUTCString(),
    timeDifference: startDate.getTimezoneOffset()
  };

  // 农历日期（示例实现，实际需要使用专门的农历转换库）
  const lunarDates = {
    startDate: '农历日期转换需要专门的库支持',
    endDate: '农历日期转换需要专门的库支持'
  };

  // 工作日统计
  const businessDays = {
    total: weekdays,
    excludingHolidays: workdays
  };

  // 自定义时间段
  const customPeriods = [
    {
      name: '工作季度',
      days: Math.floor(workdays / 60) * 60
    },
    {
      name: '会计年度',
      days: Math.floor(totalDays / 365) * 365
    }
  ];

  return {
    totalDays,
    years,
    months,
    days,
    weeks: Math.floor(totalDays / 7),
    weekdays,
    weekends,
    startDate,
    endDate,
    includeEndDate,
    holidays,
    workdays,
    quarters,
    seasons,
    leapYears,
    timeZones,
    lunarDates,
    businessDays,
    customPeriods
  };
};