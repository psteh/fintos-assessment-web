export const API_URL: string =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8492';

export const STATUS_MAP: { [key: string]: string } = {
  NOT_URGENT: 'Not Urgent',
  OVERDUE: 'Overdue',
  DUE_SOON: 'Due Soon',
};

export const DATE_TIME_FORMAT: string = 'DD MMM YYYY';
