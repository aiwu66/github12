export interface DateResult {
  totalDays: number;
  years: number;
  months: number;
  days: number;
  weeks: number;
  weekdays: number;
  weekends: number;
  startDate: Date;
  endDate: Date;
  includeEndDate: boolean;
  holidays?: {
    count: number;
    dates: Date[];
    names: { [key: string]: string };
  };
  workdays: number;
  quarters: number;
  seasons: {
    spring: number;
    summer: number;
    autumn: number;
    winter: number;
  };
  leapYears: number;
  timeZones?: {
    startDateLocal: string;
    endDateLocal: string;
    startDateUTC: string;
    endDateUTC: string;
    timeDifference: number;
  };
  lunarDates?: {
    startDate: string;
    endDate: string;
  };
  businessDays: {
    total: number;
    excludingHolidays: number;
  };
  customPeriods?: {
    name: string;
    days: number;
  }[];
}