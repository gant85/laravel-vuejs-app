export type MessageBarType = 'success' | 'info' | 'warning' | 'error';

export const MessageBarTypeEnum = {
  Success: 'success' as const,
  Info: 'info' as const,
  Warning: 'warning' as const,
  Error: 'error' as const,
  Information: 'info' as const, // Alias for Info
};

export type NotificationCardType = 'success' | 'info' | 'warning' | 'error';

export const NotificationCardTypeEnum = {
  Success: 'success' as const,
  Info: 'info' as const,
  Warning: 'warning' as const,
  Error: 'error' as const,
};
