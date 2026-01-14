export const StorageKeys = {
  PW_LENGTH: 'pw_length',
  PW_HISTORY: 'pw_history',
  PW_GENERATOR_OPTIONS: 'pw_generator_options',
  PW_DISPLAY_SETTINGS: 'pw_display_settings',
  USE_USER_CONFIG: 'use_user_config',
  THEME_COLOR: 'theme-color'
} as const

export type StorageKey = (typeof StorageKeys)[keyof typeof StorageKeys]
