export type NotificationCardType = 'success' | 'info' | 'warning' | 'error';

export const NotificationCardTypeEnum = {
  Success: 'success' as const,
  Info: 'info' as const,
  Warning: 'warning' as const,
  Error: 'error' as const,
};
