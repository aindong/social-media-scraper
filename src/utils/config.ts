import 'dotenv/config';

type ConfigKey = 'INSTAGRAM_USERNAME' | 'INSTAGRAM_PASSWORD' | 'CRAWLER_ENV';

export class Config {
  static get(key: ConfigKey): string {
    return process.env[key] || '';
  }

  static getOrThrow(key: ConfigKey): string {
    const value = Config.get(key);

    if (!value) {
      throw new Error(`Missing environment variable ${key}`);
    }

    return value;
  }
}
